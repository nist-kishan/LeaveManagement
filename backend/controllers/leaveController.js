// backend/controllers/leaveController.js
const LeaveRequest = require('../models/Leave');
const Employee = require('../models/Employee');

const msPerDay = 24 * 60 * 60 * 1000;
function daysBetweenInclusive(s, e) {
  const start = new Date(s).setHours(0,0,0,0);
  const end = new Date(e).setHours(0,0,0,0);
  return Math.round((end - start) / msPerDay) + 1;
}

exports.applyLeave = async (req, res, next) => {
  try {
    const { employeeId, startDate, endDate, reason } = req.body;
    if (!employeeId || !startDate || !endDate) return res.status(400).json({ message: 'Missing fields' });

    const emp = await Employee.findById(employeeId);
    if (!emp) return res.status(404).json({ message: 'Employee not found' });

    const start = new Date(startDate);
    const end = new Date(endDate);
    if (isNaN(start) || isNaN(end)) return res.status(400).json({ message: 'Invalid date(s)' });
    if (end < start) return res.status(400).json({ message: 'End date cannot be before start date' });

    // Cannot apply before joining date
    const joinDay = new Date(emp.joiningDate).setHours(0,0,0,0);
    if (start < joinDay) return res.status(400).json({ message: 'Cannot apply for leave before joining date' });

    const days = daysBetweenInclusive(start, end);
    if (days <= 0) return res.status(400).json({ message: 'Invalid leave duration' });

    // Check balance
    if (days > emp.leaveBalance) {
      return res.status(400).json({ message: `Insufficient balance: requested ${days}, available ${emp.leaveBalance}` });
    }

    // Overlap check -- consider Pending or Approved only
    const overlapping = await LeaveRequest.findOne({
      employee: emp._id,
      status: { $in: ['Pending', 'Approved'] },
      $or: [
        { startDate: { $lte: end }, endDate: { $gte: start } }
      ]
    });

    if (overlapping) {
      return res.status(400).json({ message: 'Overlapping leave (Pending/Approved) already exists' });
    }

    const lr = new LeaveRequest({
      employee: emp._id,
      startDate: start,
      endDate: end,
      days,
      reason
    });
    await lr.save();
    res.status(201).json(lr);
  } catch (err) {
    next(err);
  }
};

exports.listLeaves = async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.employeeId) filter.employee = req.query.employeeId;
    const list = await LeaveRequest.find(filter).populate('employee', 'name email department').sort({ createdAt: -1 });
    res.json(list);
  } catch (err) {
    next(err);
  }
};

exports.updateLeaveStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (!['Approved', 'Rejected'].includes(status)) return res.status(400).json({ message: 'Invalid status' });

    const lr = await LeaveRequest.findById(id);
    if (!lr) return res.status(404).json({ message: 'Leave request not found' });
    if (lr.status !== 'Pending') return res.status(400).json({ message: 'Only pending requests can be updated' });

    const emp = await Employee.findById(lr.employee);
    if (!emp) return res.status(404).json({ message: 'Employee not found' });

    if (status === 'Approved') {
      // Re-check balance at approval time
      if (lr.days > emp.leaveBalance) return res.status(400).json({ message: 'Insufficient balance at approval time' });

      // Atomic-ish update: decrease balance and update leave
      emp.leaveBalance -= lr.days;
      await emp.save();
      lr.status = 'Approved';
      await lr.save();
    } else {
      lr.status = 'Rejected';
      await lr.save();
    }

    res.json(lr);
  } catch (err) {
    next(err);
  }
};

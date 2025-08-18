// backend/controllers/employeeController.js
const Employee = require('../models/Employee');

exports.addEmployee = async (req, res, next) => {
  try {
    const { name, email, department, joiningDate } = req.body;
    if (!name || !email || !department || !joiningDate) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    const exists = await Employee.findOne({ email: email.toLowerCase() });
    if (exists) return res.status(400).json({ message: 'Employee with this email already exists' });

    const emp = new Employee({
      name,
      email,
      department,
      joiningDate: new Date(joiningDate)
    });
    await emp.save();
    res.status(201).json(emp);
  } catch (err) {
    next(err);
  }
};

exports.listEmployees = async (req, res, next) => {
  try {
    const list = await Employee.find().sort({ name: 1 });
    res.json(list);
  } catch (err) {
    next(err);
  }
};

exports.getEmployee = async (req, res, next) => {
  try {
    const emp = await Employee.findById(req.params.id);
    if (!emp) return res.status(404).json({ message: 'Employee not found' });
    res.json(emp);
  } catch (err) {
    next(err);
  }
};

exports.getLeaveBalance = async (req, res, next) => {
  try {
    const emp = await Employee.findById(req.params.id);
    if (!emp) return res.status(404).json({ message: 'Employee not found' });
    res.json({ leaveBalance: emp.leaveBalance });
  } catch (err) {
    next(err);
  }
};
exports.deleteEmployee = async (req, res) => {
  try {
    const emp = await Employee.findByIdAndDelete(req.params.id);
    if (!emp) return res.status(404).json({ message: "Employee not found" });
    res.json({ message: "Employee deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

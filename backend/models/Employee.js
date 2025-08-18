// backend/models/Employee.js
const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  department: { type: String, required: true, trim: true },
  joiningDate: { type: Date, required: true },
  leaveBalance: { type: Number, default: parseInt(process.env.INITIAL_LEAVE_BALANCE || '20', 10) }
}, { timestamps: true });

module.exports = mongoose.model('Employee', employeeSchema);

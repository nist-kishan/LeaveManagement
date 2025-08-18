// backend/routes/employeeRoutes.js
const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/employeeController');

router.post('/', ctrl.addEmployee);
router.get('/', ctrl.listEmployees);
router.get('/:id', ctrl.getEmployee);
router.get('/:id/balance', ctrl.getLeaveBalance);
router.delete('/:id', ctrl.deleteEmployee);

module.exports = router;

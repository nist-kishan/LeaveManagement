// backend/routes/leaveRoutes.js
const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/leaveController');

router.post('/', ctrl.applyLeave);
router.get('/', ctrl.listLeaves);
router.patch('/:id/status', ctrl.updateLeaveStatus);

module.exports = router;

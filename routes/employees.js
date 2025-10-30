const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');
const { validateEmployee, createEmployeeSchema, updateEmployeeSchema } = require('../utils/validations/employeeValidation');

// GET /api/employees - Get all employees with department join
router.get('/', employeeController.getAllEmployees);

// GET /api/employees/:id - Get employee by ID with department join
router.get('/:id', employeeController.getEmployeeById);

// POST /api/employees - Create new employee
router.post('/', validateEmployee(createEmployeeSchema), employeeController.createEmployee);

// PUT /api/employees/:id - Update employee
router.put('/:id', validateEmployee(updateEmployeeSchema), employeeController.updateEmployee);

// DELETE /api/employees/:id - Delete employee
router.delete('/:id', employeeController.deleteEmployee);

module.exports = router;


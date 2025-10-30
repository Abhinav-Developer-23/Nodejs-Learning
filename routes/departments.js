const express = require('express');
const router = express.Router();
const departmentController = require('../controllers/departmentController');
const { validateDepartment, createDepartmentSchema, updateDepartmentSchema } = require('../utils/validations/departmentValidation');

// GET /api/departments - Get all departments (optional employees join with ?include=employees)
router.get('/', departmentController.getAllDepartments);

// GET /api/departments/:id - Get department by ID with employees join
router.get('/:id', departmentController.getDepartmentById);

// POST /api/departments - Create new department
router.post('/', validateDepartment(createDepartmentSchema), departmentController.createDepartment);

// PUT /api/departments/:id - Update department
router.put('/:id', validateDepartment(updateDepartmentSchema), departmentController.updateDepartment);

// DELETE /api/departments/:id - Delete department
router.delete('/:id', departmentController.deleteDepartment);

module.exports = router;


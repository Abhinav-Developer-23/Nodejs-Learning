const { Department, Employee } = require('../models');

// Get all departments with optional employees
const getAllDepartments = async (req, res) => {
  try {
    const includeEmployees = req.query.include === 'employees';

    const departments = await Department.findAll({
      include: includeEmployees ? [{
        model: Employee,
        as: 'employees',
        attributes: ['id', 'firstName', 'lastName', 'email', 'position', 'salary', 'hireDate'],
        required: false
      }] : [],
      order: [['createdAt', 'DESC']]
    });

    res.status(200).json({
      success: true,
      count: departments.length,
      data: departments
    });
  } catch (error) {
    console.error('Error fetching departments:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching departments',
      error: error.message
    });
  }
};

// Get department by ID with employees
const getDepartmentById = async (req, res) => {
  try {
    const { id } = req.params;

    const department = await Department.findByPk(id, {
      include: [{
        model: Employee,
        as: 'employees',
        attributes: ['id', 'firstName', 'lastName', 'email', 'position', 'salary', 'hireDate'],
        required: false
      }]
    });

    if (!department) {
      return res.status(404).json({
        success: false,
        message: 'Department not found'
      });
    }

    res.status(200).json({
      success: true,
      data: department
    });
  } catch (error) {
    console.error('Error fetching department:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching department',
      error: error.message
    });
  }
};

// Create new department
const createDepartment = async (req, res) => {
  try {
    const validatedData = req.validatedData;

    const department = await Department.create(validatedData);

    res.status(201).json({
      success: true,
      message: 'Department created successfully',
      data: department
    });
  } catch (error) {
    console.error('Error creating department:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating department',
      error: error.message
    });
  }
};

// Update department
const updateDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const validatedData = req.validatedData;

    const department = await Department.findByPk(id);
    if (!department) {
      return res.status(404).json({
        success: false,
        message: 'Department not found'
      });
    }

    await department.update(validatedData);

    res.status(200).json({
      success: true,
      message: 'Department updated successfully',
      data: department
    });
  } catch (error) {
    console.error('Error updating department:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating department',
      error: error.message
    });
  }
};

// Delete department
const deleteDepartment = async (req, res) => {
  try {
    const { id } = req.params;

    const department = await Department.findByPk(id, {
      include: [{
        model: Employee,
        as: 'employees',
        required: false
      }]
    });

    if (!department) {
      return res.status(404).json({
        success: false,
        message: 'Department not found'
      });
    }

    // Check if department has employees
    if (department.employees && department.employees.length > 0) {
      return res.status(409).json({
        success: false,
        message: 'Cannot delete department with employees',
        error: `This department has ${department.employees.length} employee(s). Please reassign or delete employees first.`
      });
    }

    await department.destroy();

    res.status(200).json({
      success: true,
      message: 'Department deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting department:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting department',
      error: error.message
    });
  }
};

module.exports = {
  getAllDepartments,
  getDepartmentById,
  createDepartment,
  updateDepartment,
  deleteDepartment
};


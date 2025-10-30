const { Employee, Department } = require('../models');

// Get all employees with department information
const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.findAll({
      include: [{
        model: Department,
        as: 'department',
        attributes: ['id', 'name', 'description', 'budget']
      }],
      order: [['createdAt', 'DESC']]
    });

    res.status(200).json({
      success: true,
      count: employees.length,
      data: employees
    });
  } catch (error) {
    console.error('Error fetching employees:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching employees',
      error: error.message
    });
  }
};

// Get employee by ID with department information
const getEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;

    const employee = await Employee.findByPk(id, {
      include: [{
        model: Department,
        as: 'department',
        attributes: ['id', 'name', 'description', 'budget']
      }]
    });

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: 'Employee not found'
      });
    }

    res.status(200).json({
      success: true,
      data: employee
    });
  } catch (error) {
    console.error('Error fetching employee:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching employee',
      error: error.message
    });
  }
};

// Create new employee
const createEmployee = async (req, res) => {
  try {
    const validatedData = req.validatedData;

    // Check if department exists
    const department = await Department.findByPk(validatedData.departmentId);
    if (!department) {
      return res.status(404).json({
        success: false,
        message: 'Department not found'
      });
    }

    const employee = await Employee.create(validatedData);

    // Fetch employee with department for response
    const employeeWithDepartment = await Employee.findByPk(employee.id, {
      include: [{
        model: Department,
        as: 'department',
        attributes: ['id', 'name', 'description', 'budget']
      }]
    });

    res.status(201).json({
      success: true,
      message: 'Employee created successfully',
      data: employeeWithDepartment
    });
  } catch (error) {
    console.error('Error creating employee:', error);
    
    // Handle duplicate email error
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({
        success: false,
        message: 'Email already exists',
        error: 'An employee with this email already exists'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error creating employee',
      error: error.message
    });
  }
};

// Update employee
const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const validatedData = req.validatedData;

    const employee = await Employee.findByPk(id);
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: 'Employee not found'
      });
    }

    // Check if departmentId is being updated and if it exists
    if (validatedData.departmentId) {
      const department = await Department.findByPk(validatedData.departmentId);
      if (!department) {
        return res.status(404).json({
          success: false,
          message: 'Department not found'
        });
      }
    }

    await employee.update(validatedData);

    // Fetch updated employee with department
    const updatedEmployee = await Employee.findByPk(id, {
      include: [{
        model: Department,
        as: 'department',
        attributes: ['id', 'name', 'description', 'budget']
      }]
    });

    res.status(200).json({
      success: true,
      message: 'Employee updated successfully',
      data: updatedEmployee
    });
  } catch (error) {
    console.error('Error updating employee:', error);
    
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({
        success: false,
        message: 'Email already exists',
        error: 'An employee with this email already exists'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error updating employee',
      error: error.message
    });
  }
};

// Delete employee
const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    const employee = await Employee.findByPk(id);
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: 'Employee not found'
      });
    }

    await employee.destroy();

    res.status(200).json({
      success: true,
      message: 'Employee deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting employee:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting employee',
      error: error.message
    });
  }
};

module.exports = {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee
};


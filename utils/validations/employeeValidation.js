const Joi = require('joi');

const createEmployeeSchema = Joi.object({
  firstName: Joi.string().min(1).max(50).required().messages({
    'string.empty': 'First name is required',
    'string.max': 'First name must not exceed 50 characters',
    'any.required': 'First name is required'
  }),
  lastName: Joi.string().min(1).max(50).required().messages({
    'string.empty': 'Last name is required',
    'string.max': 'Last name must not exceed 50 characters',
    'any.required': 'Last name is required'
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'Please provide a valid email address',
    'any.required': 'Email is required'
  }),
  position: Joi.string().min(1).max(100).required().messages({
    'string.empty': 'Position is required',
    'string.max': 'Position must not exceed 100 characters',
    'any.required': 'Position is required'
  }),
  salary: Joi.number().min(0).optional().allow(null).messages({
    'number.min': 'Salary must be a positive number'
  }),
  hireDate: Joi.date().iso().required().messages({
    'date.base': 'Hire date must be a valid date',
    'date.format': 'Hire date must be in ISO format (YYYY-MM-DD)',
    'any.required': 'Hire date is required'
  }),
  departmentId: Joi.number().integer().positive().required().messages({
    'number.base': 'Department ID must be a number',
    'number.integer': 'Department ID must be an integer',
    'number.positive': 'Department ID must be a positive number',
    'any.required': 'Department ID is required'
  })
});

const updateEmployeeSchema = Joi.object({
  firstName: Joi.string().min(1).max(50).optional().messages({
    'string.empty': 'First name cannot be empty',
    'string.max': 'First name must not exceed 50 characters'
  }),
  lastName: Joi.string().min(1).max(50).optional().messages({
    'string.empty': 'Last name cannot be empty',
    'string.max': 'Last name must not exceed 50 characters'
  }),
  email: Joi.string().email().optional().messages({
    'string.email': 'Please provide a valid email address'
  }),
  position: Joi.string().min(1).max(100).optional().messages({
    'string.empty': 'Position cannot be empty',
    'string.max': 'Position must not exceed 100 characters'
  }),
  salary: Joi.number().min(0).optional().allow(null).messages({
    'number.min': 'Salary must be a positive number'
  }),
  hireDate: Joi.date().iso().optional().messages({
    'date.base': 'Hire date must be a valid date',
    'date.format': 'Hire date must be in ISO format (YYYY-MM-DD)'
  }),
  departmentId: Joi.number().integer().positive().optional().messages({
    'number.base': 'Department ID must be a number',
    'number.integer': 'Department ID must be an integer',
    'number.positive': 'Department ID must be a positive number'
  })
});

const validateEmployee = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, { abortEarly: false });
    
    if (error) {
      const errors = error.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message
      }));
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: errors
      });
    }
    
    req.validatedData = value;
    next();
  };
};

module.exports = {
  createEmployeeSchema,
  updateEmployeeSchema,
  validateEmployee
};


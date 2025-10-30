const Joi = require('joi');

const createDepartmentSchema = Joi.object({
  name: Joi.string().min(1).max(100).required().messages({
    'string.empty': 'Department name is required',
    'string.max': 'Department name must not exceed 100 characters',
    'any.required': 'Department name is required'
  }),
  description: Joi.string().optional().allow(null, '').messages({
    'string.base': 'Description must be a string'
  }),
  budget: Joi.number().min(0).optional().allow(null).messages({
    'number.base': 'Budget must be a number',
    'number.min': 'Budget must be a positive number'
  })
});

const updateDepartmentSchema = Joi.object({
  name: Joi.string().min(1).max(100).optional().messages({
    'string.empty': 'Department name cannot be empty',
    'string.max': 'Department name must not exceed 100 characters'
  }),
  description: Joi.string().optional().allow(null, '').messages({
    'string.base': 'Description must be a string'
  }),
  budget: Joi.number().min(0).optional().allow(null).messages({
    'number.base': 'Budget must be a number',
    'number.min': 'Budget must be a positive number'
  })
});

const validateDepartment = (schema) => {
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
  createDepartmentSchema,
  updateDepartmentSchema,
  validateDepartment
};


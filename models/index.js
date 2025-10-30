const { sequelize } = require('../config/database');

// Import models
const Department = require('./Department');
const Employee = require('./Employee');

// Define associations
Department.hasMany(Employee, { 
  foreignKey: 'departmentId',
  as: 'employees',
  onDelete: 'RESTRICT',
  onUpdate: 'CASCADE'
});

Employee.belongsTo(Department, {
  foreignKey: 'departmentId',
  as: 'department'
});

module.exports = {
  sequelize,
  Department,
  Employee
};


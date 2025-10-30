const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');
const { Department, Employee } = require('../models');
const { createDepartmentSchema, updateDepartmentSchema } = require('../utils/validations/departmentValidation');

// Load proto file
const PROTO_PATH = path.join(__dirname, '../proto/department.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});

const departmentProto = grpc.loadPackageDefinition(packageDefinition).department;

// Helper function to convert Sequelize model to gRPC message
function departmentToGrpc(department, includeEmployees = false) {
  const dept = {
    id: department.id,
    name: department.name,
    description: department.description || '',
    budget: parseFloat(department.budget || 0),
    created_at: department.createdAt ? department.createdAt.toISOString() : '',
    updated_at: department.updatedAt ? department.updatedAt.toISOString() : '',
    employees: []
  };

  if (includeEmployees && department.employees) {
    dept.employees = department.employees.map(emp => ({
      id: emp.id,
      first_name: emp.firstName,
      last_name: emp.lastName,
      email: emp.email,
      position: emp.position,
      salary: parseFloat(emp.salary || 0),
      hire_date: emp.hireDate || ''
    }));
  }

  return dept;
}

// gRPC Service Implementation
const departmentService = {
  // Get all departments
  async GetAllDepartments(call, callback) {
    try {
      const includeEmployees = call.request.include_employees || false;

      const departments = await Department.findAll({
        include: includeEmployees ? [{
          model: Employee,
          as: 'employees',
          attributes: ['id', 'firstName', 'lastName', 'email', 'position', 'salary', 'hireDate'],
          required: false
        }] : [],
        order: [['createdAt', 'DESC']]
      });

      const response = {
        success: true,
        message: 'Departments fetched successfully',
        count: departments.length,
        departments: departments.map(dept => departmentToGrpc(dept, includeEmployees))
      };

      callback(null, response);
    } catch (error) {
      console.error('Error fetching departments:', error);
      callback({
        code: grpc.status.INTERNAL,
        message: `Error fetching departments: ${error.message}`
      });
    }
  },

  // Get department by ID
  async GetDepartmentById(call, callback) {
    try {
      const { id } = call.request;

      const department = await Department.findByPk(id, {
        include: [{
          model: Employee,
          as: 'employees',
          attributes: ['id', 'firstName', 'lastName', 'email', 'position', 'salary', 'hireDate'],
          required: false
        }]
      });

      if (!department) {
        return callback({
          code: grpc.status.NOT_FOUND,
          message: 'Department not found'
        });
      }

      const response = {
        success: true,
        message: 'Department fetched successfully',
        department: departmentToGrpc(department, true)
      };

      callback(null, response);
    } catch (error) {
      console.error('Error fetching department:', error);
      callback({
        code: grpc.status.INTERNAL,
        message: `Error fetching department: ${error.message}`
      });
    }
  },

  // Create department
  async CreateDepartment(call, callback) {
    try {
      const { name, description, budget } = call.request;

      // Validate using Joi
      const { error, value } = createDepartmentSchema.validate({
        name,
        description,
        budget
      });

      if (error) {
        return callback({
          code: grpc.status.INVALID_ARGUMENT,
          message: `Validation error: ${error.details.map(d => d.message).join(', ')}`
        });
      }

      const department = await Department.create(value);

      const response = {
        success: true,
        message: 'Department created successfully',
        department: departmentToGrpc(department, false)
      };

      callback(null, response);
    } catch (error) {
      console.error('Error creating department:', error);
      callback({
        code: grpc.status.INTERNAL,
        message: `Error creating department: ${error.message}`
      });
    }
  },

  // Update department
  async UpdateDepartment(call, callback) {
    try {
      const { id, name, description, budget } = call.request;

      // Validate using Joi
      const updateData = {};
      if (name !== undefined) updateData.name = name;
      if (description !== undefined) updateData.description = description;
      if (budget !== undefined) updateData.budget = budget;

      const { error, value } = updateDepartmentSchema.validate(updateData);

      if (error) {
        return callback({
          code: grpc.status.INVALID_ARGUMENT,
          message: `Validation error: ${error.details.map(d => d.message).join(', ')}`
        });
      }

      const department = await Department.findByPk(id);
      if (!department) {
        return callback({
          code: grpc.status.NOT_FOUND,
          message: 'Department not found'
        });
      }

      await department.update(value);

      const updatedDepartment = await Department.findByPk(id);
      const response = {
        success: true,
        message: 'Department updated successfully',
        department: departmentToGrpc(updatedDepartment, false)
      };

      callback(null, response);
    } catch (error) {
      console.error('Error updating department:', error);
      callback({
        code: grpc.status.INTERNAL,
        message: `Error updating department: ${error.message}`
      });
    }
  },

  // Delete department
  async DeleteDepartment(call, callback) {
    try {
      const { id } = call.request;

      const department = await Department.findByPk(id, {
        include: [{
          model: Employee,
          as: 'employees',
          required: false
        }]
      });

      if (!department) {
        return callback({
          code: grpc.status.NOT_FOUND,
          message: 'Department not found'
        });
      }

      // Check if department has employees
      if (department.employees && department.employees.length > 0) {
        return callback({
          code: grpc.status.FAILED_PRECONDITION,
          message: `Cannot delete department with employees. This department has ${department.employees.length} employee(s). Please reassign or delete employees first.`
        });
      }

      await department.destroy();

      const response = {
        success: true,
        message: 'Department deleted successfully'
      };

      callback(null, response);
    } catch (error) {
      console.error('Error deleting department:', error);
      callback({
        code: grpc.status.INTERNAL,
        message: `Error deleting department: ${error.message}`
      });
    }
  }
};

// Create and start gRPC server
function startGrpcServer() {
  const server = new grpc.Server();
  
  server.addService(departmentProto.DepartmentService.service, departmentService);
  
  const port = process.env.GRPC_PORT || 50051;
  const bindAddress = `0.0.0.0:${port}`;
  
  server.bindAsync(bindAddress, grpc.ServerCredentials.createInsecure(), (error, port) => {
    if (error) {
      console.error('Failed to start gRPC server:', error);
      return;
    }
    
    server.start();
    console.log(`gRPC server running on port ${port}`);
  });
  
  return server;
}

module.exports = {
  startGrpcServer,
  departmentService
};


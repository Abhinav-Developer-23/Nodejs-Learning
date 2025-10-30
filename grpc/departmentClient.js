/**
 * EXAMPLE FILE - NOT FOR PRODUCTION USE
 * 
 * This file is provided as an example for testing gRPC Department service.
 * It demonstrates how to connect to and interact with the gRPC server.
 * 
 * For production use, implement proper error handling, connection pooling,
 * retry logic, authentication, and integrate with your application's architecture.
 */

const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

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

// Create gRPC client
const client = new departmentProto.DepartmentService(
  'localhost:50051',
  grpc.credentials.createInsecure()
);

// Example: Get all departments
function getAllDepartments(includeEmployees = false) {
  return new Promise((resolve, reject) => {
    client.GetAllDepartments({ include_employees: includeEmployees }, (error, response) => {
      if (error) {
        reject(error);
      } else {
        resolve(response);
      }
    });
  });
}

// Example: Get department by ID
function getDepartmentById(id) {
  return new Promise((resolve, reject) => {
    client.GetDepartmentById({ id }, (error, response) => {
      if (error) {
        reject(error);
      } else {
        resolve(response);
      }
    });
  });
}

// Example: Create department
function createDepartment(name, description, budget) {
  return new Promise((resolve, reject) => {
    client.CreateDepartment({ name, description, budget }, (error, response) => {
      if (error) {
        reject(error);
      } else {
        resolve(response);
      }
    });
  });
}

// Example: Update department
function updateDepartment(id, name, description, budget) {
  return new Promise((resolve, reject) => {
    const updateData = { id };
    if (name !== undefined) updateData.name = name;
    if (description !== undefined) updateData.description = description;
    if (budget !== undefined) updateData.budget = budget;

    client.UpdateDepartment(updateData, (error, response) => {
      if (error) {
        reject(error);
      } else {
        resolve(response);
      }
    });
  });
}

// Example: Delete department
function deleteDepartment(id) {
  return new Promise((resolve, reject) => {
    client.DeleteDepartment({ id }, (error, response) => {
      if (error) {
        reject(error);
      } else {
        resolve(response);
      }
    });
  });
}

// Example usage
async function example() {
  try {
    console.log('=== gRPC Department Client Examples ===\n');

    // 1. Get all departments
    console.log('1. Getting all departments...');
    const allDepts = await getAllDepartments(false);
    console.log(`Found ${allDepts.count} departments`);
    console.log('Response:', JSON.stringify(allDepts, null, 2));
    console.log('\n');

    // 2. Get all departments with employees
    console.log('2. Getting all departments with employees...');
    const allDeptsWithEmps = await getAllDepartments(true);
    console.log(`Found ${allDeptsWithEmps.count} departments`);
    console.log('\n');

    // 3. Get department by ID
    console.log('3. Getting department by ID (1)...');
    const dept = await getDepartmentById(1);
    console.log('Department:', JSON.stringify(dept, null, 2));
    console.log('\n');

    // 4. Create department
    console.log('4. Creating new department...');
    const newDept = await createDepartment(
      'Quality Assurance',
      'QA and testing department',
      220000.00
    );
    console.log('Created:', JSON.stringify(newDept, null, 2));
    console.log('\n');

    // 5. Update department
    console.log('5. Updating department...');
    const updatedDept = await updateDepartment(
      newDept.department.id,
      'Quality Assurance',
      'QA, testing, and automation department',
      250000.00
    );
    console.log('Updated:', JSON.stringify(updatedDept, null, 2));
    console.log('\n');

    // 6. Delete department (commented out to avoid deleting)
    // console.log('6. Deleting department...');
    // const deleted = await deleteDepartment(newDept.department.id);
    // console.log('Deleted:', JSON.stringify(deleted, null, 2));

  } catch (error) {
    console.error('Error:', error.message);
    console.error('Code:', error.code);
  }
}

// Export functions
module.exports = {
  client,
  getAllDepartments,
  getDepartmentById,
  createDepartment,
  updateDepartment,
  deleteDepartment,
  example
};

// Run example if called directly
if (require.main === module) {
  example();
}


# gRPC Department Service

This directory contains the gRPC implementation of the Department service.

## Files

- `proto/department.proto` - Protocol Buffer definition file
- `departmentServer.js` - gRPC server implementation
- `departmentClient.js` - gRPC client example

## Getting Started

### Start Both Express and gRPC Servers

The gRPC server is integrated into the main Express server. Run:

```bash
pnpm start
```

This starts both:
- **Express server** on port `3000` → `http://localhost:3000`
- **gRPC server** on port `50051` → `localhost:50051`

### Test gRPC Client

In another terminal:

```bash
pnpm run grpc:client
```

## API Methods

### GetAllDepartments
```javascript
client.GetAllDepartments({ include_employees: false }, callback);
```

### GetDepartmentById
```javascript
client.GetDepartmentById({ id: 1 }, callback);
```

### CreateDepartment
```javascript
client.CreateDepartment({
  name: "Engineering",
  description: "Software development",
  budget: 500000.00
}, callback);
```

### UpdateDepartment
```javascript
client.UpdateDepartment({
  id: 1,
  name: "Engineering",
  description: "Updated description",
  budget: 600000.00
}, callback);
```

### DeleteDepartment
```javascript
client.DeleteDepartment({ id: 1 }, callback);
```

## Using gRPC Client

```javascript
const { getAllDepartments, createDepartment } = require('./grpc/departmentClient');

// Get all departments
const departments = await getAllDepartments(true);

// Create department
const newDept = await createDepartment(
  "Marketing",
  "Marketing department",
  300000.00
);
```

## Protocol Buffer Definition

The service is defined in `proto/department.proto`. Key features:

- **GetAllDepartments**: Returns all departments with optional employee inclusion
- **GetDepartmentById**: Returns a single department with employees
- **CreateDepartment**: Creates a new department
- **UpdateDepartment**: Updates an existing department
- **DeleteDepartment**: Deletes a department (prevents if employees exist)

## Error Handling

gRPC uses status codes:
- `OK` (0) - Success
- `INVALID_ARGUMENT` (3) - Validation errors
- `NOT_FOUND` (5) - Resource not found
- `FAILED_PRECONDITION` (9) - Cannot delete department with employees
- `INTERNAL` (13) - Server errors

## Environment Variables

- `GRPC_PORT` - Port for gRPC server (default: 50051)


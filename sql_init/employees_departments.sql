-- SQL INSERT statements for Departments and Employees
-- Run this in MySQL: mysql -u root -p example_database < insert_data.sql

-- Insert 10 Departments
INSERT INTO departments (name, description, budget, createdAt, updatedAt) VALUES
('Engineering', 'Software development and engineering department', 500000.00, NOW(), NOW()),
('Marketing', 'Marketing and advertising department', 300000.00, NOW(), NOW()),
('Sales', 'Sales and customer relations department', 400000.00, NOW(), NOW()),
('Human Resources', 'HR and talent management department', 200000.00, NOW(), NOW()),
('Finance', 'Financial planning and accounting department', 350000.00, NOW(), NOW()),
('Operations', 'Operations and logistics department', 450000.00, NOW(), NOW()),
('IT Support', 'IT infrastructure and support department', 250000.00, NOW(), NOW()),
('Research and Development', 'R&D and innovation department', 600000.00, NOW(), NOW()),
('Customer Service', 'Customer support and service department', 280000.00, NOW(), NOW()),
('Product Management', 'Product strategy and management department', 320000.00, NOW(), NOW());

-- Insert 50 Employees
INSERT INTO employees (firstName, lastName, email, position, salary, hireDate, departmentId, createdAt, updatedAt) VALUES
-- Engineering Department (ID: 1) - 15 employees
('John', 'Doe', 'john.doe@example.com', 'Senior Software Engineer', 95000.00, '2023-01-15', 1, NOW(), NOW()),
('Jane', 'Smith', 'jane.smith@example.com', 'Software Engineer', 75000.00, '2023-02-20', 1, NOW(), NOW()),
('Michael', 'Johnson', 'michael.johnson@example.com', 'Frontend Developer', 80000.00, '2023-03-10', 1, NOW(), NOW()),
('Emily', 'Williams', 'emily.williams@example.com', 'Backend Developer', 82000.00, '2023-04-05', 1, NOW(), NOW()),
('David', 'Brown', 'david.brown@example.com', 'Full Stack Developer', 88000.00, '2023-05-12', 1, NOW(), NOW()),
('Sarah', 'Davis', 'sarah.davis@example.com', 'DevOps Engineer', 92000.00, '2023-06-18', 1, NOW(), NOW()),
('Robert', 'Miller', 'robert.miller@example.com', 'Mobile Developer', 78000.00, '2023-07-22', 1, NOW(), NOW()),
('Lisa', 'Wilson', 'lisa.wilson@example.com', 'QA Engineer', 68000.00, '2023-08-30', 1, NOW(), NOW()),
('James', 'Moore', 'james.moore@example.com', 'Software Architect', 110000.00, '2022-09-15', 1, NOW(), NOW()),
('Jessica', 'Taylor', 'jessica.taylor@example.com', 'UI/UX Developer', 72000.00, '2023-10-10', 1, NOW(), NOW()),
('William', 'Anderson', 'william.anderson@example.com', 'API Developer', 85000.00, '2023-11-05', 1, NOW(), NOW()),
('Ashley', 'Thomas', 'ashley.thomas@example.com', 'Cloud Engineer', 98000.00, '2023-12-01', 1, NOW(), NOW()),
('Christopher', 'Jackson', 'christopher.jackson@example.com', 'Database Administrator', 87000.00, '2024-01-08', 1, NOW(), NOW()),
('Amanda', 'White', 'amanda.white@example.com', 'Security Engineer', 94000.00, '2024-02-14', 1, NOW(), NOW()),
('Daniel', 'Harris', 'daniel.harris@example.com', 'Junior Developer', 65000.00, '2024-03-20', 1, NOW(), NOW()),

-- Marketing Department (ID: 2) - 8 employees
('Patricia', 'Martin', 'patricia.martin@example.com', 'Marketing Manager', 75000.00, '2023-02-01', 2, NOW(), NOW()),
('Matthew', 'Thompson', 'matthew.thompson@example.com', 'Digital Marketing Specialist', 60000.00, '2023-03-15', 2, NOW(), NOW()),
('Laura', 'Garcia', 'laura.garcia@example.com', 'Content Marketing Manager', 68000.00, '2023-04-20', 2, NOW(), NOW()),
('Kevin', 'Martinez', 'kevin.martinez@example.com', 'SEO Specialist', 58000.00, '2023-05-25', 2, NOW(), NOW()),
('Michelle', 'Robinson', 'michelle.robinson@example.com', 'Social Media Manager', 62000.00, '2023-06-10', 2, NOW(), NOW()),
('Andrew', 'Clark', 'andrew.clark@example.com', 'Marketing Analyst', 64000.00, '2023-07-18', 2, NOW(), NOW()),
('Kimberly', 'Rodriguez', 'kimberly.rodriguez@example.com', 'Brand Manager', 72000.00, '2023-08-22', 2, NOW(), NOW()),
('Brian', 'Lewis', 'brian.lewis@example.com', 'Marketing Coordinator', 55000.00, '2023-09-30', 2, NOW(), NOW()),

-- Sales Department (ID: 3) - 10 employees
('Nicole', 'Lee', 'nicole.lee@example.com', 'Sales Manager', 85000.00, '2023-01-10', 3, NOW(), NOW()),
('Eric', 'Walker', 'eric.walker@example.com', 'Sales Representative', 55000.00, '2023-02-15', 3, NOW(), NOW()),
('Stephanie', 'Hall', 'stephanie.hall@example.com', 'Account Executive', 70000.00, '2023-03-20', 3, NOW(), NOW()),
('Ryan', 'Allen', 'ryan.allen@example.com', 'Business Development Manager', 80000.00, '2023-04-25', 3, NOW(), NOW()),
('Melissa', 'Young', 'melissa.young@example.com', 'Sales Coordinator', 50000.00, '2023-05-30', 3, NOW(), NOW()),
('Jason', 'King', 'jason.king@example.com', 'Senior Sales Executive', 78000.00, '2023-06-12', 3, NOW(), NOW()),
('Angela', 'Wright', 'angela.wright@example.com', 'Inside Sales Representative', 56000.00, '2023-07-18', 3, NOW(), NOW()),
('Scott', 'Lopez', 'scott.lopez@example.com', 'Regional Sales Manager', 88000.00, '2023-08-22', 3, NOW(), NOW()),
('Rebecca', 'Hill', 'rebecca.hill@example.com', 'Sales Support Specialist', 52000.00, '2023-09-28', 3, NOW(), NOW()),
('Justin', 'Scott', 'justin.scott@example.com', 'Territory Sales Manager', 72000.00, '2023-10-15', 3, NOW(), NOW()),

-- Human Resources Department (ID: 4) - 5 employees
('Sharon', 'Green', 'sharon.green@example.com', 'HR Manager', 75000.00, '2023-02-05', 4, NOW(), NOW()),
('Brandon', 'Adams', 'brandon.adams@example.com', 'HR Specialist', 60000.00, '2023-03-12', 4, NOW(), NOW()),
('Deborah', 'Baker', 'deborah.baker@example.com', 'Recruiter', 58000.00, '2023-04-18', 4, NOW(), NOW()),
('Ronald', 'Nelson', 'ronald.nelson@example.com', 'Benefits Administrator', 62000.00, '2023-05-24', 4, NOW(), NOW()),
('Sandra', 'Carter', 'sandra.carter@example.com', 'HR Coordinator', 55000.00, '2023-06-30', 4, NOW(), NOW()),

-- Finance Department (ID: 5) - 6 employees
('Benjamin', 'Mitchell', 'benjamin.mitchell@example.com', 'Finance Manager', 85000.00, '2023-01-20', 5, NOW(), NOW()),
('Rachel', 'Perez', 'rachel.perez@example.com', 'Accountant', 65000.00, '2023-02-25', 5, NOW(), NOW()),
('Frank', 'Roberts', 'frank.roberts@example.com', 'Financial Analyst', 70000.00, '2023-03-30', 5, NOW(), NOW()),
('Carol', 'Turner', 'carol.turner@example.com', 'Senior Accountant', 75000.00, '2023-04-10', 5, NOW(), NOW()),
('Raymond', 'Phillips', 'raymond.phillips@example.com', 'Payroll Specialist', 60000.00, '2023-05-15', 5, NOW(), NOW()),
('Catherine', 'Campbell', 'catherine.campbell@example.com', 'Budget Analyst', 68000.00, '2023-06-20', 5, NOW(), NOW()),

-- Operations Department (ID: 6) - 5 employees
('Jonathan', 'Parker', 'jonathan.parker@example.com', 'Operations Manager', 82000.00, '2023-02-01', 6, NOW(), NOW()),
('Donna', 'Evans', 'donna.evans@example.com', 'Operations Coordinator', 58000.00, '2023-03-08', 6, NOW(), NOW()),
('Albert', 'Edwards', 'albert.edwards@example.com', 'Supply Chain Manager', 78000.00, '2023-04-15', 6, NOW(), NOW()),
('Marie', 'Collins', 'marie.collins@example.com', 'Logistics Coordinator', 60000.00, '2023-05-22', 6, NOW(), NOW()),
('Philip', 'Stewart', 'philip.stewart@example.com', 'Operations Analyst', 65000.00, '2023-06-28', 6, NOW(), NOW()),

-- IT Support Department (ID: 7) - 5 employees
('Betty', 'Morris', 'betty.morris@example.com', 'IT Support Manager', 76000.00, '2023-02-10', 7, NOW(), NOW()),
('Gary', 'Rogers', 'gary.rogers@example.com', 'Help Desk Technician', 48000.00, '2023-03-18', 7, NOW(), NOW()),
('Helen', 'Reed', 'helen.reed@example.com', 'IT Support Specialist', 55000.00, '2023-04-25', 7, NOW(), NOW()),
('Jerry', 'Cook', 'jerry.cook@example.com', 'Senior IT Support', 63000.00, '2023-05-30', 7, NOW(), NOW()),
('Anna', 'Morgan', 'anna.morgan@example.com', 'System Administrator', 70000.00, '2023-06-15', 7, NOW(), NOW()),

-- Research and Development Department (ID: 8) - 5 employees
('Harold', 'Bell', 'harold.bell@example.com', 'R&D Manager', 105000.00, '2022-11-20', 8, NOW(), NOW()),
('Doris', 'Murphy', 'doris.murphy@example.com', 'Research Scientist', 92000.00, '2023-01-10', 8, NOW(), NOW()),
('Louis', 'Bailey', 'louis.bailey@example.com', 'Product Researcher', 80000.00, '2023-02-18', 8, NOW(), NOW()),
('Mildred', 'Rivera', 'mildred.rivera@example.com', 'Innovation Specialist', 85000.00, '2023-03-25', 8, NOW(), NOW()),
('Eugene', 'Cooper', 'eugene.cooper@example.com', 'Senior Researcher', 98000.00, '2023-04-30', 8, NOW(), NOW()),

-- Customer Service Department (ID: 9) - 5 employees
('Carl', 'Richardson', 'carl.richardson@example.com', 'Customer Service Manager', 68000.00, '2023-02-05', 9, NOW(), NOW()),
('Ruby', 'Cox', 'ruby.cox@example.com', 'Customer Service Representative', 42000.00, '2023-03-12', 9, NOW(), NOW()),
('Wayne', 'Howard', 'wayne.howard@example.com', 'Senior CSR', 48000.00, '2023-04-20', 9, NOW(), NOW()),
('Lois', 'Ward', 'lois.ward@example.com', 'Customer Support Specialist', 46000.00, '2023-05-28', 9, NOW(), NOW()),
('Ralph', 'Torres', 'ralph.torres@example.com', 'Support Team Lead', 55000.00, '2023-06-10', 9, NOW(), NOW()),

-- Product Management Department (ID: 10) - 6 employees
('Judy', 'Peterson', 'judy.peterson@example.com', 'Product Manager', 90000.00, '2023-01-15', 10, NOW(), NOW()),
('Peter', 'Gray', 'peter.gray@example.com', 'Senior Product Manager', 102000.00, '2022-12-01', 10, NOW(), NOW()),
('Brenda', 'Ramirez', 'brenda.ramirez@example.com', 'Associate Product Manager', 70000.00, '2023-02-20', 10, NOW(), NOW()),
('Earl', 'James', 'earl.james@example.com', 'Product Owner', 85000.00, '2023-03-28', 10, NOW(), NOW()),
('Janice', 'Watson', 'janice.watson@example.com', 'Product Strategy Manager', 95000.00, '2023-04-15', 10, NOW(), NOW()),
('Alice', 'Brooks', 'alice.brooks@example.com', 'Product Coordinator', 60000.00, '2023-05-22', 10, NOW(), NOW());


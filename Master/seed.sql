-- USE employeeDB;

-- DEPARTMENT SEEDS -----
INSERT INTO department (name)
VALUE ("Arts");
INSERT INTO department (name)
VALUE ("Mathematics");
INSERT INTO department (name)
VALUE ("Sciences");
INSERT INTO department (name)
VALUE ("Humanities");

-- EMPLOYEE ROLE SEEDS -------
INSERT INTO role (title, salary, department_id)
VALUE ("Veterinarian", 80000, 2);
INSERT INTO role (title, salary, department_id)
VALUE ("Teacher", 50000, 4);
INSERT INTO role (title, salary, department_id)
VALUE ("Art_Director", 120000, 3);
INSERT INTO role (title, salary, department_id)
VALUE ("Accountant", 100000, 1);
INSERT INTO role (title, salary, department_id)
VALUE ("Biologist", 80000, 1);
INSERT INTO role (title, salary, department_id)
VALUE ("Historian", 120000, 2);
INSERT INTO role (title, salary, department_id)
VALUE ("Lab_Technician", 90000, 4);

-- EMPLOYEE SEEDS -------
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Javier", "Gonzales", null, 1);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Sofia", "Balra", null, 2);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Maria","Thomas",null,3);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Simone", "Dupree", 1, 4);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Nicholas", "Kage", 4, 5);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("William", "Truott", 1, 6);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Samantha", "Robins", 2, 7);
DROP DATABASE IF EXISTS employeeDB;
CREATE database employeeDB;

USE employeeDB;

 CREATE TABLE department (

  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(30),
 );

 CREATE TABLE role ( 
 id INT PRIMARY KEY AUTO_INCREMENT,
 title VARCHAR(30),
 salary DECIMAL,
 department_id INT
 );

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INT,
  manager_id INT,
  PRIMARY KEY (id)
);
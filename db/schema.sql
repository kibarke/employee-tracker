DROP DATABASE IF EXISTS people_tracker_db;
CREATE DATABASE people_tracker_db;

USE people_tracker_db;

-- department table, keeps tracks of the names --

CREATE TABLE departments (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30)
);

-- role table, I think it keeps track of the title and salary --

CREATE TABLE roles (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INTEGER
);

-- employee table, keeps track of names, roles, and managers --

CREATE TABLE employees (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER,
    manager_id INTEGER
);

-- the hard part, making an actual table

-- Department table

INSERT INTO departments (name),
VALUES
    ('Engineering'),
    ('Finance'),
    ('Legal'),
    ('Sales'),
    ('Service');


-- Roles table
INSERT INTO role (title, salary, department_id)
VALUES
  ('Engineer', 100000, 1),
  ('Financial Analyst', 75000, 2),
  ('Lawyer', 200000, 3),
  ('Sales Representative', 70000, 4),
  ('Service Representative', 60000, 5);

--   Employee Info Table
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
('Percy', 'Jackson', 1, 1),
('Harry', 'Potter', 2, 2),
('Peter', 'Parker', 3, 3),
('Will', 'Hunting', 4, 4),
('Frodo', 'Baggins', 5, 5),
('Logan', 'Howlett', 4, 6);

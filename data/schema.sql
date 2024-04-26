DROP DATABASE IF EXISTS people_tracker_db;
CREATE DATABASE people_tracker_db;

USE people_tracker_db;

CREATE TABLE departments (
    id INTEGER PRIMARY KEY,
    name VARCHAR(30)
);

CREATE TABLE roles (
    id INTEGER PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INTEGER,
    FOREIGN KEY (department_id) REFERENCES departments(id)
);

CREATE TABLE employees (
    id INTEGER PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER,
    FOREIGN KEY (role_id) REFERENCES roles(id),
    manager_id INTEGER,
    FOREIGN KEY (manager_id) REFERENCES employees(id)
);




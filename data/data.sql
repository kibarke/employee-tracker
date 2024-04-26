USE people_tracker_db;

INSERT INTO departments (name)
VALUES
    ('Engineering'),
    ('Finance'),
    ('Legal'),
    ('Sales'),
    ('Service');

INSERT INTO roles (title, salary, department_id)
VALUES
  ('Engineer', 100000, 1),
  ('Financial Analyst', 75000, 2),
  ('Lawyer', 200000, 3),
  ('Sales Representative', 70000, 4),
  ('Service Representative', 60000, 5);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
('Percy', 'Jackson', 1, 1),
('Harry', 'Potter', 2, 2),
('Peter', 'Parker', 3, 3),
('Will', 'Hunting', 4, 4),
('Frodo', 'Baggins', 5, 5),
('Logan', 'Howlett', 4, 6);

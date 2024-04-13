-- the hard part, making an actual table

-- Department table

INSERT INTO departments (
    name
),
VALUES
    ('Engineering'),
    ('Finance'),
    ('Legal'),
    ('Sales'),
    ('Service');


-- Roles table
INSERT INTO role
  (title, salary, department_id)
VALUES
  ('Engineering', 100000, 1),
  ('Finance', 75000, 2),
  ('Legal', 200000, 3),
  ('Sales', 70000, 4),
  ('Service', 60000,5);

--   Employee Info Table
INSERT INTO employee (
    first_name, last_name, role_id, manager_id
)
VALUES
('Percy', 'Jackson', 1, 1),
('Harry', 'Potter', 2, 2),
('Peter', 'Parker', 3, 3),
('Will', 'Hunting', 4, 4),
('Frodo', 'Baggins', 5, 5),
('Logan', 'Howlett', 4, 6);

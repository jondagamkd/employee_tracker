INSERT INTO department (id, name)
VALUES
  (1, 'Tacos'),
  (2, 'Burritos'),
  (3, 'Hot_Sauces'),
  (4, 'Sides'),
  (5, 'Quesadillas');

INSERT INTO role (id, title, salary, department_id)
VALUES
  (1, 'Chef', 6.75, 1),
  (2, 'Head_Chef', 9999.50, 3),
  (3, 'Manager', 10.1, 1),
  (4, 'Sanitization_Engineer', 0.50, 4),
  (5, 'Manager', 6.75, 2),
  (6, 'Burrito_Taster', 7.50, 2),
  (7, 'Chef', 6.75, 3),
  (8, 'Chef', 6.75, 5);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES
  (1, 'Antonio', 'Hernandez', 3, NULL),
  (2, 'Rodrigo', 'Garcia', 4, 1),
  (3, 'Jose', 'Martinez', 3, 1),
  (4, 'Juan', 'Lopez', 3, 1),
  (5, 'Francisco', 'Perez', 3, 1),
  (6, 'Alejandro', 'Sanchez', 3, 1),
  (7, 'Miguel', 'Gonzalez', 3, 1)
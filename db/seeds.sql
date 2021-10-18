INSERT INTO department (id, name)
VALUES
  (1, 'Taco_Dept'),
  (2, 'Burrito_Dept'),
  (3, 'Hot_Sauce_Dept'),
  (4, 'Side_Dept'),
  (5, 'Quesadilla_Dept');

INSERT INTO role (id, title, salary, department_id)
VALUES
  (1, 'Chef', 6.75, 1),
  (2, 'Head_Chef', 9999.50, 3),
  (3, 'Manager', 10.1, 1),
  (4, 'Sanitization_Engineer', 0.50, 4),
  (5, 'Taco_Chef', 6.75, 2),
  (6, 'Burrito_Taster', 7.50, 2),
  (7, 'Greeter', 6.75, 3),
  (8, 'Food_Tester', 6.75, 5);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES
  (1, 'Antonio', 'Hernandez', 3, 1),
  (2, 'Rodrigo', 'Garcia', 4, 2),
  (3, 'Jose', 'Martinez', 1, 1),
  (4, 'Juan', 'Lopez', 2, 1),
  (5, 'Francisco', 'Perez', 5, 1),
  (6, 'Alejandro', 'Sanchez', 6, 1),
  (7, 'Miguel', 'Gonzalez', 7, 1)
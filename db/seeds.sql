

-- SELECT * FROM department;

-- SELECT * FROM role;

-- SELECT * FROM  employee;
  
INSERT INTO department (name) VALUES ("Sales"), ("Engineering"), ("Finance"), ("Legal");

INSERT INTO role (title, salary, department_id) 
VALUES 
('Sales Lead', 100000, 1), 
('Salesperson', 45000, 1), 
('Lead Engineer', 110000, 2),
('Software Engineer', 65000, 2),
('Account', 70000, 3),
('Legal Team Lead', 150000, 4), 
('Lawer', 120000, 4)
;

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
("John", "Doe", 8, null), 
("Mike", "Chan", 9, null), 
("Ashley", "Rodriguez", 2, null), 
("Kevin", "Tupik", 11, null),
("Malia", "Brown", 12, null),
("Sarah", "Lourd", 13, null), 
("Tom", "Allen", 14, null),
("Christian", "Eckenrode", 10, null)
;

-- UPDATE employee SET role_id = role_id WHERE condition;
-- department table 
-- +----+-------------+
-- | id | name        |
-- +----+-------------+
-- |  1 | Sales       |
-- |  2 | Engineering |
-- |  3 | Finance     |
-- |  4 | Legal       |
-- +----+-------------+
-- role table
-- +----+-------------------+--------+---------------+
-- | id | title             | salary | department_id |
-- +----+-------------------+--------+---------------+
-- |  8 | Sales Lead        | 100000 |             1 |
-- |  9 | Salesperson       |  45000 |             1 |
-- | 10 | Lead Engineer     | 110000 |             2 |
-- | 11 | Software Engineer |  65000 |             2 |
-- | 12 | Account           |  70000 |             3 |
-- | 13 | Legal Team Lead   | 150000 |             4 |
-- | 14 | Lawer             | 120000 |             4 |
-- +----+-------------------+--------+---------------+


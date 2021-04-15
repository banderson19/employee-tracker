

-- SELECT * FROM department;

-- SELECT * FROM role;

-- SELECT * FROM  employee;
  
-- 
-- INSERT INTO role (title, salary, department_id) 
-- VALUES 
-- ('Sales Lead', 100000, 1), 
-- ('Salesperson', 45000, 1), 
-- ('Lead Engineer', 110000, 2),
-- ('Software Engineer', 65000, 2),
-- ('Accountant', 70000, 3),
-- ('Legal Team Lead', 150000, 4), 
-- ('Lawer', 120000, 4)
-- ;

-- INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("John", "Doe", 2, null), ("Mike", "Chan", 1, null), ("Ashley", "Rodriguez", 3, null), ("Kevin", "Tupik", 7, null), ("Malia", "Brown", 6, null), ("Sarah", "Lourd", 5, null), ("Tom", "Allen", 5, null), ("Christian", "Eckenrode", 3, null);

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
-- | 1 | Sales Lead        | 100000 |             1 |
-- | 2 | Salesperson       |  45000 |             1 |
-- | 3 | Lead Engineer     | 110000 |             2 |
-- | 4 | Software Engineer |  65000 |             2 |
-- | 5 | Accountant        |  70000 |             3 |
-- | 6 | Legal Team Lead   | 150000 |             4 |
-- | 7 | Lawer             | 120000 |             4 |
-- +----+-------------------+--------+---------------+
-- employee table
-- +----+------------+-----------+---------+------------+
-- | id | first_name | last_name | role_id | manager_id |
-- +----+------------+-----------+---------+------------+
-- |  2 | John       | Doe       |       2 |       NULL |
-- |  3 | Mike       | Chan      |       1 |       NULL |
-- |  4 | Ashley     | Rodriguez |       3 |       NULL |
-- |  5 | Kevin      | Tupik     |       7 |       NULL |
-- |  6 | Malia      | Brown     |       6 |       NULL |
-- |  7 | Sarah      | Lourd     |       5 |       NULL |
-- |  8 | Tom        | Allen     |       5 |       NULL |
-- |  9 | Christian  | Eckenrode |       3 |       NULL |
-- +----+------------+-----------+---------+------------+


-- +----+------------+-----------+-----------------+-----------------+--------+------------+
-- | id | first_name | last_name | title           | department_name | salary | manager_id |
-- +----+------------+-----------+-----------------+-----------------+--------+------------+
-- |  2 | John       | Doe       | Salesperson     | Sales           |  45000 |          3 |
-- |  3 | Mike       | Chan      | Sales Lead      | Sales           | 100000 |       NULL |
-- |  4 | Ashley     | Rodriguez | Lead Engineer   | Engineering     | 110000 |          5 |
-- |  5 | Kevin      | Tupik     | Lawer           | Legal           | 120000 |       NULL |
-- |  6 | Malia      | Brown     | Legal Team Lead | Legal           | 150000 |       NULL |
-- |  7 | Sarah      | Lourd     | Accountant      | Finance         |  70000 |       NULL |
-- |  8 | Tom        | Allen     | Accountant      | Finance         |  70000 |       NULL |
-- |  9 | Christian  | Eckenrode | Lead Engineer   | Engineering     | 110000 |       NULL |
-- +----+------------+-----------+-----------------+-----------------+--------+------------+

-- mysql> SELECT * FROM employee LEFT JOIN tracker.role ON employee.role_id = role.id;
-- +----+------------+-----------+---------+------------+------+-------------------+--------+---------------+
-- | id | first_name | last_name | role_id | manager_id | id   | title             | salary | department_id |
-- +----+------------+-----------+---------+------------+------+-------------------+--------+---------------+
-- | 64 | Jake       | Kelly     |       4 |       NULL |    4 | Software Engineer |  65000 |             2 |
-- | 65 | brian      | anderson  |    NULL |       NULL | NULL | NULL              |   NULL |          NULL |
-- | 66 | sarah      | anderson  |    NULL |       NULL | NULL | NULL              |   NULL |          NULL |
-- | 67 | steve      | anderson  |    NULL |       NULL | NULL | NULL              |   NULL |          NULL |
-- | 68 | karen      | anderon   |    NULL |       NULL | NULL | NULL              |   NULL |          NULL |
-- | 69 | Jake       | Kelly     |       4 |       NULL |    4 | Software Engineer |  65000 |             2 |
-- | 70 | Sam        | Brigham   |    NULL |       NULL | NULL | NULL              |   NULL |          NULL |
-- | 71 | Josh       | Johnson   |       6 |       NULL |    6 | Legal Team Lead   | 150000 |             4 |
-- | 72 | Meredith   | uhoh      |    NULL |       NULL | NULL | NULL              |   NULL |          NULL |
-- | 73 | kj         | peterson  |       3 |       NULL |    3 | Lead Engineer     | 110000 |             2 |
-- | 74 | dwight     | schrute   |       1 |       NULL |    1 | Sales Lead        | 100000 |             1 |
-- +----+------------+-----------+---------+------------+------+-------------------+--------+---------------+
-- 11 rows in set (0.01 sec)
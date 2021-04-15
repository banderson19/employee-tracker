* got all tables created and able to select * from tables;
* add to tables


## 1 update http request not updating role on current employee. 

## 2 add employ does re-render the new data! also returns 'undefined'

## 3 update does not re render inquire prompt, sending incorrect role id

# get request returning undefined





axios calls arent working for post or put
deletes employee at update role

* run multiple start scripts
  "dev": "concurrently --kill-others \"node server.js\" \"node app.js\""

** need to fix sort by role to by department
* select all columns where department id = 2;
SELECT * FROM ((employee INNER JOIN role ON employee.role_id = role.id) INNER JOIN department ON role.department_id = department.id) WHERE department.id = 2;

* Select all columns 
SELECT * FROM ((employee INNER JOIN role ON employee.role_id = role.id) INNER JOIN department ON role.department_id = department.id);

GIVEN a command-line application that accepts user input
WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids
WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database
WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager and that employee is added to the database
WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database 
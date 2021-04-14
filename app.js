const inquirer = require('inquirer');
const router = require('./routes/apiRoutes/employeeRoutes')
const axios = require('axios')

let employeeList = [];


const init = () => {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'application',
            message: 'What would you like to do?',
            choices: [
                'view all departments',
                'view all roles',
                'view all employees', 
                'add a department', 
                'add a role', 
                'add an employee', 
                'update an employee role'
            ]
        }
    ]).then(response => {
        if (response.application == 'view all departments') {
            console.log('view all departments')
        } else if (response.application == 'view all roles') {
            console.log('view all roles')
        } else if (response.application == 'view all employees') {
            console.log('view all employees')
        } else if (response.application == 'add a department') {
            console.log('add a department')
            addDepartment();
        } else if (response.application == 'add a role') {
            console.log('add a role')
            addRole();
        } else if (response.application == 'add an employee') {
            console.log('add employee')
            addEmployee();
        } else {
            console.log('update an employee role')
            updateEmployeeRole();
        };
    })
}
const addEmployee = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'fist_name',
            message: 'What is the employees first name?'
        },{
            type: 'input',
            name: 'last_name',
            message: 'What is the employees last name?'
        },{
            type: 'list',
            name: 'role',
            message: 'What is the employees role?',
            choices: [
                'Sales Lead', 
                'Salesperson',
                'Lead Engineer',
                'Software Engineer',
                'Accountant', 
                'Legal Team Lead',
                'Lawer'
            ]
        }
    ])
}

const addRole = () => {
    return inquirer.prompt([
        {
            type: 'input', 
            name: 'title',
            message: 'What is the roles title?'
        },{
            type: 'input', 
            name: 'salary', 
            message: 'What is the salary for this position?'
        }, {
            type: 'list',
            name: 'department', 
            message: 'What department does this role belong to?',
            choices: [
                'Sales', 'Engineering', 'Finance', 'Legal'
            ]
        }
    ])
}

const addDepartment = () => {
    return inquirer.prompt([
        {
            type: 'input', 
            name: 'title',
            message: 'What is the Department title?'
        }
    ])
}

const updateEmployeeRole = async () => {
    await getEmployeeDB()
    let arr = await employeeList[0].map(e => `${e.first_name} ${e.last_name}`)
    console.log(arr)
    inquirer.prompt([
        {
            type: 'list',
            name: 'employee',
            message: 'Which employee would you like to update their role?',
            choices: arr
        }
        //put or post
    ]).then( () => {})
}
//axios call or fetch
const getEmployeeDB = async () => {
    console.log('hello')
    await axios.get('http://localhost:3009/api/tracker/employee')
    .then(response => {
        employeeList.push(response.data.data)

    })
}
    
init();
// GIVEN a command-line application that accepts user input
// WHEN I start the application
// THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
// WHEN I choose to view all departments
// THEN I am presented with a formatted table showing department names and department ids
// WHEN I choose to view all roles
// THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
// WHEN I choose to view all employees
// THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
// WHEN I choose to add a department
// THEN I am prompted to enter the name of the department and that department is added to the database
// WHEN I choose to add a role
// THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
// WHEN I choose to add an employee
// THEN I am prompted to enter the employee’s first name, last name, role, and manager and that employee is added to the database
// WHEN I choose to update an employee role
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database 

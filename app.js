const inquirer = require('inquirer');
const router = require('./routes/apiRoutes/employeeRoutes')
const axios = require('axios')

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
            showDeparment();
        } else if (response.application == 'view all roles') {
            console.log('view all roles')
            showRole();
        } else if (response.application == 'view all employees') {
            console.log('view all employees')
            getEmployees();
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
const addEmployee =  async () => {
    await getRoleDB()
    let arr = await roleList[0].map(e => `${e.id} ${e.title} ${e.salary} ${e.department_id}`)
    inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'What is the employees first name?'
        },{
            type: 'input',
            name: 'last_name',
            message: 'What is the employees last name?'
        },{
            type: 'list',
            name: 'role',
            message: 'What is the employees role?',
            choices: arr
        }
    ]).then(info => {
        var split = info.role.split(" ")
        let id = +split[0];
        const body = {
            first_name: info.first_name, 
            last_name: info.last_name, 
            role_id: id,
            manager_id: null
        }
        return body
    }).then(body => {
        console.log('body', body)
        axios.post('http://localhost:3001/api/tracker/employee', body)
        return init();
    })
}

const addRole = async () => {
    await getDepartmentDB()
    let arr = await departmentList[0].map(e => `${e.id} ${e.department_name}`)
    inquirer.prompt([
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
            choices: arr
        }
    ]).then(info => {
        console.log(info)
        var split = info.department.split(" ")
        let id = +split[0];
        const body = {
            title: info.title,
            salary: info.salary,
            id: id
        }
        console.log('body', body)
        return body
    }).then(body => {
        console.log(body)
        axios.post('http://localhost:3001/api/tracker/role', body)
        return init();
    })
}

const addDepartment = async () => {
    return inquirer.prompt([
        {
            type: 'input', 
            name: 'title',
            message: 'What is the Department title?'
        }
    ]).then(info => {
        console.log(info)
        const body = info.title;
        console.log('body', body)
        return body
    }).then(body => {
        axios.post('http://localhost:3001/api/tracker/department', body)
        init()
    })
}

//

// update employee role
let employeeList = [];
const updateEmployeeRole = async () => {
    await getEmployeeDB()
    let arr = await employeeList[0].map(e => `${e.id} ${e.first_name} ${e.last_name} `)
    await getRoleDB()
    let roleArr = await roleList[0].map(e => `${e.id} ${e.title}`)
    inquirer.prompt([
        {
            type: 'list',
            name: 'employee',
            message: 'Which employee would you like to update their role?',
            choices: arr
        },{
            type: 'list',
            name: 'role',
            message: 'What role would you like them to have',
            choices: roleArr
        }
        //put or post
    ]).then(data => {
        console.log(data)
        var idSplit = data.employee.split(" ")
        var roleSplit = data.role.split(" ")
        let id = +idSplit[0]
        let role = +roleSplit[0]
        const body = {
            id: id,
            role: role
        }
        return body
    }).then(data => {
        console.log('data', data)
        axios.put(`http://localhost:3001/api/tracker/employee/role/:id`, data)
    })
}

// update employee by id
const updateEmployeeDB = async () => {
    await axios.put('http://localhost:3001/api/tracker/employee/role/:id')
}

const getEmployees = async () => {
    await getEmployeeDB()
    let arr = await employeeList[0].map(e => `${e.id} ${e.first_name} ${e.last_name} ${e.title} ${e.department_name}`)
    console.log('arr', arr)
    init();
    
}

//axios calls
// employee DB
const getEmployeeDB = async () => {
        await axios.get('http://localhost:3001/api/tracker/employee')
        .then(response => {
            console.log('response', response.data)
            employeeList.push(response.data.data)
            console.log('getEmployeeDB hits')
            return employeeList
        })
}

// department DB
let departmentList = [];
const getDepartmentDB = async () => {
    await axios.get('http://localhost:3001/api/tracker/department')
    .then(response => {
        departmentList.push(response.data.data)
        console.log('get depatmentDB hit')
    })
}

//show departmentDB
const showDeparment = async () => {
    await getDepartmentDB();
    let arr = await departmentList[0].map(e => `${e.id} ${e.department_name}`)
    console.log(arr)
    init();
}

// role DB
let roleList = [];
const getRoleDB = async () => {
    await axios.get('http://localhost:3001/api/tracker/role')
    .then(response => {
        roleList.push(response.data.data)
        console.log('get roleDB hit')
    })
}

// show roleDB
const showRole = async () => {
    await getRoleDB();
    let arr = await roleList[0].map(e => `${e.id} ${e.title} ${e.salary} ${e.department_id}`)
    console.log(arr)
    init();
}

init();



// Dependencies
const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');
const dash = '-----------------------------------------------------';

const connection = mysql.createConnection(
    {
    host: 'localhost',
    user: 'root',
    password: 'OSU123',
    database: 'employee_db'
    },    
);

// Connect to database
connection.connect((err) => {
    if (err) throw err;
    console.log('***********************************')
    console.log('');
    console.log('Welcome to the Employee Tracker app')
    console.log('');
    console.log('***********************************')
    console.log('');
    mainMenu();
});

// Main menu
const mainMenu = () => {
    inquirer.prompt([{
        type: 'list',
        message: "Please choose an option:",
        name: 'choice',
        choices: [
            'View all departments?',
            'View all roles?',
            'View all employees?',
            'Add a department',
            'Add a role?',
            'Add an employee?',
            'Update an employee role?',
            'Exit'
        ]
    }]).then((answer) => {
        switch (answer.choice){
            case 'View all departments?':
                viewAllDepartments();
                break;
            case 'View all roles?':
                viewAllRoles();
                break;
            case 'View all employees?':
                viewAllEmployees();
                break;
            case 'Add a department':
                addDepartment();
                break;
            case 'Add a role?':
                addRole();
                break;
            case 'Add an employee?':
                addEmployee();
                break;
            case 'Update an employee role?':
                updateEmployeeRole();
                break;
            default:
                connection.end()
                break;                
        }
    })
};

// View all departments
const viewAllDepartments = () => {
    console.log(dash);
    console.log('');
    connection.query('SELECT * FROM department', (err, results) => {
        console.table(results);
        console.log(dash);
        console.log('');
        mainMenu();
    });
};

// View employees by roles
const viewAllRoles = () => {
    console.log(dash);
    console.log('');
    connection.query('SELECT * FROM roles', (err, results) => {
        console.table(results);
        console.log(dash);
        console.log('');
        mainMenu();
    });
};

// View all employees
const viewAllEmployees = () => {
    console.log(dash);
    console.log('');
    connection.query('SELECT * FROM employee', (err, results) => {
        console.table(results);
        console.log(dash);
        console.log('');
        mainMenu();
    });
};

// Add department
const addDepartment = () => {
    inquirer.prompt([{
        type: 'input',
        name: 'newDepartment',
        message: 'What department would you like to add?',
        validate: newDepartment => {
            if (newDepartment) {
                return true;
            } else {
                console.log('Please enter a department!')
                return false;
            }
        }
    }]).then((answer) =>{
        connection.query('INSERT INTO department (department_name) VALUES (?)', answer.newDepartment, (err, result) => {
            if (err) throw err;
            console.log(answer.newDepartment + ' has been added to departments successfully.');
            mainMenu();
        })
    })
};

// Add role
const addRole = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'newRole',
            message: 'What role would you like to add?',
            validate: newRole => {
                if (newRole) {
                    return true;
                } else {
                    console.log('Please enter a role!')
                    return false;
                    }
                }
        },
        {
            type: 'input',
            name: 'newSalary',
            message: 'What will the salary be for this role?',
            validate: newSalary => {
                if (newSalary) {
                    return true;
                } else {
                    console.log('Please enter a salary!')
                    return false;
                    }
                }
        },
        {
            type: 'input',
            name: 'newDepartmentId',
            message: 'What will the salary be for this role?',
            validate: newDepartmentId => {
                if (newDepartmentId) {
                    return true;
                } else {
                    console.log('Please enter a department ID!')
                    return false;
                    }
                }
        }
    ]).then((answer) =>{
        connection.query('INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)', [answer.newRole, answer.newSalary, answer.newDepartmentId], (err, result) => {
            if (err) throw err;
            console.log(answer.newRole + ' has been added successfully.');
            mainMenu();
        })
    })
    
};

// Add employee
// const addEmployee = () => {
//     inquirer.prompt([{
//         type: 'input',
//         name: 'newEmployee',
//         message: 'What employee would you like to add?',
//         validate: newEmployee => {
//             if (newEmployee) {
//                 return true;
//             } else {
//                 console.log('Please enter a employee!')
//                 return false;
//             }
//         }
//     }]).then((answer) =>{
//         connection.query('INSERT INTO employee (title) VALUES (?)', answer.newEmployee, (err, result) => {
//             if (err) throw err;
//             console.log(answer.newEmployee + ' has been added to employees.');
//             mainMenu();
//         })
//     })

// };

// Update employee role
const updateEmployeeRole = () => {

};

const updateEmployeeManagers = () => {

};

const viewEmployeesByManager = () => {

};

const viewEmployeesByDepartment = () => {

};

const deleteDeptRolesEmployees = () => {

};


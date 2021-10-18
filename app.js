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
            console.log(answer.newDepartment + ' has been added to departments.');
            mainMenu();
        })
    })
};

// Add role
const addRole = () => {

};

// Add employee
const addEmployee = () => {

};

// Update employee role
const updateEmployeeRole = () => {

};
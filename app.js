// Dependencies
require('dotenv').config();
const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');
const dash = '-----------------------------------------------------';

const connection = mysql.createConnection(
    {
    host: 'localhost',
    user: 'root',
    password: process.env.PASSWORD,
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
    console.log('');
    console.log('');
    console.log('Main Menu');
    console.log('');
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
                connection.end();
                console.log("");
                console.log("Good Bye!");
                break;                
        }
    })
};

// View all departments
const viewAllDepartments = () => {
    console.log(dash);
    console.log('');
    connection.query('SELECT department_name AS Department, id AS ID FROM department', (err, results) => {
        console.table(results);
        console.log(dash);
        console.log('');
        mainMenu();
    });
};

// View all employee roles
const viewAllRoles = () => {
    console.log(dash);
    console.log('');
    connection.query('SELECT roles.title AS "Job Title", roles.id AS ID, department.department_name AS Department, CONCAT("\$",roles.salary) AS Salary FROM roles INNER JOIN department ON roles.department_id=department.id', (err, results) => {
        if (err) throw err;
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
    connection.query("SELECT employee.id AS ID, CONCAT(employee.first_name, ' ', employee.last_name) AS 'Employee Name', roles.title AS Title, department.department_name AS Department, CONCAT('\$',roles.salary) AS Salary, CONCAT(manager.first_name, ' ', manager.last_name) AS Manager FROM employee INNER JOIN roles ON roles.id=employee.role_id INNER JOIN department ON roles.department_id=department.id LEFT JOIN employee manager ON employee.manager_id=manager.id;", (err, results) => {
        if (err) throw err;
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
            type: 'number',
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
            type: 'number',
            name: 'newDepartmentId',
            message: `What is the new department's ID?`,
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

// Add an employee
const addEmployee = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'newFirstName',
            message: 'What is the first name of the new employee?',
            validate: newFirstName => {
                if (newFirstName) {
                    return true;
                } else {
                    console.log('Please enter a first name!')
                    return false;
                    }
                }
        },
        {
            type: 'input',
            name: 'newLastName',
            message: 'What is the Last name of the new employee?',
            validate: newLastName => {
                if (newLastName) {
                    return true;
                } else {
                    console.log('Please enter a last name!')
                    return false;
                    }
                }
        },
        {
            type: 'number',
            name: 'newRoleId',
            message: `What is the new employee's role ID?`,
            validate: newRoleId => {
                if (newRoleId) {
                    return true;
                } else {
                    console.log('Please enter a role ID!')
                    return false;
                    }
                }
        },
        {
            type: 'number',
            name: 'newManagerId',
            message: `What is the new employee's manager's ID?`,
            validate: newManagerId => {
                if (newManagerId) {
                    return true;
                } else {
                    console.log('Please enter a manager ID!')
                    return false;
                    }
                }
        }
    ]).then((answer) =>{
        connection.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)', [answer.newFirstName, answer.newLastName, answer.newRoleId, answer.newManagerId], (err, result) => {
            if (err) throw err;
            console.log(answer.newFirstName + ' ' + answer.newLastName + ' has been added successfully.');
            mainMenu();
        })
    })
    
};

// Update employee role
const updateEmployeeRole = () => {
    

    connection.query('SELECT * FROM employee;', (err,data) => {
        if (err) throw err;
        const allEmployees = data.map(({id, first_name, last_name}) => ({name: first_name + ' ' + last_name, value: id}));

        
        inquirer.prompt([
            {
                type: 'list',
                name: 'employeeName',
                message: "Which employee would you like to update?",
                choices: allEmployees
                
            }
        ]).then((answers) => {
            const selectedEmployee = answers.employeeName;
            console.log(selectedEmployee);
            
            connection.query('SELECT * FROM roles;', (err, data) => {
                if (err) throw err;
                const allRoles = data.map(({id, title}) => ({name: title, value: id}));
                
                inquirer.prompt([
                    {
                        type: 'list',
                        name: 'employeeRole',
                        message: `What is the new role of ${selectedEmployee}?`,
                        choices: allRoles
                    }
                ]).then((answers) => {
                    const selectedRole = answers.employeeRole;
                    console.log(selectedRole);
                    

                    connection.query('UPDATE employee SET role_id=? WHERE id=?', [selectedRole, selectedEmployee], (err, result) => {
                        if (err) throw err;
                        console.log("The employee's role has been successfully updated.");
                        mainMenu();

                    });
                });
            });
        });
    });
};
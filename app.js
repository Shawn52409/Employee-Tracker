// Dependencies
const express = require('express');
const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'OSU123',
    database: 'employee_db'
});

const mainMenu = () => {
    inquirer.prompt([{
        type: 'list',
        message: "Please choose an option:",
        name: 'choice',
        choices: [
            'View all departments?',
            'View all employees by roles?',
            'View all employees?',
            'Add a department',
            'Add a role?',
            'Add an employee?',
            'Update an employee role?'
        ]
    }])
};
var fs = require("fs");
const inquirer = ("inquirer");
const path = require("path");

const questions = [
    {
        type: "checkbox",
        message: "What would you like to do?",
        choices: ["View All Employees", "Add Employee", "Update Employee Role", "View All Roles", "Add Role", "View All Departments", "Add Department", "Quit"],
    },
    {
        type: "input",
        message: "What is the name of the department?",
    },
    {
        type: "input",
        message: "What is the name of the role?",
    },
    {
        type: "input",
        message: "What is the salary of the role?"
    },
    {
        type: "checkbox",
        message: "Which department does the role belong to?",
        choices: ["Engineering", "Finance", "Legal", "Sales", "Service"],
    },
    {
        type: "input",
        message: "What is the employee's first name?"
    },
    {
        type: "input",
        message: "What is the employee's last name?"
    },
    {
        type: "checkbox",
        message: "Who is the employee's manger?",
        choices: ["None", "John Doe", "Mike Chan", "Ashley Rodriguez", "Kevin Tupik", "Kunal Singh", "Malia Brown"],
    },
];
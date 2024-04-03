var fs = require("fs");
var inquirer = ("inquirer");
const path = require("path");
const dragonBird = require('./db/connection');
const { error } = require("console");

// establish a connection
dragonBird.connect(err => {
    if (err) throw error;
    console.log('Hey! The database is connected!');
    people_tracker();
});


var questions = function () {
    inquirer.prompt([{
        // Command line questions
            type: "checkbox",
            name: "prompt",
            message: "What would you like to do?",
            choices: ["View All Employees", "Add Employee", "Update Employee Role", "View All Roles", "Add Role", "View All Departments", "Add Department", "Quit"],
    }]).then((answers) => {
        if (answers.prompt === 'View All Department') {
            dragonBird.query(`SELECT * FROM department`, (err, result) => {
                if (err) throw err;
                console.log("Viewing All Departments: ");
                console.table(result);
                people_tracker();
        });
    } else if (answers.prompt === 'View All Roles') {
        dragonBird.query(`SELECT * FROM role`, (err, result) => {
            if (err) throw err;
            console.log("Viewing All Roles: ");
            console.table(result);
            people_tracker();
        });
    } else if (answers.prompt === 'Add A Department') {
        inquirer.prompt([{
            // To add a department
            type: "input",
            name: "department",
            message: "What is the name of the department?",
            validate: departmentsInput => {
                if (departmentsInput) {
                    return true;
                } else {
                    console.log("Whoops! We forgot to add the department!");
                    return false;
                }
            }
        }]);
    } else if (answers.prompt === 'View All Employees') {
        dragonBird.query(`SELECT * FROM role`, (err, result) => {
            if (err) throw err;
            console.log("Viewing All Roles: ");
            console.table(result);
            people_tracker();
        });
    } 
 [
    
    {
        type: "input",
        message: "What is the name of the role?",
    },
    {
        type: "input",
        message: "What is the salary of the role?"
    },
    {
        type: "input",
        message: "What is the name of the department?",
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
        choices: ["None", "Chiron", "Albus Dumbledore", "Tony Stark", "Sean Maguire", "Gandalf The Gray", "Charles Xavier"],
    },
];
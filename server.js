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
                console.log("Now Viewing All Departments: ");
                console.table(result);
                people_tracker();
        });
    } else if (answers.prompt === 'View All Roles') {
        dragonBird.query(`SELECT * FROM role`, (err, result) => {
            if (err) throw err;
            console.log("Now Viewing All Roles: ");
            console.table(result);
            people_tracker();
        });
    } else if (answers.prompt === 'View All Employees') {
        db.query(`SELECT * FROM employee`, (err, result) => {
            if (err) throw err;
            console.log("Now Viewing All Employees: ");
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
        }]).then(answers) => {
            dragonBird.query(`INSERT INTO department (name) VALUES (?)`, [answers.departments], (err, result) => {
                if (err) throw err;
                console.log(`Added ${answers.departments} to the database.`)
                people_tracker();
            });
    } else if (answers.prompt === 'Add A Role') {
        // Department choices -- I literally have know idea
        dragonBird.query(`SELECT * FROM departments`, (err, result) => {
            if (err) throw err;

            inquirer.prompt([
                {
                    // Add a Role
                    type: "input",
                    name: 'roles',
                    message: "What is the name of the role?",
                    validate: roleInput => {
                        if (roleInput) {
                            return true;
                        } else {
                            console.log('Whoops! We forgot to add a role!');
                            return false;
                        }
                    }
                },
                {
                    // Add a salary
                    type: "input",
                    name: 'salary',
                    message: "What is the salary of the role?",
                    validate: salaryInput => {
                        if (salaryInput) {
                            return true;
                        } else {
                            console.log('Whoops! We forgot to add a salary!');
                            return false;
                        }
                    }
                },
                {
                    type: "input",
                    name: "departments",
                    message: "What is the name of the department?",
                    choices: () => {
                        var array = [];
                        for (var i = 0; i < result.length; i++) {
                            array.push(result[i].name);
                        }
                        return array;
                    }
                }
            ]).then((answers) => {
                // Compares the result and storing into the variable, I don't know why or what it means.
                for (var i = 0; i < result.length; i++) {
                    if (result[i].name === answers.departments) {
                        var department = result[i];
                    }
                }
            
                dragonBird.query(`INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`, [answers.roles, answers.salary, department.id], (err, result) => {
                    if (err) throw err;
                    console.log(`We added ${answers.role} to the database.`)
                    people_tracker();
                });
            })
        });
    } else if (answers.prompt === '') {
        // Calling the database to acquire the role and managers
        dragonBird.query(`SELECT * FROM employees, roles`, (err, result) => {
            if (err) throw err;

            inquirer.prompt([
                {
                    // Add the Employee Name
                    type: "input",
                    name: 'firstName',
                    message: "What is the employee's first name?",
                    validate: firstNameInput => {
                        if (firstNameInput) {
                            return true;
                        } else {
                            console.log('We forgot to add a first name!');
                            return false;
                        }
                    }
                },
                {
                    // The last name
                    type: "input",
                    name: "lastName",
                    message: "What is the employee's last name?",
                    validate: lastNameInput => {
                        if (lastNameInput) {
                            return true;
                        } else {
                            console.log('We forgot to add a salary!');
                            return false;
                        }
                    }
                },
                {
                    // Add an employee role
                    type: "list",
                    name: "roles",
                    message: "What is the employees role?",
                    choices: () => {
                        var list = [];
                        for (var i = 0; i < result.length; i++) {
                            list.push(result[i].title);
                        }
                        var newList = [new Set(list)];
                        return newList;
                    }
                },
                {
                    // Add a Manager
                    type: "checkbox",
                    name: "manager",
                    message: "Who is the employee's manger?",
                    choices: ["None", "Chiron", "Albus Dumbledore", "Tony Stark", "Sean Maguire", "Gandalf The Gray", "Charles Xavier"],
                    validate: managerInput => {
                        if (managerInput) {
                            return true;
                        } else {
                            console.log('We forgot to add the manager!');
                            return false;
                        }
                    }
                }
            ])
        })
    }
    
    [
    

//     {
//         type: "input",
//         name: "departments",
//         message: "What is the name of the department?",
//     },
//     {
//         type: "checkbox",
//         message: "Which department does the role belong to?",
//         choices: ["Engineering", "Finance", "Legal", "Sales", "Service"],
//     },
//     {
        
//     },
    
// ];
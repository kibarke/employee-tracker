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
                console.log(`Added ${answers.departments} to the Bat Computer.`)
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
                    console.log(`We added ${answers.role} to the Bat Computer.`)
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
            ]).then((answers) => {
                // Comparing and storing results, I think this is for the table
                for (var i = 0; i < result.length; i++) {
                    if (result[i].title === answers.role) {
                        let role = result[i];
                    }
                }

                dragonBird.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`, [answers.firstName, answers.lastName, answers.role.id, answers.manager.id],(err, result) => {
                    if (err) throw err;
                    console.log(`Added ${answers.firstName} ${answers.lastName} to the Bat Computer.`)
                    people_tracker();
                });
            })
        });
    } else if (answers.prompt === 'Update An Employee Role') {
        // calling the database/bat-computer to obtain the roles and managers
        dragonBird.query(`SELECT * FROM employee, role`, (err, result) => {
            if (err) throw err;

            inquirer.prompt([
                {
                    // Employee Update
                    type: 'list',
                        name: 'employee',
                        message: 'Which employee role do you want to update?',
                        choices: () => {
                            var array = [];
                            for (var i = 0; i < result.length; i++) {
                                array.push(result[i].last_name);
                            }
                            var employeeArray = [...new Set(array)];
                            return employeeArray;
                    }
                },
                {
                    // Role Update
                    type: 'list',
                        name: 'role',
                        message: 'What is their new role?',
                        choices: () => {
                            var array = [];
                            for (var i = 0; i < result.length; i++) {
                                array.push(result[i].title);
                            }
                            var newArray = [...new Set(array)];
                            return newArray;
                    }
                }
            ]).then((answers) => {
                for (var i = 0; i < result.length; i++) {
                    if (result[i].last_name === answers.employee) {
                        var role = result[i];
                    }
                }

                for (var i = 0; i < result.length; i++) {
                    if (result[i].title === answers.role) {
                        var role = result[i];
                    }
                }

                dragonBird.query(`UPDATE employee SET ? WHERE ?`, [{role_id: role}, {last_name: name}], (err, result) => {
                    if (err) throw err;
                    console.log(`Updated ${answers.employee} role to the Bat Computer.`)
                })
            })
        });
        } else if (answers.prompt === 'Log Out') {
            dragonBird.end();
            console.log("Bat Computer shutting down. Good-bye Batman!");
        }
    })
};
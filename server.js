// My variables
const inquirer = require('inquirer');
const batDataBase = require('./data/connection'); // Can you tell that I like batman?


// start the database / bat computer connection
batDataBase.connect(err => {
    if (err) throw err;
    console.log('Bat Computer is watching.');
    people_tracker();
});

var people_tracker = function () {
    inquirer.prompt([{
        // Beginning the command line
        type: 'list', // Yeah this can't be a checkbox
        name: 'prompt',
        message: 'What would you like to do?',
        choices: ["View All Employees", "Add An Employee", "Update Employee Role", "View All Roles", "Add Role", "View All Departments", "Add Department", "Quit"]
    }]).then((answers) => {
        if (answers.prompt === "View All Employees") {
            batDataBase.query(`SELECT * FROM employees`, (err, result) => {
                if (err) throw err;
                console.log("Now Viewing All Employees: ");
                console.table(result);
                people_tracker();
            });
        } else if (answers.prompt === "View All Roles") {
            batDataBase.query(`SELECT * FROM roles`, (err, result) => {
                if (err) throw err;
                console.log("Now Viewing All Roles: ");
                console.table(result);
                people_tracker();
            });
        } else if (answers.prompt === "View All Departments") {
            batDataBase.query(`SELECT * FROM departments`, (err, result) => {
                if (err) throw err;
                console.log("Now Viewing All Departments: ");
                console.table(result);
                people_tracker();
            });
        } else if (answers.prompt === "Add A Department") {
            inquirer.prompt([{
            type: "input",
            name: "departments",
            message: "What is the name of the department?",
            validate: departmentsInput => {
                if (departmentsInput) {
                    return true;
                    } else {
                        console.log("Whoops! We forgot to add the department!");
                        return false;
                    }
                }
            }]).then ((answers) => {
                batDataBase.query(`INSERT INTO departments (name) VALUES (?)`, [answers.departments], (err, result) => {
                    if (err) throw err;
                    console.log(`Added ${answers.departments} to the Bat Computer.`)
                    people_tracker();
                });
            })
        } else if (answers.prompt === `Add A Role`) {
            // Department choices -- Chose the role that suits the employee
            batDataBase.query(`SELECT * FROM departments`, (err, result) => {
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
                                console.log("Whoops! We forgot to add a salary!");
                                return false;
                            }
                        }
                    },
                    {
                    type: "list",
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
                            var departments = result[i];
                        }
                    }
                    
                    batDataBase.query(`INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`, [answers.roles, answers.salary, departments.id], (err, result) => {
                        if (err) throw err;
                        console.log(`We added ${answers.roles} to the Bat Computer.`)
                        people_tracker();
                    });
                })
            });
        } else if (answers.prompt === "Add An Employee") {
            // Calling the database to acquire the role and managers
            batDataBase.query(`SELECT * FROM employees, roles`, (err, result) => {
                if (err) throw err;

                inquirer.prompt([
                    {
                        // Add the First Employee Name
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
                        // Add the Last Employee Name
                        type: "input",
                        name: "lastName",
                        message: "What is the employee's last name?",
                        validate: lastNameInput => {
                            if (lastNameInput) {
                                return true;
                            } else {
                                console.log("We forgot to add a salary!");
                                return false;
                            }
                        }
                    },
                    {
                        // Add an employee role
                        type: "list",
                        name: "roles",
                        message: "What is the role of the employee?",
                        choices: () => {
                            var list = [];
                            for (var i = 0; i < result.length; i++) {
                                list.push(result[i].title);
                            }
                            var newList = [...new Set(list)];
                            return newList;
                        }
                    },
                    {
                        // Add a Manager
                    type: "list",
                    name: "manager",
                    message: "Who is the employee's manger?",
                    choices: ["None", "Chiron", "Albus Dumbledore", "Tony Stark", "Sean Maguire", "Gandalf The Gray", "Charles Xavier"],
                        validate: managerInput => {
                            if (managerInput) {
                                return true;
                            } else {
                                console.log("We forgot to add the manager!")
                                return false;
                            }
                        }
                    }
                ]).then((answers) => {
                    // Comparing and storing results, I think this is for the table
                    for (var i = 0; i < result.length; i++) {
                        if (result[i].title === answers.roles) {
                            var role = result[i]; // var vs let have different meanings?
                        }
                    } if (answers.role && answers.manager) { // hey furture me, this is where the problem is
                        batDataBase.query(`INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`, [answers.firstName, answers.lastName, answers.role.id, answers.manager.id], (err, result) => {
                            if (err) {
                                console.error("There was a problem adding the employee:", err);
                            } else {
                                console.log(`Added ${answers.firstName} ${answers.lastName} to the Bat Computer.`);
                            }
                        }
                    );
                }   
                })
            });
        } else if (answers.prompt === 'Update An Employee Role') {
             // calling the database/bat-computer to obtain the roles and managers
             batDataBase.query(`SELECT * FROM employees, roles`, (err, result) => {
                if (err) throw err;

                inquirer.prompt([
                    {
                        // Choose the Employee to Update
                        type: "list",
                        name: "employees",
                        message: "Which employees role do you want to update?",
                        choices: () => {
                            var list = [];
                            for (var i = 0; i < result.length; i++) {
                                list.push(result[i].last_name);
                            }
                            var employeeList = [...new Set(list)];
                            return employeeList;
                        }
                    },
                    {
                        // Role Update
                        type: 'list',
                        name: 'roles',
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
                        if (result[i].last_name === answers.employees) {
                            var name = result[i];
                    }
                } // wait why do I have this second thing again?
                    // yeah don't comment out this code nor delete it
                    for (var i = 0; i < result.length; i++) {
                        if (result[i].title === answers.roles) {
                            var role = result[i];
                    }
                }
                batDataBase.query(`UPDATE employees SET ? WHERE ?`, [{roles_id: roles}, {last_name: name}], (err, result) => {
                    if (err) throw err;
                    console.log(`Updated ${answers.employees} role to the database.`)
                    people_tracker();
                });
            })
        });
        } else if (answers.prompt === 'Log Out') {
            batDataBase.end();
            console.log("Bat Computer Signing Off!");
        }
    })    
};
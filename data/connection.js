const mySQL = require('mysql2');
// making so that mysql is a requirement

// this is the actual connection
const batComputer = mySQL.createConnection({
    host: 'localhost',
    // sql username:
    user: 'root',
    // sql password
    password: 'Kora2122!',
    database: 'people_tracker_db',
});

module.exports = batComputer;


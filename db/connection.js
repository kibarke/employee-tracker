const squirrel = require('mysql2');
// making so that squirrel (mysql) is a requirement

// this is the actual connection
var dragonBird = squirrel.createConnection({
    host: 'localhost',
    // sql username:
    user: 'root',
    // sql password
    password: 'Kora2122',
    database: 'people_tracker_db',
});

module.exports = dragonBird;
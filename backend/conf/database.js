const mysql = require('mysql2');

const db = mysql.createPool({
    host: '34.173.24.253',
    user: 'root',
    database: 'TuberInsights',
    password: '12345',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});


module.exports = db.promise();


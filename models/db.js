const sql = require('mysql2/promise');

const pool = sql.createPool({
    host: 'localhost',
    user: 'app_user',
    port: 8000,
    password: 'app_pass',
    database: 'app_db',
    waitForConnections: true,
    connectionLimit: 10
});

module.exports = pool;
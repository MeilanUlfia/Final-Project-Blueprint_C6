const mysql = require('mysql2');

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'db_service',
    user: process.env.DB_USER || 'user_flow',
    password: process.env.DB_PASS || 'password123',
    database: process.env.DB_NAME || 'flowfinance_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// WAJIB ADA: ini yang membuat 'await db.query' di index.js berfungsi
module.exports = pool.promise();
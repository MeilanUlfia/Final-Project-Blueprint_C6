const mysql = require('mysql2');
require('dotenv').config(); // Load env variables

// Buat pool koneksi
const pool = mysql.createPool({
    host: process.env.DB_HOST, // Ini akan membaca 'db_service' dari docker-compose
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Export promise pool agar bisa pakai async/await
module.exports = pool.promise();
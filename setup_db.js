const mysql = require('mysql2/promise');

async function createDb() {
    try {
        const connection = await mysql.createConnection({
            host: 'localhost',
            port: 3306,
            user: 'root',
            password: '', // Default XAMPP
        });

        await connection.query(`CREATE DATABASE IF NOT EXISTS web_navarro;`);
        console.log('Database web_navarro created or already exists.');
        await connection.end();
    } catch (err) {
        console.error('Error creating database:', err);
        console.log('Make sure XAMPP MySQL is running!');
    }
}

createDb();

const mysql = require('mysql2/promise');

async function cleanDb() {
    try {
        const connection = await mysql.createConnection({
            host: 'localhost',
            port: 3306,
            user: 'root',
            password: '', // Default XAMPP
            database: 'web_navarro'
        });

        console.log('Connected to database.');

        // 1. Delete all enrollments (we must do this first due to foreign keys)
        await connection.query('DELETE FROM enrollment');
        console.log('All enrollments deleted.');

        // 2. Delete all students
        await connection.query('DELETE FROM student');
        console.log('All students deleted.');

        // 3. Delete specific sections
        const sectionsToDelete = [
            'Matematicas 1',
            'Matemáticas 1',
            'Matemáticas I',
            'fisica 1',
            'Física 1',
            'Física I',
            'programacion web',
            'Programación Web',
            'matematicas 2',
            'Matemáticas 2',
            'Matemáticas II'
        ];

        for (const name of sectionsToDelete) {
            const [result] = await connection.query('DELETE FROM section WHERE nombre = ?', [name]);
            if (result.affectedRows > 0) {
                console.log(`Deleted section: ${name}`);
            }
        }

        console.log('Database cleanup completed successfully.');
        await connection.end();
    } catch (err) {
        console.error('Error cleaning database:', err);
        console.log('Make sure XAMPP MySQL is running!');
    }
}

cleanDb();

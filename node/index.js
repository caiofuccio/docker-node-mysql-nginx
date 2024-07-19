import express from 'express';
import mysql from 'mysql2/promise';

const app = express();
const port = 3000;
const databaseConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
};

try {
    const connection = await mysql.createConnection(databaseConfig);

    const insertNewName = async (nameToInsert) => {
        const query = `INSERT INTO people(name) values('${nameToInsert}')`;
        await connection.query(query);
    };

    app.get('/', async (_, res) => {
        try {
            const nameToInsert = 'Caio';
            await insertNewName(nameToInsert);
            res.send('<h1>Full Cycle Rocks!</h1>');
        } catch (error) {
            res.status(500).send('Internal Server Error');
        }
    });

    app.listen(port, () => {
        console.log('Server is up on port ', port);
    });
} catch (error) {
    console.error('Error connecting to the database:', error);
}

import express from 'express';
import mysql from 'mysql2/promise';

const app = express();
const port = 3000;
const databaseConfig = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb',
    port: 3306,
};

try {
    const connection = await mysql.createConnection(databaseConfig);

    const insertNewName = async (nameToInsert) => {
        const query = `INSERT INTO people(name) values(${nameToInsert})`;
        await connection.query(query, (error) => {
            if (error) throw new Error({ error });
        });
        await connection.end();
    };

    app.get('/', async (_, res) => {
        try {
            const nameToInsert = 'Caio';
            await insertNewName(nameToInsert);
            res.send('<h1>Full Cycle Rocks!</h1>');
        } catch (error) {
            throw new Error({ error });
        }
    });

    app.listen(port, () => {
        console.log('Server is up on port ', port);
    });
} catch (error) {
    throw new Error({ error });
}

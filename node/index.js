import express from 'express';
import mysql from 'mysql2';

const app = express();
const port = 3000;
const databaseConfig = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'db',
};

const connection = mysql.createConnection(config);

const nameToInsert = 'Caio';
const query = `INSERT INTO people(name) values(${nameToInsert})`;
client.query(query);
connection.end();

app.get('/', (req, res) => {
    res.send('<h1>Full Cycle Rocks!</h1>');
});

app.listen(port, () => {
    console.log('Server is up on port ', port);
});

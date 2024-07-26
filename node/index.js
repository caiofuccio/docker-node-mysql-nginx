import express from 'express';
import mysql from 'mysql2/promise';
import { uniqueNamesGenerator, names } from 'unique-names-generator';

const app = express();
const port = 3000;
const databaseConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
};
const nameGeneratorConfig = {
    dictionaries: [names],
};

try {
    const connection = await mysql.createConnection(databaseConfig);

    const executeQuery = async (query) => await connection.query(query);

    const insertNewName = async (nameToInsert) => {
        const query = `INSERT INTO people(name) values('${nameToInsert}')`;
        await executeQuery(query);
    };

    const getAllNames = async () => {
        const query = `SELECT name FROM people`;
        return await executeQuery(query).then((response) => response[0]);
    };

    const buildHtmlNamesList = (nameList) => {
        let htmlNamesList = '<ul>';

        nameList.forEach(
            (nameObject) => (htmlNamesList += `<li>${nameObject.name}</li>`)
        );

        htmlNamesList += '</ul>';

        return htmlNamesList;
    };

    app.get('/', async (_, res) => {
        try {
            const nameToInsert = uniqueNamesGenerator(nameGeneratorConfig);
            await insertNewName(nameToInsert);
            const names = await getAllNames();
            const htmlNamesList = buildHtmlNamesList(names);
            const htmlResponse = `<h1>Full Cycle Rocks!</h1>
            <br/>
            <h2>Nomes cadastrados</h2>
            ${htmlNamesList}
            `;
            res.send(htmlResponse);
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

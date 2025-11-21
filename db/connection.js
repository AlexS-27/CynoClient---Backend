/*
FILE          : connection.js
AUTHOR        : Niels Delafontaine
DATE CREATED  : 14.11.2025
LAST MODIFIED : 21.11.2025
DESCRIPTION   :
    Database access module using mysql2/promise.
    Provides:
        - MySQL connection handling
        - CRUD-like utilities to retrieve data from tables
        - Safe connection opening/closing
        - Helper functions for retrieving all records or a single record by ID
    Acts as the centralized data layer for the application.

REQUIRED LIBRARIES:
    - mysql2/promise : For asynchronous MySQL interactions.

EXPORTED OBJECT:
    - db (object literal):
        Methods:
            • connectToDB()
                Creates and returns a new MySQL connection.
            • disconnectFromDatabase(connection)
                Gracefully closes the provided MySQL connection.

            • getAllClients(limit)
            • getAllDogs(limit)
            • getAllLocations(limit)
            • getAllServices(limit)
                → Fetch all rows from the corresponding table, with optional LIMIT.

            • getClientById(id)
            • getDogById(id)
            • getLocationById(id)
            • getServiceById(id)
                → Fetch a single record by ID from the corresponding table.

BEHAVIOR:
    - Each query:
        • Opens a new connection
        • Executes the SQL statement
        • Returns the result
        • Closes the connection in a finally block

NOTES:
    - This module abstracts database logic away from controllers and models.
    - All errors are logged and rethrown for central error handling.
    - Designed for small to medium projects (creates new connection per request).
*/


import mysql from 'mysql2/promise';

//I create a javascript literal object which contains methods, I will export it after having created it
const db = {

    connectToDB: async () => {
        try {
            const connection = await mysql.createConnection({
                host: process.env.DB_HOST,
                user: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                port: process.env.DB_PORT,
                database: process.env.DB_NAME, //database name
            });
            console.log("Connected to DB");
            return connection;
        } catch (error) {
            console.error("Error connexion DataBase", error);
            error.status = 503;
            throw error;
        }

    },

    getAllLocations: async (limit) => {
        let con;
        try {
            con = await db.connectToDB();
            //the getAllLocalities function waits until the query is finished to execute
            //if there is some code after the call of this function, it will be executed without waiting the execution of this function
            let request = 'SELECT * FROM locations';
            if (limit != null) {
                request = `${request} limit ${limit}`;
            }
            const [rows] = await con.query(request);
            return rows;
        } catch (err) {
            console.log(err);
            throw err;
        } finally {
            if (con) {await db.disconnectFromDatabase(con); }
        }
    },

    getAllServices: async (limit) => {
        let con;
        try {
            con = await db.connectToDB();
            //the getAllServices function waits until the query is finished to execute
            //if there is some code after the call of this function, it will be executed without waiting the execution of this function
            let request = 'SELECT * FROM services';
            if (limit != null) {
                request = `${request} limit ${limit}`;
            }
            const [rows] = await con.query(request);
            return rows;
        } catch (err) {
            console.log(err);
            throw err;
        } finally {
            if (con) {await db.disconnectFromDatabase(con); }
        }
    },

    getAllDogs: async (limit) => {
        let con;
        try {
            con = await db.connectToDB();
            //the getAllDogs function waits until the query is finished to execute
            //if there is some code after the call of this function, it will be executed without waiting the execution of this function
            let request = 'SELECT * FROM dogs';
            if (limit != null) {
                request = `${request} limit ${limit}`;
            }
            const [rows] = await con.query(request);
            return rows;
        } catch (err) {
            console.log(err);
            throw err;
        } finally {
            if (con) {await db.disconnectFromDatabase(con); }
        }
    },

    getAllClients: async (limit) => {
        let con;
        try {
            con = await db.connectToDB();
            //the getAllClients function waits until the query is finished to execute
            //if there is some code after the call of this function, it will be executed without waiting the execution of this function
            let request = 'SELECT * FROM clients';
            if (limit != null) {
                request = `${request} limit ${limit}`;
            }
            const [rows] = await con.query(request);
            return rows;
        } catch (err) {
            console.log(err);
            throw err;
        } finally {
            if (con) {await db.disconnectFromDatabase(con); }
        }
    },

    getLocationById: async ( id) => {
        let con;
        try {
            con = await db.connectToDB();
            const [rows] = await con.query('SELECT * FROM locations WHERE id = ?', [id]);
            return rows[0];
        } catch (err) {
            console.log(err);
            throw err;
        } finally {
            if (con) {await db.disconnectFromDatabase(con); }
        }
    },

    getServiceById: async ( id) => {
        let con;
        try {
            con = await db.connectToDB();
            const [rows] = await con.query('SELECT * FROM services WHERE id = ?', [id]);
            return rows[0];
        } catch (err) {
            console.log(err);
            throw err;
        } finally {
            if (con) {await db.disconnectFromDatabase(con); }
        }
    },

    getDogById: async ( id) => {
        let con;
        try {
            con = await db.connectToDB();
            const [rows] = await con.query('SELECT * FROM dogs WHERE id = ?', [id]);
            return rows[0];
        } catch (err) {
            console.log(err);
            throw err;
        } finally {
            if (con) {await db.disconnectFromDatabase(con); }
        }
    },

    getClientById: async ( id) => {
        let con;
        try {
            con = await db.connectToDB();
            const [rows] = await con.query('SELECT * FROM clients WHERE id = ?', [id]);
            return rows[0];
        } catch (err) {
            console.log(err);
            throw err;
        } finally {
            if (con) {await db.disconnectFromDatabase(con); }
        }
    },

    disconnectFromDatabase: async (connection) => {
        try {
            await connection.end();
            console.log('Déconnexion de la base de données réussie');
        } catch (error) {
            console.error('Erreur lors de la déconnexion de la base de données :', error);
            throw error;
        }
    }
}

export { db }

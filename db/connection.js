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
            console.log('DB_HOST:', process.env.DB_HOST);
            console.log('DB_USER:', process.env.DB_USER);
            console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
            console.log('DB_NAME:', process.env.DB_NAME);


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

    getAllDogs: async (filters = {},limit = null) => {
        let con;
        try {
            con = await db.connectToDB();
            //the getAllDogs function waits until the query is finished to execute
            //if there is some code after the call of this function, it will be executed without waiting the execution of this function
            let request = 'SELECT * FROM dogs where 1=1';
            const params = [];

            // Construct where
            if (filters.name) {
                request += " AND name like ?";
                params.push(`%${filters.name}%`);
            }

            if (filters.sex) {
                request += ` AND sex = ?`;
                params.push(filters.sex);
            }

            if (filters.client_id) {
                request += ` AND client_id = ?`;
                params.push(filters.client_id);
            }

            if (limit != null) {
                request = `${request} limit ${limit}`;
            }
            const [rows] = await con.query(request, params);
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
    createService: async (dog_id, service_date, location_id, duration_minutes) => {
        let con;
        try {
            con = await db.connectToDB();
            const [result] = await con.query(
                'INSERT INTO services (dog_id, service_date, location_id, duration_minutes) VALUES (?, ?, ?, ?)',
                [dog_id, service_date, location_id, duration_minutes] // ✅ 4 valeurs
            );
            return {
                id: result.insertId,
                dog_id,
                service_date,
                location_id,
                duration_minutes
            };
        } catch (err) {
            console.error(err);
            throw { status: 500, message: "Failed to create service." };
        } finally {
            if (con) await db.disconnectFromDatabase(con);
        }
        },

    // insertId taken from AI
    insertClient: async (clientData) => {
        let con;
        try {
            con = await db.connectToDB();

            const sql = `INSERT INTO clients (last_name, first_name, gender, email, phone_number, postal_address)
                                VALUES (?, ?, ?, ?, ?, ?)`;

            const values = [
                clientData.last_name,
                clientData.first_name,
                clientData.gender,
                clientData.email,
                clientData.phone_number,
                clientData.postal_address
            ];

            const [result] = await con.execute(sql, values);

            return result.insertId;
        } catch (err) {
            console.log(err);
            throw err;
        } finally {
            if (con) {await db.disconnectFromDatabase(con); }
        }
    },

    insertDog: async (dogData) => {
        let con;
        try {
            con = await db.connectToDB();

            const sql = `INSERT INTO dogs (name, sex, cross_breed, birthdate, sterilized, deceased, client_id, breed_id)
                                VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

            const values = [
                dogData.name,
                dogData.sex,
                dogData.cross_breed,
                dogData.birthdate,
                dogData.sterilized,
                dogData.deceased,
                dogData.client_id,
                dogData.breed_id,
            ];

            const [result] = await con.execute(sql, values);

            return result.insertId;
        } catch (err) {
            console.log(err);
            throw err;
        } finally {
            if (con) {await db.disconnectFromDatabase(con); }
        }
    },

    updateService: async (id, serviceData) => {
        let con;
        try {
            con = await db.connectToDB();

            //récupération des données à mettre à jour
            const keys = Object.keys(serviceData);
            if (keys.length === 0) return null;

            // construction des requêtes dynamique
            const setClause = keys.map(key => `${key} = ?`).join(',');
            const values = Object.values(serviceData);
            values.push(id); //Ajout de l'id pour WHERE

            const sql = `UPDATE services SET ${setClause} WHERE id = ?`;
            const [result] = await con.execute(sql, values);

            return result.affectedRows > 0;
        }catch(err) {
            console.error(err);
            throw err;
        }finally {
            if (con) {await db.disconnectFromDatabase(con); }
        }
    },

    updateClient: async (id, clientData) => {
        let con;
        try {
            con = await db.connectToDB();
            const sql = `UPDATE clients SET last_name = ?, first_name = ?, gender = ?, email = ?, phone_number = ?, postal_address = ?
               WHERE id = ?`;
            const values = [
                clientData.last_name,
                clientData.first_name,
                clientData.gender,
                clientData.email,
                clientData.phone_number,
                clientData.postal_address,
                id
            ];
            const [result] = await con.execute(sql, values);
            return result.affectedRows; // return the amount of modified lines
        } catch (err) {
            console.log(err);
            throw err;
        } finally {
            if (con) await db.disconnectFromDatabase(con);
        }
    },

    updateDog: async (id, dogData) => {
        let con;
        try {
            con = await db.connectToDB();
            // Filtre pour ignorer les valeurs 'undefined'
            const keys = Object.keys(dogData).filter(key => dogData[key] !== undefined);

            if (keys.length === 0) return 0;
            // Construction dynamique pour le SET
            const setClause = keys.map(key => `${key} = ?`).join(', ');
            // Attribution des valeurs correspondantes
            const values = keys.map(key => {
                // Conversion spécifique pour les bool
                if (['cross_breed', 'sterilized', 'deceased'].includes(key)) {
                    return dogData[key] ? 1 : 0;
                }
                return dogData[key];
            });

            values.push(id);

            const sql = `UPDATE dogs SET ${setClause} WHERE id = ?`;
            const [result] = await con.execute(sql, values);
            return result.affectedRows; // return the amount of modified lines
        } catch (err) {
            console.log(err);
            throw err;
        } finally {
            if (con) await db.disconnectFromDatabase(con);
        }
    },

    deleteService: async (id) => {
        let con;
        try {
            con = await db.connectToDB();
            const sql = 'DELETE FROM services WHERE id = ?';
            const [result] = await con.execute(sql, [id]);

            // Returns true if a row was deleted, false otherwise
            return result.affectedRows > 0;
        } catch (err) {
            console.error(err);
            throw err;
        } finally {
            if (con) await db.disconnectFromDatabase(con);
        }
    },

    deleteClient: async (id) => {
        let con;
        try {
            con = await db.connectToDB();
            const [result] = await con.execute('DELETE FROM clients WHERE id = ?', [id])
            return result.affectedRows;
        } catch (err) {
            console.log(err);
            throw err;
        } finally {
            if (con) await db.disconnectFromDatabase(con);
        }
    },

    deleteDog: async (id) => {
        let con;
        try {
            con = await db.connectToDB();
            const [result] = await con.execute('DELETE FROM dogs WHERE id = ?', [id])
            return result.affectedRows;
        } catch (err) {
            console.log(err);
            throw err;
        } finally {
            if (con) await db.disconnectFromDatabase(con);
        }
    },

    getClientsWithDogs: async (clientId) => {
        let con;
        try {
            con = await db.connectToDB();
            const query = `
                SELECT 
                    c.*, 
                    d.id AS dog_id, d.name AS dog_name, d.sex, d.birthdate, d.sterilized
                FROM clients c
                LEFT JOIN dogs d ON c.id = d.client_id
                ORDER BY c.id;
            `;
            const [rows] = await con.query(query);
            return rows;
        } catch (err) {
            console.log(err);
            throw err;
        } finally {
            if (con) await db.disconnectFromDatabase(con);
        }
    },



    disconnectFromDatabase: async (connection) => {
        try {
            await connection.end();
            console.log('Successfully disconnected from database.');
        } catch (error) {
            console.error('Encountered an error while disconnecting from database :', error);
            throw error;
        }
    },
}

export { db }

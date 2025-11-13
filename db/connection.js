import mysql from 'mysql2/promise';

//I create a javascript literal object which contains methods, I will export it after having created it
const db = {

    connectToDB: async () => {
        try {
            const connection = await mysql.createConnection({
                host: "localhost",
                user: "root",
                password: "",
                port: 3306,
                database: "cyno_client", //database name
            });
            console.log("Connected to DB");
            return connection;
        } catch (error) {
            console.error("Error connexion DataBase", error);
            throw error;
        }

    },

    getAllLocalities: async (limit) => {
        let con;
        try {
            con = await db.connectToDB();
            //the getAllLocalities function waits until the query is finished to execute
            //if there is some code after the call of this function, it will be executed without waiting the execution of this function
            let request = 'SELECT * FROM Localities';
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
            let request = 'SELECT * FROM Dogs';
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
            let request = 'SELECT * FROM Clients';
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

    getLocalityById: async ( id) => {
        let con;
        try {
            con = await db.connectToDB();
            const [rows] = await con.query('SELECT * FROM Localities WHERE id = ?', [id]);
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
            const [rows] = await con.query('SELECT * FROM Dogs WHERE id = ?', [id]);
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
            const [rows] = await con.query('SELECT * FROM Clients WHERE id = ?', [id]);
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

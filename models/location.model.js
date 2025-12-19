/*
FILE          : location.model.js
AUTHOR        : Alexandre Ramirez
DATE CREATED  : 14.11.2025
LAST MODIFIED : 21.11.2025
DESCRIPTION   :
    Data model for location-related operations.
    Provides database access methods to retrieve locations or a single location
    by its ID using the central database connection layer.

REQUIRED LIBRARIES:
    - ../db/connection.js  : Provides the database instance and connection utilities.

EXPORTED FUNCTIONS:
    - getAllLocations(limit)
        Retrieves all locations from the database.
        Optional 'limit' parameter restricts the number of returned results.
        Throws 503 if the database connection is unavailable.

    - getLocationById(id)
        Retrieves a single location by its unique identifier.
        Throws 503 if the database connection is unavailable.

NOTES:
    - All functions use async/await and return Promises.
    - Database availability is checked before each operation using db.connectToDB().
    - Errors are thrown as objects with {status, message} to integrate with controllers.
*/


import { db } from "../db/connection.js";

export const getAllLocations = async (limit = null) => {
    return await db.getAllLocations(limit);
};

export const getLocationById = async (id) => {
    return await db.getLocationById(id);
};

export const createLocation = async (locationData) => {
    const { name, postal_code, postal_code_extra, toponym, canton_code, lang_code } = locationData;
    let con;
    try {
        con = await db.connectToDB();
        const query = `
            INSERT INTO locations 
            (name, postal_code, postal_code_extra, toponym, canton_code, lang_code)
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        const [result] = await con.query(query, [
            name,
            postal_code,
            postal_code_extra || null,
            toponym,
            canton_code,
            lang_code
        ]);
        // Retourne l'ID de la nouvelle entrée
        return { id: result.insertId, ...locationData };
    } catch (err) {
        console.error("Error creating location:", err);
        throw { status: 500, message: "Failed to create location" };
    } finally {
        if (con) await db.disconnectFromDatabase(con);
    }
};

export const deleteLocationById = async (id) => {
    let con;
    try {
        con = await db.connectToDB();

        const query = `
            DELETE FROM locations
            WHERE id = ?
        `;

        const [result] = await con.query(query, [id]);

        if (result.affectedRows === 0) {
            return false;
        }

        return true;
    } catch (err) {
        console.error("Error deleting location:", err);
        throw { status: 500, message: "Failed to delete location" };
    } finally {
        if (con) await db.disconnectFromDatabase(con);
    }
};

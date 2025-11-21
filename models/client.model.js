/*
FILE          : service.model.js
AUTHOR        : Kilian Testard
DATE CREATED  : 14.11.2025
LAST MODIFIED : 21.11.2025
DESCRIPTION   :
    Data model for client-related operations.
    Provides database access methods to retrieve clients or a single client
    by its ID using the central database connection layer.

REQUIRED LIBRARIES:
    - ../db/connection.js  : Provides the database instance and connection utilities.

EXPORTED FUNCTIONS:
    - getAllClients(limit)
        Retrieves all clients from the database.
        Optional 'limit' parameter restricts the number of returned results.
        Throws 503 if the database connection is unavailable.

    - getClientById(id)
        Retrieves a single client by its unique identifier.
        Throws 503 if the database connection is unavailable.

NOTES:
    - All functions use async/await and return Promises.
    - Database availability is checked before each operation using db.connectToDB().
    - Errors are thrown as objects with {status, message} to integrate with controllers.
*/

import { db } from "../db/connection.js";

export const getAllClients = async (limit = null) => {
    if (!db.connectToDB()) {
        throw { status: 503, message: "Database unavailable."}
    }
    return await db.getAllClients(limit);
};

export const getClientById = async (id) => {
    if (!db.connectToDB()) {
        throw { status: 503, message: "Database unavailable."}
    }
    return await db.getClientById(id);
};
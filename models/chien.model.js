/*
FILE          : dog.model.js
AUTHOR        : Niels Delafontaine
DATE CREATED  : 14.11.2025
LAST MODIFIED : 21.11.2025
DESCRIPTION   :
    Data model for dog-related operations.
    Provides database access methods to retrieve dogs or a single dog
    by its ID using the central database connection layer.

REQUIRED LIBRARIES:
    - ../db/connection.js  : Provides the database instance and connection utilities.

EXPORTED FUNCTIONS:
    - getAllDogs(limit)
        Retrieves all dogs from the database.
        Optional 'limit' parameter restricts the number of returned results.

    - getDogById(id)
        Retrieves a single dog by its unique identifier.
        Throws 503 if the database connection is unavailable.

NOTES:
    - All functions use async/await and return Promises.
    - Database availability is checked before each operation using db.connectToDB().
    - Errors are thrown as objects with {status, message} to integrate with controllers.
*/

import { db } from "../db/connection.js";

export const getAllDogs = async (limit = null) => {
    if (!db.connectToDB()) {
        throw { status: 503, message: "Database unavailable."}
    }
    return await db.getAllDogs(limit);
};

export const getDogById = async (id) => {
    if (!db.connectToDB()) {
        throw { status: 503, message: "Database unavailable."}
    }
    return await db.getDogById(id);
};
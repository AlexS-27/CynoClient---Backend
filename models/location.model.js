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
/*
FILE          : service.model.js
AUTHOR        : Alex Kamano
DATE CREATED  : 14.11.2025
LAST MODIFIED : 21.11.2025
DESCRIPTION   :
    Data model for service-related operations.
    Provides database access methods to retrieve services or a single service
    by its ID using the central database connection layer.

REQUIRED LIBRARIES:
    - ../db/connection.js  : Provides the database instance and connection utilities.

EXPORTED FUNCTIONS:
    - getAllServices(limit)
        Retrieves all services from the database.
        Optional 'limit' parameter restricts the number of returned results.

    - getServiceById(id)
        Retrieves a single service by its unique identifier.
        Throws 503 if the database connection is unavailable.

NOTES:
    - All functions use async/await and return Promises.
    - Database availability is checked before each operation using db.connectToDB().
    - Errors are thrown as objects with {status, message} to integrate with controllers.
*/

import { db } from "../db/connection.js";

export const getAllServices = async (limit = null) => {
    if (!db.connectToDB()) {
        throw { status: 503, message: "Database unavailable."}
    }
    return await db.getAllServices(limit);
};

export const getServiceById = async (id) => {
    if (!db.connectToDB()) {
        throw { status: 503, message: "Database unavailable."}
    }
    return await db.getServiceById(id);
};
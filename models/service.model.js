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
import {isValidInteger} from "../utils/helper.mjs";
import { db } from "../db/connection.js";

export const getAllServices = async (filters, limit = null) => {
    if (!db.connectToDB()) {
        throw { status: 503, message: "Database unavailable."}
    }
    return await db.getAllServices(filters, limit);
};

export const getServiceById = async (id) => {
    if (!db.connectToDB()) {
        throw { status: 503, message: "Database unavailable."}
    }
    return await db.getServiceById(id);
};

export const createService = async (serviceData) => {
    const {dog_id, service_date, location_id, duration_minutes} = serviceData;

    // Vérification des champs obligatoires
    if (
        dog_id == null ||
        !service_date ||
        location_id == null ||
        duration_minutes == null
    ) {
        throw {
            status: 400,
            message: "Missing required fields (dog_id, service_date, location_id, duration_minutes)."
        };
    }

    // Vérification du format date/heure
    const dateTimeRegex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;
    if (!dateTimeRegex.test(service_date)) {
        throw {
            status: 400,
            message: "Invalid date format. Please use 'YYYY-MM-DD HH:MM:SS'."
        };
    }

    // Appel à la fonction DB
    return await db.createService(dog_id, service_date, location_id, duration_minutes)
    };

export const updateService = async (id, serviceData) => {
    // Vérification de l'ID
    if (!id || !isValidInteger(id)) {
        throw { status: 400, message: "Invalid service ID for update." };
    }
    // Vérification que l'objet n'est pas vide
    if (Object.keys(serviceData).length === 0) {
        throw { status: 400, message: "No data provided for update." };
    }
    // Validation du format de date si elle est présente
    if (serviceData.service_date) {
        const dateTimeRegex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;
        if (!dateTimeRegex.test(serviceData.service_date)) {
            throw {
                status: 400,
                message: "Invalid date format. Please use 'YYYY-MM-DD HH:MM:SS'."
            };
        }
    }
    // Vérification de la disponibilité DB
    if (!db.connectToDB()) {
        throw { status: 503, message: "Database unavailable." };
    }
    // Appel à la couche DB
    const success = await db.updateService(id, serviceData);

    if (!success) {
        throw { status: 404, message: "Service not found or no changes made." };
    }

    // On retourne le service mis à jour pour le controller
    return await db.getServiceById(id);
};

export const deleteService = async (id) => {
    // Validation of the ID
    if (!id || !isValidInteger(id)) {
        throw { status: 400, message: "Invalid service ID for deletion." };
    }

    // Database availability check
    if (!db.connectToDB()) {
        throw { status: 503, message: "Database unavailable." };
    }

    // Execution
    const success = await db.deleteService(id);

    if (!success) {
        throw { status: 404, message: "Service not found. Nothing to delete." };
    }

    return true;
};
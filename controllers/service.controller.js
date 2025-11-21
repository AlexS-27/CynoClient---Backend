/*
FILE          : service.controller.js
AUTHOR        : Alex Kamano
DATE CREATED  : 14.11.2025
LAST MODIFIED : 21.11.2025
DESCRIPTION   :
    Controller for service-related endpoints in the application.
    Provides functions to fetch all services or a service by its ID.

REQUIRED LIBRARIES:
    - Express.js (for request and response objects)
    - ../models/service.model.js (for database access functions)
    - ../utils/helper.mjs (for validation helpers, e.g., isValidInteger)

EXPORTED FUNCTIONS:
    - fetchAllServices(req, res, next)
        Retrieves all services from the database, with optional limit query parameter.
        Throws 400 if limit is invalid, 404 if no services found.
    - fetchServiceById(req, res, next)
        Retrieves a single service by ID.
        Throws 400 if ID is invalid, 404 if service not found.

NOTES:
    - All functions use async/await and forward errors to Express error handler via next().
    - Input validation is handled using isValidInteger from helper.mjs.
*/

import { getAllServices, getServiceById } from "../models/service.model.js";
import { isValidInteger } from "../utils/helper.mjs"

export const fetchAllServices = async (req, res, next) => {
    try {
        const limit = req.query.limit ? parseInt(req.query.limit, 10) : null;
        if (limit !== null && (!isValidInteger(limit) || limit <= 0)) {
            throw {status: 400, message: 'Limit must be a positive number.'};
        }
        const services = await getAllServices(limit);
        if (!services || services.length === 0) {
            throw {status: 404, message: 'No services found.'};
        }
        res.status(200).json(services);
    } catch (error) {
        next(error);
    }
};

export const fetchServiceById = async (req, res, next) => {
    try {
        const {id} = req.params;
        if (!isValidInteger(id)) {
            throw {status: 400, message: "Invalid id"};
        }
        const service = await getServiceById(id);

        if (!service) {
            throw {status: 404, message: "Service not found"};
        }

        res.status(200).json(service);
    } catch (error) {
        next(error);
    }
};
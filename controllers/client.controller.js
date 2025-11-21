/*
FILE          : client.controller.js
AUTHOR        : Kilian Testard
DATE CREATED  : 14.11.2025
LAST MODIFIED : 21.11.2025
DESCRIPTION   :
    Controller for client-related endpoints in the application.
    Provides functions to fetch all clients or a client by its ID.

REQUIRED LIBRARIES:
    - Express.js (for request and response objects)
    - ../models/client.model.js (for database access functions)
    - ../utils/helper.mjs (for validation helpers, e.g., isValidInteger)

EXPORTED FUNCTIONS:
    - fetchAllClients(req, res, next)
        Retrieves all clients from the database, with optional limit query parameter.
        Throws 400 if limit is invalid, 404 if no services found.
    - fetchClientById(req, res, next)
        Retrieves a single client by ID.
        Throws 400 if ID is invalid, 404 if service not found.

NOTES:
    - All functions use async/await and forward errors to Express error handler via next().
    - Input validation is handled using isValidInteger from helper.mjs.
*/

import { getAllClients, getClientById } from "../models/client.model.js";
import { isValidInteger } from "../utils/helper.mjs"

export const fetchAllClients = async (req, res, next) => {
    try {
        const limit = req.query.limit ? parseInt(req.query.limit, 10) : null;
        if (limit !== null && (!isValidInteger(limit) || limit <= 0)) {
            throw {status: 400, message: 'Limit must be a positive number.'};
        }
        const clients = await getAllClients(limit);
        if (!clients || clients.length === 0) {
            throw {status: 404, message: 'No clients found.'};
        }
        res.status(200).json(clients);
    } catch (error) {
        next(error);
    }
};

export const fetchClientById = async (req, res, next) => {
    try {
        const {id} = req.params;
        if (!isValidInteger(id)) {
            throw {status: 400, message: "Invalid id"};
        }
        const client = await getClientById(id);

        if (!client) {
            throw {status: 404, message: "Client not found"};
        }

        res.status(200).json(client);
    } catch (error) {
        next(error);
    }
};
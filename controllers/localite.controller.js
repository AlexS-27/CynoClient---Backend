/*
FILE          : location.controller.js
AUTHOR        : Alexandre Ramirez
DATE CREATED  : 14.11.2025
LAST MODIFIED : 21.11.2025
DESCRIPTION   :
    Controller for location-related endpoints in the application.
    Provides functions to fetch all locations or a location by its ID.

REQUIRED LIBRARIES:
    - Express.js (for request and response objects)
    - ../models/location.model.js (for database access functions)
    - ../utils/helper.mjs (for validation helpers, e.g., isValidInteger)

EXPORTED FUNCTIONS:
    - fetchAllLocations(req, res, next)
        Retrieves all locations from the database, with optional limit query parameter.
        Throws 400 if limit is invalid, 404 if no locations found.
    - fetchLocationById(req, res, next)
        Retrieves a single location by ID.
        Throws 400 if ID is invalid, 404 if location not found.

NOTES:
    - All functions use async/await and forward errors to Express error handler via next().
    - Input validation is handled using isValidInteger from helper.mjs.
*/

import { getAllLocations, getLocationById } from "../models/localite.model.js";
import { isValidInteger } from "../utils/helper.mjs"

export const fetchAllLocations = async (req, res, next) => {
    try {
        const limit = req.query.limit ? parseInt(req.query.limit, 10) : null;
        if (limit !== null && (!isValidInteger(limit) || limit <= 0)) {
            throw {status: 400, message: 'Limit must be a positive number.'};
        }
        const locations = await getAllLocations(limit);
        if (!locations || locations.length === 0) {
            throw {status: 404, message: 'No locations found.'};
        }
        res.status(200).json(locations);
    } catch (error) {
        next(error);
    }
};

export const fetchLocationById = async (req, res, next) => {
    try {
        const {id} = req.params;
        if (!isValidInteger(id)) {
            throw {status: 400, message: "Invalid id"};
        }
        const location = await getLocationById(id);

        if (!location) {
            throw {status: 404, message: "Location not found"};
        }

        res.status(200).json(location);
    } catch (error) {
        next(error);
    }
};
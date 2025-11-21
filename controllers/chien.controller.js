/*
FILE          : dog.controller.js
AUTHOR        : Niels Delafontaine
DATE CREATED  : 14.11.2025
LAST MODIFIED : 21.11.2025
DESCRIPTION   :
    Controller for dog-related endpoints in the application.
    Provides functions to fetch all dogs or a dog by its ID.

REQUIRED LIBRARIES:
    - Express.js (for request and response objects)
    - ../models/dog.model.js (for database access functions)
    - ../utils/helper.mjs (for validation helpers, e.g., isValidInteger)

EXPORTED FUNCTIONS:
    - fetchAllDogs(req, res, next)
        Retrieves all dogs from the database, with optional limit query parameter.
        Throws 400 if limit is invalid, 404 if no dogs found.
    - fetchDogById(req, res, next)
        Retrieves a single dog by ID.
        Throws 400 if ID is invalid, 404 if dog not found.

NOTES:
    - All functions use async/await and forward errors to Express error handler via next().
    - Input validation is handled using isValidInteger from helper.mjs.
*/

import { getAllDogs, getDogById } from "../models/chien.model.js";
import { isValidInteger } from "../utils/helper.mjs"

export const fetchAllDogs = async (req, res, next) => {
    try {
        const limit = req.query.limit ? parseInt(req.query.limit, 10) : null;
        if (limit !== null && (!isValidInteger(limit) || limit <= 0)) {
            throw {status: 400, message: 'Limit must be a positive number.'};
        }
        const dogs = await getAllDogs(limit);
        if (!dogs || dogs.length === 0) {
            throw {status: 404, message: 'No dogs found.'};
        }
        res.status(200).json(dogs);
    } catch (error) {
        next(error);
    }
};

export const fetchDogById = async (req, res, next) => {
    try {
        const {id} = req.params;
        if (!isValidInteger(id)) {
            throw {status: 400, message: "Invalid id"};
        }
        const dog = await getDogById(id);

        if (!dog) {
            throw {status: 404, message: "Dog not found"};
        }

        res.status(200).json(dog);
    } catch (error) {
        next(error);
    }
};
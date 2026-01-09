/*
FILE          : dog.controller.js
AUTHOR        : Niels Delafontaine
DATE CREATED  : 14.11.2025
LAST MODIFIED : 12.12.2025
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

import { getAllDogs, getDogById, insertDog, deleteDog, updateDog } from "../models/dog.model.js";
import { isValidInteger } from "../utils/helper.mjs"
import {createServer} from "mysql2";

export const fetchAllDogs = async (req, res, next) => {
    try {
        const { name, sex, client_id } = req.query;

        let limit = req.query.limit ? parseInt(req.query.limit, 10) : null;

        if (limit !== null && (!isValidInteger(limit) || limit <= 0)) {
            throw {status: 400, message: 'Limit must be a positive number.'};
        }

        const filters = {name, sex, client_id};
        const dogs = await getAllDogs(filters, limit);

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

export const postDog = async (req, res, next) => {
    try {
        const {name, sex, cross_breed, birthdate} = req.body;
        let {sterilized, deceased, client_id, breed_id} = req.body;

        //Validation
        if (!name || !sex || !birthdate || cross_breed === undefined || cross_breed === null) {
            throw {status: 400, message: 'Please fill in all required fields.'}
        }

        // Convert boolean fields to 0 or 1, or NULL; if not specified in body, they'll be undefined. Written by AI
        sterilized = sterilized ? 1 : 0; // if undefined, become 0
        deceased = deceased ? 1 : 0;       // if undefined, become 0

        // Convert optional ID fields (client_id, breed_id) to NULL if not specified
        client_id = client_id || null;
        breed_id = breed_id || null;

        const dogData = {
            name: name,
            sex: sex,
            cross_breed: cross_breed ? 1 : 0,
            birthdate: birthdate,
            sterilized: sterilized,
            deceased: deceased,
            client_id: client_id,
            breed_id: breed_id,
        }

        const newDogId = await insertDog(dogData);

        res.status(201).json({id: newDogId, ...dogData, message:'Dog successfully created.'});
    } catch (error) {
        next(error);
    }
};

export const modifyDog = async (req, res, next) => {
    try {
        const { id } = req.params;
        const dogData = req.body;

        if (!isValidInteger(id)) {
            throw {status: 400, message: "Invalid id"};
        }

        // validation
        if (!dogData.name && !dogData.sex && !dogData.birthdate && !dogData.cross_breed && !dogData.cross_breed) {
            throw {status: 400, message: 'Please provide at least one field to update.'}
        }

        const affectedRows = await updateDog(id, dogData);
        if (affectedRows === 0) {
            throw {status: 404, message: 'Dog not found or no changes made.'};
        }

        res.status(200).json({ id, ...dogData, message: 'Dog successfully updated.' });
    } catch (err) {
        next(err);
    }
};

export const terminateDog = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!isValidInteger(id)) {
            throw {status: 400, message: "Invalid id"};
        }

        const affectedRows = await deleteDog(id);
        if (affectedRows === 0) {
            throw {status: 404, message: 'Dog not found.'};
        }

        res.status(200).json({ message: `dog with id ${id} successfully deleted.` });
    } catch (err) {
        next(err);
    }
}

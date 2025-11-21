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
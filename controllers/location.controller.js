import { getAllLocations, getLocationById } from "../models/location.model.js";
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
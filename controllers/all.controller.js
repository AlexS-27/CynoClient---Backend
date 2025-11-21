import { isValidInteger } from "../utils/helper.mjs";
import { getAllClients, getClientById } from "../models/client.model.js";
import { getAllDogs, getDogById } from "../models/dog.model.js";
import { getAllLocations, getLocationById } from "../models/location.model.js";
import { getAllServices, getServiceById } from "../models/service.model.js";

/**
 * GET /all
 * Query params:
 *   - limit (optional) : number > 0 -> Limitation for numbers of elements by table
 */
export const fetchAllResources = async (req, res, next) => {
    try {
        const limitParam = req.query.limit;
        const limit = limitParam ? parseInt(limitParam, 10) : null;

        if (limit !== null && (!isValidInteger(limit) || limit <= 0)) {
            throw { status: 400, message: "Limit must be a positive integer." };
        }
        const [clients, chiens, locations, services] = await Promise.all([
            getAllClients(),
            getAllDogs(),
            getAllLocations(),
            getAllServices(),
        ]);

        // If limit is given, we check if the database is not empty --Help of ChatGPT for this
        const truncate = (arr) => Array.isArray(arr) && limit ? arr.slice(0, limit) : arr;

        const clientsRes = truncate(clients);
        const chiensRes = truncate(chiens);
        const locationsRes = truncate(locations);
        const servicesRes = truncate(services);

        const isEmpty = (v) => v == null || (Array.isArray(v) && v.length === 0);

        if (isEmpty(clientsRes) && isEmpty(chiensRes) && isEmpty(locationsRes) && isEmpty(servicesRes)) {
            throw { status: 404, message: "Nothing found." };
        }

        res.status(200).json({
            clients: clientsRes,
            chiens: chiensRes,
            locations: locationsRes,
            services: servicesRes,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * GET /all/:id
 * Return the contents or null for each table with this id.
 */
export const fetchResourcesById = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!isValidInteger(id)) {
            throw { status: 400, message: "Invalid id." };
        }

        const numericId = Number(id);

        const [client, chien, localite, service] = await Promise.all([
            getClientById(numericId),
            getDogById(numericId),
            getLocationById(numericId),
            getServiceById(numericId),
        ]);

        if (!client && !chien && !localite && !service) {
            throw { status: 404, message: "Nothing found for this id." };
        }

        res.status(200).json({ client, chien, localite, service });
    } catch (error) {
        next(error);
    }
};

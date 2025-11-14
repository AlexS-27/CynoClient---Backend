import { getAllClients, getClientById } from "../models/client.model.js";
import IsValidId from "../utils/helper.mjs"
import IsValidLimit from "../utils/helper.mjs"

export const fetchAllClients = async (req, res, next) => {
    try {
        const limit = req.query.limit ? parseInt(req.query.limit, 10) : null;
        if (limit !== null && (!isValidLimit(limit) || limit <= 0)) {
            throw {status: 400, message: 'Limit must be a positive number.'};
        }
        const clients = await getAllClients(limit);
        if (!clients || !clients.length === 0) {
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
        if (!isValidId(id)) {
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
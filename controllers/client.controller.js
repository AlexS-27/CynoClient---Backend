import { getAllClients, getClientById } from "../models/client.model.js";
import IsValidId from "../utils/helper.mjs"

export const fetchAllClients = async (req, res, next) => {
    try {
        const limit = req.query.limit ? parseInt(req.query.limit, 10) : null;
        const clients = await getAllClients(limit);

        res.status(200).json(clients);
    } catch (error) {
        console.error("Error fetching clients:", error);
        res.status(500).json({
            status: 500,
            error: "Internal Server Error",
            message: "Failed to retrieve clients.",
        });
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
            throw {status: 400, message: "Client not found"};
        }

        res.status(200).json(client);
    } catch (error) {
        next(error);
    }
};
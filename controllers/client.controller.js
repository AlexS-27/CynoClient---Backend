import { getAllClients, getClientById } from "../models/client.model.js";

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
        const { id } = req.params;
        const client = await getClientById(id);

        if (!client) {
            return res.status(404).json({
                status: 404,
                error: "Not Found",
                message: `Client with id ${id} not found.`,
            });
        }

        res.status(200).json(client);
    } catch (error) {
        console.error("Error fetching client by ID:", error);
        res.status(500).json({
            status: 500,
            error: "Internal Server Error",
            message: "Failed to retrieve client.",
        });
    }
};
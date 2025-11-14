import { getAllServices, getServiceById } from "../models/services.model.js";

export const fetchAllServices = async (req, res, next) => {
    try {
        const limit = req.query.limit ? parseInt(req.query.limit, 10) : null;
        const service = await getAllServices(limit);

        res.status(200).json(service);
    } catch (error) {
        console.error("Error fetching services:", error);
        res.status(500).json({
            status: 500,
            error: "Internal Server Error",
            message: "Failed to retrieve services.",
        });
    }
};

export const fetchServicesById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const service = await getServiceById(id);

        if (!service) {
            return res.status(404).json({
                status: 404,
                error: "Not Found",
                message: `Service with id ${id} not found.`,
            });
        }

        res.status(200).json(service);
    } catch (error) {
        console.error("Error fetching service by ID:", error);
        res.status(500).json({
            status: 500,
            error: "Internal Server Error",
            message: "Failed to retrieve service.",
        });
    }
};
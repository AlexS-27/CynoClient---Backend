import { getAllServices, getServiceById } from "../models/service.model.js";
import { isValidInteger } from "../utils/helper.mjs"

export const fetchAllServices = async (req, res, next) => {
    try {
        const limit = req.query.limit ? parseInt(req.query.limit, 10) : null;
        if (limit !== null && (!isValidInteger(limit) || limit <= 0)) {
            throw {status: 400, message: 'Limit must be a positive number.'};
        }
        const services = await getAllServices(limit);
        if (!services || services.length === 0) {
            throw {status: 404, message: 'No services found.'};
        }
        res.status(200).json(services);
    } catch (error) {
        next(error);
    }
};

export const fetchServiceById = async (req, res, next) => {
    try {
        const {id} = req.params;
        if (!isValidInteger(id)) {
            throw {status: 400, message: "Invalid id"};
        }
        const service = await getServiceById(id);

        if (!service) {
            throw {status: 404, message: "Service not found"};
        }

        res.status(200).json(service);
    } catch (error) {
        next(error);
    }
};
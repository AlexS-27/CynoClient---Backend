import { db } from "../db/connection.js";

export const getAllServices = async (limit = null) => {
    return await db.getAllServices(limit);
};

export const getServiceById = async (id) => {
    return await db.getServiceById(id);
};
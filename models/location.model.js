import { db } from "../db/connection.js";

export const getAllLocations = async (limit = null) => {
    return await db.getAllLocations(limit);
};

export const getLocationById = async (id) => {
    return await db.getLocationById(id);
};
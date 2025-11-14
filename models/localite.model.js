import { db } from "../db/connection.js";

export const getAllLocations = async (limit = null) => {
    if (!db.connectToDB()) {
        throw { status: 503, message: "Database unavailable."}
    }
    return await db.getAllLocations(limit);
};

export const getLocationById = async (id) => {
    if (!db.connectToDB()) {
        throw { status: 503, message: "Database unavailable."}
    }
    return await db.getLocationById(id);
};
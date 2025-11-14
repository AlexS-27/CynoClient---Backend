import { db } from "../db/connection.js";

export const getAllServices = async (limit = null) => {
    if (!db.connectToDB()) {
        throw { status: 503, message: "Database unavailable."}
    }
    return await db.getAllServices(limit);
};

export const getServiceById = async (id) => {
    if (!db.connectToDB()) {
        throw { status: 503, message: "Database unavailable."}
    }
    return await db.getServiceById(id);
};
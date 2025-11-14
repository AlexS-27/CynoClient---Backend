import { db } from "../db/connection.js";

export const getAllClients = async (limit = null) => {
    if (!db.isConnected()) {
        throw { status: 503, message: "Database unavailable."}
    }
    return await db.getAllClients(limit);
};

export const getClientById = async (id) => {
    if (!db.isConnected()) {
        throw { status: 503, message: "Database unavailable."}
    }
    return await db.getClientById(id);
};
import { db } from "../db/connection.js";

export const getAllClients = async (limit = null) => {
    return await db.getAllClients(limit);
};

export const getClientById = async (id) => {
    return await db.getClientById(id);
};
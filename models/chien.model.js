import { db } from "../db/connection.js";

export const getAllDogs = async (limit = null) => {
    if (!db.connectToDB()) {
        throw { status: 503, message: "Database unavailable."}
    }
    return await db.getAllDogs(limit);
};

export const getDogById = async (id) => {
    if (!db.connectToDB()) {
        throw { status: 503, message: "Database unavailable."}
    }
    return await db.getDogById(id);
};
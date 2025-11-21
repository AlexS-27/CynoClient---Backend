import { db } from "../db/connection.js";

export const getAllDogs = async (limit = null) => {
    return await db.getAllDogs(limit);
};

export const getDogById = async (id) => {
    return await db.getDogById(id);
};
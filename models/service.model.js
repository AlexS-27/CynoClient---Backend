import { db } from "../db/connection.js";

export const getAllServices = async (limit = null) => {
<<<<<<< HEAD
=======
    if (!db.connectToDB()) {
        throw { status: 503, message: "Database unavailable."}
    }
>>>>>>> cde399af1fe20ed64d48d525496e91aa74d11777
    return await db.getAllServices(limit);
};

export const getServiceById = async (id) => {
<<<<<<< HEAD
=======
    if (!db.connectToDB()) {
        throw { status: 503, message: "Database unavailable."}
    }
>>>>>>> cde399af1fe20ed64d48d525496e91aa74d11777
    return await db.getServiceById(id);
};
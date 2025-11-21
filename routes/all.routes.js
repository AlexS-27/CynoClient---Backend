import express from "express";
import { isValidInteger } from "../utils/helper.mjs";

// Fonctions qui parlent à la DB directement
import { getAllClients, getClientById } from "../models/client.model.js";
import { getAllDogs, getDogById } from "../models/dog.model.js";
import { getAllLocations, getLocationById } from "../models/location.model.js";
import { getAllServices, getServiceById } from "../models/service.model.js";

const router = express.Router();

// GET /all → tout d'un coup
router.get("/", async (req, res, next) => {
    try {
        const [clients, chiens, localites, services] = await Promise.all([
            getAllClients(),
            getAllDogs(),
            getAllLocations(),
            getAllServices(),
        ]);

        res.json({ clients, chiens, localites, services });
    } catch (err) {
        next(err);
    }
});

// GET /all/:id → tout ce qui a cet id dans CHAQUE table
router.get("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!isValidInteger(id)) {
            return res.status(400).json({ message: "Invalid id" });
        }

        const numericId = Number(id);

        const [client, chien, localite, service] = await Promise.all([
            getClientById(numericId),      // SELECT * FROM client WHERE id = ?
            getDogById(numericId),         // SELECT * FROM chien WHERE id = ?
            getLocationById(numericId),    // SELECT * FROM localite WHERE id = ?
            getServiceById(numericId),     // SELECT * FROM service WHERE id = ?
        ]);

        // Si tu veux retourner même si tout est vide :
        // res.json({ client, chien, localite, service });

        // Si tu veux 404 quand rien n'est trouvé :
        if (!client && !chien && !localite && !service) {
            return res.status(404).json({ message: "Nothing found for this id" });
        }

        res.json({ client, chien, localite, service });
    } catch (err) {
        next(err);
    }
});

export default router;

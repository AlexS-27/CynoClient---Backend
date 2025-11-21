/*
FILE          : all.routes.js
AUTHOR        : Niels Delafontaine, Kilian Testard
DATE CREATED  : 14.11.2025
LAST MODIFIED : 21.11.2025
DESCRIPTION   :
    Routing layer providing consolidated endpoints that fetch data across
    multiple tables: clients, dogs, locations, and services.
    This file exposes routes to retrieve:
        - all records from each table at once
        - all records matching a specific ID from each table

REQUIRED LIBRARIES:
    - express : For creating the router and handling HTTP routing.
    - ../utils/helper.mjs
        > isValidInteger
    - ../models/client.model.js
        > getAllClients
        > getClientById
    - ../models/chien.model.js
        > getAllDogs
        > getDogById
    - ../models/localite.model.js
        > getAllLocations
        > getLocationById
    - ../models/service.model.js
        > getAllServices
        > getServiceById

EXPORTED FUNCTIONS:
    - router (default)
        Provides routes:
            GET "/"
                Fetches ALL data from ALL tables simultaneously.
                Returns: { clients, dogs, locations, services }

            GET "/:id"
                Fetches matching records from EACH table based on the given ID.
                Returns empty values (null) for tables without a match.
                Returns 404 if no table contains a record for the ID.

NOTES:
    - All routes use async/await and forward errors using next().
    - Validation of ID format is handled by isValidInteger().
    - This file centralizes cross-table fetching but contains no business logic.
*/


import express from "express";
import { isValidInteger } from "../utils/helper.mjs";

// Fonctions qui parlent à la DB directement
import { getAllClients, getClientById } from "../models/client.model.js";
import { getAllDogs, getDogById } from "../models/chien.model.js";
import { getAllLocations, getLocationById } from "../models/localite.model.js";
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

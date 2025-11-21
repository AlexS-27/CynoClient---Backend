/*
FILE          : client.routes.js
AUTHOR        : Kilian Testard
DATE CREATED  : 14.11.2025
LAST MODIFIED : 21.11.2025
DESCRIPTION   :
    Defines the routing layer for client-related API endpoints.
    Connects HTTP routes to the corresponding controller functions.

REQUIRED LIBRARIES:
    - express: For creating the router and handling HTTP routing.
    - ../controllers/client.controller.js
        > fetchAllClients
        > fetchClientById

EXPORTED FUNCTIONS:
    - router (default)
        Provides routes:
            GET "/"      → fetchAllClients
                Fetch all clients, with optional limit query.
            GET "/:id"   → fetchClientById
                Fetch a single client by its ID.

NOTES:
    - All routes rely on controller-level validation and error handling.
    - This file only defines routes; no business logic is implemented here.
*/

import express from "express";
import { fetchAllClients, fetchClientById } from "../controllers/client.controller.js";

const router = express.Router();


router.get("/", fetchAllClients);


router.get("/:id", fetchClientById);

export default router;
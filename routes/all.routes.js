/*
FILE          : all.routes.js
AUTHOR        : Niels Delafontaine, Kilian Testard
DATE CREATED  : 14.11.2025
LAST MODIFIED : 21.11.2025
DESCRIPTION   :
    Defines the routing layer for all API endpoints.
    Connects HTTP routes to the corresponding controller functions.

REQUIRED LIBRARIES:
     - express: For creating the router and handling HTTP routing.
     - ../controllers/all.controller.js
        > fetchAllResources
        > fetchResourcesById

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
import {
    fetchAllResources,
    fetchResourcesById
} from "../controllers/all.controller.js";

const router = express.Router();

router.get("/", fetchAllResources);

router.get("/:id", fetchResourcesById);

export default router;

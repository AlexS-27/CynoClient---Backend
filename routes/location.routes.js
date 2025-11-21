/*
FILE          : location.routes.js
AUTHOR        : Alexandre Ramirez
DATE CREATED  : 14.11.2025
LAST MODIFIED : 21.11.2025
DESCRIPTION   :
    Defines the routing layer for location-related API endpoints.
    Connects HTTP routes to the corresponding controller functions.

REQUIRED LIBRARIES:
    - express: For creating the router and handling HTTP routing.
    - ../controllers/location.controller.js
        > fetchAllLocations
        > fetchLocationById

EXPORTED FUNCTIONS:
    - router (default)
        Provides routes:
            GET "/"      → fetchAllLocations
                Fetch all locations, with optional limit query.
            GET "/:id"   → fetchLocationById
                Fetch a single location by its ID.

NOTES:
    - All routes rely on controller-level validation and error handling.
    - This file only defines routes; no business logic is implemented here.
*/

import express from "express";
import { fetchAllLocations, fetchLocationById } from "../controllers/location.controller.js";

const router = express.Router();


router.get("/", fetchAllLocations);


router.get("/:id", fetchLocationById);

export default router;
/*
FILE          : dog.routes.js
AUTHOR        : Niels Delafontaine
DATE CREATED  : 14.11.2025
LAST MODIFIED : 21.11.2025
DESCRIPTION   :
    Defines the routing layer for dog-related API endpoints.
    Connects HTTP routes to the corresponding controller functions.

REQUIRED LIBRARIES:
    - express: For creating the router and handling HTTP routing.
    - ../controllers/dog.controller.js
        > fetchAllDogs
        > fetchDogById

EXPORTED FUNCTIONS:
    - router (default)
        Provides routes:
            GET "/"      → fetchAllDogs
                Fetch all dogs, with optional limit query.
            GET "/:id"   → fetchDogById
                Fetch a single dog by its ID.

NOTES:
    - All routes rely on controller-level validation and error handling.
    - This file only defines routes; no business logic is implemented here.
*/

import express from "express";
import { fetchAllDogs, fetchDogById } from "../controllers/dog.controller.js";

const router = express.Router();


router.get("/", fetchAllDogs);


router.get("/:id", fetchDogById);

export default router;
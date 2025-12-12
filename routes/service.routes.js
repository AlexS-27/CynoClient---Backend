/*
FILE          : service.routes.js
AUTHOR        : Alex Kamano
DATE CREATED  : 14.11.2025
LAST MODIFIED : 21.11.2025
DESCRIPTION   :
    Defines the routing layer for service-related API endpoints.
    Connects HTTP routes to the corresponding controller functions.

REQUIRED LIBRARIES:
    - express: For creating the router and handling HTTP routing.
    - ../controllers/service.controller.js
        > fetchAllServices
        > fetchServiceById

EXPORTED FUNCTIONS:
    - router (default)
        Provides routes:
            GET "/"      → fetchAllServices
                Fetch all services, with optional limit query.
            GET "/:id"   → fetchServiceById
                Fetch a single service by its ID.

NOTES:
    - All routes rely on controller-level validation and error handling.
    - This file only defines routes; no business logic is implemented here.
*/


import express from "express";
import { fetchAllServices, fetchServiceById } from "../controllers/service.controller.js";

const router = express.Router();


router.get("/", fetchAllServices);


router.get("/:id", fetchServiceById);

export default router;
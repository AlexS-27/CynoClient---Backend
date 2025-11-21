/*
FILE          : app.js
AUTHOR        : Kilian Testard
DATE CREATED  : 14.11.2025
LAST MODIFIED : 21.11.2025
DESCRIPTION   :
    Main application entry point.
    Initializes the Express server, registers all route modules,
    enables JSON parsing, and configures the global error handler.

REQUIRED LIBRARIES:
    - express : Web framework used to create the HTTP server.
    - ./routes/client.routes.js     : Routes for client resources.
    - ./routes/dog.routes.js      : Routes for dog resources.
    - ./routes/location.routes.js   : Routes for location resources.
    - ./routes/service.routes.js    : Routes for service resources.
    - ./routes/all.routes.js        : Aggregated multi-table routes.

ROUTING:
    - /clients   → client.routes
    - /dogs      → dog.routes
    - /locations → localite.routes
    - /services  → service.routes
    - /all       → all.routes

GLOBAL ERROR HANDLER:
    - Logs all unexpected or forwarded errors.
    - Returns structured JSON responses with:
        { status, error, message }
    - Handles common errors: 400, 404, 500, 503.

SERVER:
    - Starts an HTTP server on port 3000.
    - Logs the public URL on startup.

NOTES:
    - All routes are expected to throw objects shaped like:
        { status: Number, message: String }
    - JSON parsing middleware enabled globally.
*/


import "dotenv/config";
import express from "express";
import clientRoutes from "./routes/client.routes.js";
import dogRoutes from "./routes/dog.routes.js";
import locationRoutes from "./routes/location.routes.js";
import serviceRoutes from "./routes/service.routes.js";
import allRoutes from "./routes/all.routes.js";

const app = express();
app.use(express.json());

// routes
app.use("/clients", clientRoutes);
app.use("/dogs", dogRoutes);
app.use("/locations", locationRoutes);
app.use("/services", serviceRoutes);
app.use("/all", allRoutes);

// global error manager (with ChatGPT's assistance)
app.use((err, req, res, next) => {
    console.error("Unhandled error:", err);
    const status = err.status || 500;
    const errorMessages = {
        400: 'Bad Request',
        404: 'Not Found',
        500: 'Internal Server Error',
        503: 'Service Unavailable'
    };
    res.status(status).json({
        status,
        error: errorMessages[status] || 'Error',
        message:err.message || 'An unexpected error occurred.'
    });
});

// start the server
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
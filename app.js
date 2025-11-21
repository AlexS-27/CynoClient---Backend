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

// global error manager (with ChatGPT's help)
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
import express from "express";
import clientRoutes from "./routes/client.routes.js";

const app = express();
app.use(express.json());

// Enregistre les routes
app.use("/clients", clientRoutes);

// Middleware d’erreur global
app.use((err, req, res, next) => {
    console.error("Unhandled error:", err);
    res.status(500).json({
        status: 500,
        error: "Internal Server Error",
        message: err.message,
    });
});

// Démarrage du serveur
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
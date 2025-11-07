import express from "express";
import { fetchAllClients, fetchClientById } from "../controllers/client.controller.js";

const router = express.Router();


router.get("/", fetchAllClients);


router.get("/:id", fetchClientById);

export default router;
import express from "express";
import { fetchAllServices, fetchServicesById } from "/controllers/service.controller.js";

const router = express.Router();

router.get("/", fetchAllServices);

router.get("/:id", fetchServicesById);

export default router;
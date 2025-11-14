import express from "express";
import { fetchAllServices, fetchServiceById } from "../controllers/service.controller.js";

const router = express.Router();


router.get("/", fetchAllServices);


router.get("/:id", fetchServiceById);

export default router;
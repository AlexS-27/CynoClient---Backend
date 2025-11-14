import express from "express";
import { fetchAllLocations, fetchLocationById } from "../controllers/localite.controller.js";

const router = express.Router();


router.get("/", fetchAllLocations);


router.get("/:id", fetchLocationById);

export default router;
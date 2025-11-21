import express from "express";
import { fetchAllDogs, fetchDogById } from "../controllers/chien.controller.js";

const router = express.Router();


router.get("/", fetchAllDogs);


router.get("/:id", fetchDogById);

export default router;
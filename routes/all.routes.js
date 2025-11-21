import express from "express";
import {
    fetchAllResources,
    fetchResourcesById
} from "../controllers/all.controller.js";

const router = express.Router();

router.get("/", fetchAllResources);

router.get("/:id", fetchResourcesById);

export default router;

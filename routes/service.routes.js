import express from "express";
<<<<<<< HEAD
import { fetchAllServices, fetchServicesById } from "/controllers/service.controller.js";

const router = express.Router();

router.get("/", fetchAllServices);

router.get("/:id", fetchServicesById);
=======
import { fetchAllServices, fetchServiceById } from "../controllers/service.controller.js";

const router = express.Router();


router.get("/", fetchAllServices);


router.get("/:id", fetchServiceById);
>>>>>>> cde399af1fe20ed64d48d525496e91aa74d11777

export default router;
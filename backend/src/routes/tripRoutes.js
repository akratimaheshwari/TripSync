import express from "express";
import {
  createTrip,
  joinTrip,
  getTrip,
  getMyTrips,
  deleteTrip
} from "../controllers/tripController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create", authMiddleware, createTrip);
router.post("/join", authMiddleware, joinTrip);
router.get("/:id", authMiddleware, getTrip);
router.get("/",authMiddleware, getMyTrips)
router.delete("/:id", authMiddleware, deleteTrip);
export default router;

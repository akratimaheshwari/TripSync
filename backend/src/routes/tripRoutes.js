import express from "express";
import {
  createTrip,
  joinTrip,
  getTrip
} from "../controllers/tripController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create", authMiddleware, createTrip);
router.post("/join", authMiddleware, joinTrip);
router.get("/:id", authMiddleware, getTrip);

export default router;

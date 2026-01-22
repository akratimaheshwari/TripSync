import express from "express";
import {
  addExpense,
  getExpenses,
  getBalances
} from "../controllers/expenseController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/add", authMiddleware, addExpense);
router.get("/:tripId", authMiddleware, getExpenses);
router.get("/balances/:tripId", authMiddleware, getBalances);

export default router;

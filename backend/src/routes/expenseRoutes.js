import express from "express";
import {
  addExpense,
  getExpenses,
  getBalances,
  settleDebts
} from "../controllers/expenseController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/add", authMiddleware, addExpense);
router.get("/:tripId", authMiddleware, getExpenses);
router.get("/balances/:tripId", authMiddleware, getBalances);
router.get("/settle/:tripId", authMiddleware, settleDebts);

export default router;

import Expense from "../models/Expense.js";

// ADD EXPENSE
export const addExpense = async (req, res) => {
  const { tripId, title, amount, split, currency } = req.body;

  try {
    // Validate split sum
    const totalSplit = Object.values(split).reduce(
      (sum, val) => sum + val,
      0
    );

    if (totalSplit !== amount) {
      return res.status(400).json({
        message: "Split amount must equal total expense"
      });
    }

    const expense = await Expense.create({
      tripId,
      title,
      amount,
      split,
      currency,
      paidBy: req.user
    });

    // Emit real-time update
    req.io.to(tripId).emit("expenseAdded", expense);

    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET EXPENSES FOR A TRIP
export const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({
      tripId: req.params.tripId
    });

    res.json(expenses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// CALCULATE BALANCES
export const getBalances = async (req, res) => {
  try {
    const expenses = await Expense.find({
      tripId: req.params.tripId
    });

    const balances = {};

    expenses.forEach((expense) => {
      const paidBy = expense.paidBy.toString();

      // Paid by user → gets credit
      balances[paidBy] = (balances[paidBy] || 0) + expense.amount;

      // Split among users → debit
      expense.split.forEach((value, userId) => {
        balances[userId] = (balances[userId] || 0) - value;
      });
    });

    res.json(balances);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

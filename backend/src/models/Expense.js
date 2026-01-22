import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema(
  {
    tripId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trip",
      required: true
    },

    title: {
      type: String,
      required: true
    },

    amount: {
      type: Number,
      required: true
    },

    paidBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    // Example:
    // split: { userId1: 500, userId2: 300 }
    split: {
      type: Map,
      of: Number,
      required: true
    },

    currency: {
      type: String,
      default: "INR"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Expense", expenseSchema);

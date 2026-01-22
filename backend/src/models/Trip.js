import mongoose from "mongoose";

const tripSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    destination: {
      type: String,
      required: true
    },
    startDate: Date,
    endDate: Date,
    coverImage: String,

    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ],

    joinCode: {
      type: String,
      unique: true
    },

    currency: {
      type: String,
      default: "INR"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Trip", tripSchema);

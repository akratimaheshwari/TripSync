import mongoose from "mongoose";

const documentSchema = new mongoose.Schema(
  {
    tripId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trip",
      required: true
    },

    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    title: {
      type: String,
      required: true
    },

    fileUrl: {
      type: String,
      required: true
    },

    fileType: String, // pdf, image

    day: Number // optional: link to itinerary day
  },
  { timestamps: true }
);

export default mongoose.model("Document", documentSchema);

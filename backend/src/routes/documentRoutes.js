import express from "express";
import upload from "../config/multer.js";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  uploadDocument,
  getDocuments
} from "../controllers/documentController.js";

const router = express.Router();

router.post(
  "/upload",
  authMiddleware,
  (req, res, next) => {
    upload.single("file")(req, res, function (err) {
      if (err) {
        console.error("MULTER ERROR:", err);
        return res.status(400).json({
          message: "File upload failed",
          error: err.message || err
        });
      }
      next();
    });
  },
  uploadDocument
);


router.get("/:tripId", authMiddleware, getDocuments);

export default router;

import Document from "../models/Document.js";

export const uploadDocument = async (req, res) => {
  try {
    const { tripId, title, day } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "File is required" });
    }

    const document = await Document.create({
      tripId,
      title,
      day,
      uploadedBy: req.user,
      fileUrl: req.file.path,
      fileType: req.file.mimetype
    });

    res.status(201).json(document);
  } catch (error) {
    console.error("UPLOAD CONTROLLER ERROR:", error);
    res.status(500).json({
      message: "Document upload failed",
      error: error.message
    });
  }
};


export const getDocuments = async (req, res) => {
  try {
    const documents = await Document.find({
      tripId: req.params.tripId
    }).populate("uploadedBy", "name");

    res.json(documents);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

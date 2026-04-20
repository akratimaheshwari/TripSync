import dotenv from "dotenv";
import 'dotenv/config';

import express from "express";
import cors from "cors";
// import dotenv from "dotenv";
import {Server} from "socket.io";
import http from "http";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import tripRoutes from "./routes/tripRoutes.js";
import expenseRoutes from "./routes/expenseRoutes.js";
import documentRoutes from "./routes/documentRoutes.js";

// dotenv.config(); // Removed duplicate call
const app = express();
const server = http.createServer(app);


const io = new Server(server, {
  cors: { origin: "http://localhost:5173",
    methods: ["GET", "POST"],
   }
});

//  THIS MUST COME BEFORE ROUTES
app.use((req, res, next) => {
  req.io = io;
  next();
});
// Connect DB
connectDB();

// Middleware
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/trips", tripRoutes);
app.use("/api/expenses",expenseRoutes);
app.use("/api/documents", documentRoutes);

app.get("/", (req, res) => {
  res.send("TripSync Backend Running");
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

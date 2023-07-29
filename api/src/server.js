import express from "express";
import dotenv from "dotenv";
import { dbConnection } from "./config/DB.js";
import cookieParser from "cookie-parser";
import cors from "cors";

import { Server } from "socket.io";
import { createServer } from "http";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

dbConnection();

const server = createServer(app);

// Initialize Socket.io server
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Authorization", "Content-Type"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("A new client connected");
  socket.on("disconnect", () => {
    clearInterval(interval);
    console.log("Client disconnected");
  });
});

export const emitEvent = (eventName, data) => {
  io.emit(eventName, data);
};


server.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});

import dotenv from "dotenv";
dotenv.config();

import { Server } from "socket.io";

import app from "./app.js";

import connectDB from "./config/db.js";

const PORT = process.env.PORT || 5000;


// DATABASE CONNECTION
connectDB();


// EXPRESS SERVER
const server = app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});
// SOCKET.IO
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true
  }
});
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);
  socket.on("disconnect", () => {
    console.log(
      "User disconnected:",
      socket.id
    );
  });
});
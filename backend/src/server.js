import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import { Server } from "socket.io";

import app from "./app.js";

const PORT = process.env.PORT || 5000;
// DATABASE CONNECTION
mongoose.connect(process.env.MONGO_URI)

.then(() => {
    console.log("MongoDB Connected");
    const server = app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
    // SOCKET.IO SETUP
    const io = new Server(server, {
        cors: {
            origin: "http://localhost:5173",
            credentials: true
        }
    });
    // Handle socket connections
    io.on("connection", (socket) => {
        console.log("User connected:", socket.id);
        socket.on("disconnect", () => {
            console.log("User disconnected:", socket.id);
        });
    });
})
.catch((err) => {
    console.log(err);
});
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(authRoutes);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
    res.send("API Running...");
});

export default app;
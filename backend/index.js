import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import rootRouter from "./routes/root.js";
import todoRouter from "./routes/todosRoutes.js";
import authRouter from "./routes/authRoutes.js";
import { corsOptions } from "./config/corsOptions.js";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/", express.static(path.join(__dirname, "public")));

app.use("/", rootRouter);
app.use("/api/auth", authRouter);
app.use("/api/todos", todoRouter);

const databaseUrl = process.env.DATABASE_URL;
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

mongoose
  .connect(databaseUrl)
  .then(() => console.log("Database Connected..."))
  .catch((error) =>
    console.error("Database connection failed:", error.message)
  );

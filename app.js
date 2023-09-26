import express from "express";
import userRouter from "./routes/users.js";
import taskRouter from "./routes/task.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

export const app = express();
config({
  path: "./data/config.env",
});

// Setting up MiddleWares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use("/users", userRouter);
app.use("/tasks", taskRouter);

app.get("/", (req, res) => {
  res.json({
    nice: "yes nice",
  });
});

app.use((err, req, res, next) => {
  // Error Handler on different routes
  err.message = err.message || "Internal Server Error";
  err.statusCode = err.statusCode || 500;

  return res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
});

import express from "express";
import {
  addNewTask,
  deleteTask,
  getAllTasks,
  updateTask,
} from "../controllers/task.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/new", isAuthenticated, addNewTask);
router.post("/my", isAuthenticated, getAllTasks);
router.post("/update/:id", isAuthenticated, updateTask);
router.post("/delete/:id", isAuthenticated, deleteTask);

export default router;

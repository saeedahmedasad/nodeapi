import express from "express";
import {
  getAllUsers,
  getMyData,
  login,
  logout,
  register,
} from "../controllers/users.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.get("/all", getAllUsers);

router.post("/new", register);
router.post("/login", login);
router.get("/logout", logout);

router.get("/me", isAuthenticated, getMyData);

export default router;

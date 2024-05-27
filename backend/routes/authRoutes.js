import express from "express";
import {
  logout,
  refresh,
  signin,
  signup,
} from "../controllers/authController.js";
import verifyJWT from "../middleware/verifyJWT.js";
import { loginLimiter } from "../middleware/loginLimiter.js";

const router = express.Router();

router.post("/signup", signup);

router.post("/signin", loginLimiter, signin);

router.get("/refresh", refresh);

router.post("/logout", verifyJWT, logout);

export default router;

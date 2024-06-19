import express from "express";
import {
  loginUser,
  registerUser,
  forgotpassword,
  resetpassword,
  getCoach,
} from "../controllers/Coach.controller.js";
import validationMiddleWare from "../validations/auth.js";

const router = express.Router();
router.post("/login", validationMiddleWare("loginUser"), loginUser);
router.post("/register", validationMiddleWare("registerCoach"), registerUser);
router.post("/forgotpassword", forgotpassword);
router.post("/resetpassword", resetpassword);
router.get("/getcoach", getCoach);
export default router;

import express from "express";
import {
  loginUser,
  registerUser,
  forgotpassword,
  resetpassword,
  createTeam,
  getTeams,
} from "../controllers/Athlete.controller.js";
import auth from "../middleware/auth.js";
import validationMiddleWare from "../validations/auth.js";

const router = express.Router();
router.post("/login", validationMiddleWare("loginUser"), loginUser);
router.post("/register", validationMiddleWare("registerAthlete"), registerUser);
router.post("/forgotpassword", forgotpassword);
router.post("/resetpassword", resetpassword);
router.post("/createteam", auth, createTeam);
router.get("/getteams", auth, getTeams);

export default router;

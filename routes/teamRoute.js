import express from "express";
import { createTeam, getTeams } from "../controllers/team.controller.js";

const router = express.Router();

router.get("/getTeams", getTeams);
router.post("/createTeam", createTeam);

export default router;

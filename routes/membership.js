import express from "express";
import {
  getMembership,
  createMembership,
} from "../controllers/membership.controller.js";
const router = express.Router();

router.get("/getMembership", getMembership);

router.post("/createMembership", createMembership);

export default router;

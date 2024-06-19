import express from "express";

import {
  getStaticContent,
  createStaticContent,
} from "../controllers/staticContent.controller.js";
const router = express.Router();

router.get("/getcontent", getStaticContent);
router.post("/createcontent", createStaticContent);
export default router;

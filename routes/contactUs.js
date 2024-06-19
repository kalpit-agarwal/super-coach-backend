import express from "express";

import response from "../helpers/response.js";
import helper from "../helpers/helper.js";

const router = express.Router();
router.post("/", async (req, res) => {
  const { name, email, message } = req.body;
  if (!email) {
    return res.status(400).json({ message: "Please provide email" });
  }
  if (!name) {
    return res.status(400).json({ message: "Please provide name" });
  }
  if (!message) {
    return res.status(400).json({ message: "Please provide message" });
  }
  try {
    await helper.dynamicMailer(name, email, message);
    return res
      .status(200)
      .json(
        response.responseData(
          "Your message has been sent successfully",
          {},
          true
        )
      );
  } catch (err) {
    return res.status(500).json(response.responseData(err.message, {}, false));
  }
});

export default router;

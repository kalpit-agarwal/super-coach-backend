import sportSchema from "../models/sportSchema.js";
import response from "../helpers/response.js";
import express from "express";
import upload from "../helpers/multer.js";
const router = express.Router();

router.post("/addsport", upload, async (req, res) => {
  const names = req.files.map((file) => file.originalname.split("-")[0]);
  const images = req.files.map((file) => file.path);

  try {
    const sports = await Promise.all(
      names.map(async (name, index) => {
        const sport = new sportSchema({
          name,
          image: images[index],
        });
        await sport.save();
        return sport;
      })
    );
    return res
      .status(200)
      .json(response.responseData("Sport added successfully", sports, true));
  } catch (err) {
    return res.status(400).json(response.responseData(err.message, {}, false));
  }
});

router.get("/getsports", async (req, res) => {
  try {
    const sports = await sportSchema.find();

    return res
      .status(200)
      .json(response.responseData("All sports", sports, true));
  } catch (err) {
    return res.status(400).json(response.responseData(err.message, {}, false));
  }
});

export default router;

import mongoose from "mongoose";

const playerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  sport: {
    type: String,
    required: true,
  },
});

const player = mongoose.model("player", playerSchema) || mongoose.models.player;
export default player;

import mongoose from "mongoose";

const teamSchema = new mongoose.Schema({
  athleteId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Athlete",
  },
  teamname: {
    type: String,
    required: true,
  },

  teamtype: {
    type: String,
    required: true,
    enum: ["Gym", "Sport", "Racing"],
  },
  coachId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Coach",
  },
  playersId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Player",
      required: false,
    },
  ],
});

const team = mongoose.model("team", teamSchema) || mongoose.models.team;
export default team;

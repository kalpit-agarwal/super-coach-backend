import mongoose from "mongoose";

const coachSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
  },
  phone: {
    type: String,
    trim: true,
    match: /^[0-9]{10}$/,
  },
  password: {
    type: String,
    required: true,
  },
  sport: {
    type: String,
    trim: true,
    lowercase: true,
  },
  experience: {
    type: Number,
    required: true,
  },
  salary: {
    type: Number,
    default: 0,
    required: true,
  },
  photo: {
    type: String,
    trim: true,
  },
});

coachSchema.index({ email: 1 });

const coach = mongoose.model("coach", coachSchema) || mongoose.models.coach;

export default coach;

import mongoose from "mongoose";

const athleteSchema = mongoose.Schema({
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
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  sport: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "sport",
    required: false,
  },
  photo: {
    type: String,
    trim: true,
  },
  height: {
    type: Number,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  membershipType: {
    type: String,
    ref: "Membership",
    enum: ["free trial"],
    required: true,
  },
  membershipStartDate: {
    type: Date,
    default: Date.now,
    required: false,
  },
});

// Index creation
athleteSchema.index({ email: 1 });

const Athlete = mongoose.model("Athlete", athleteSchema);
export default Athlete;

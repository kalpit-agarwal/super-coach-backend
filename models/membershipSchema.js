import mongoose from "mongoose";

const membershipSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
});

const Membership = mongoose.model("Membership", membershipSchema);
export default Membership;

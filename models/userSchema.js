import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  membershipType: {
    type: String,
    required: true,
    trim: true,
  },
  sport: {
    type: String,
    required: true,
    trim: true,
  },
});

const User = mongoose.model("User", userSchema);
export default User;

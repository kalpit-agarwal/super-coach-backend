import mongoose from "mongoose";

const staticContentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    trim: true,
  },
  slug: {
    type: String,
    required: true,
    trim: true,
  },

  title: {
    type: String,
    required: true,
    trim: true,
  },
});

const StaticContent = mongoose.model("StaticContent", staticContentSchema);
export default StaticContent;

import mongoose from "mongoose";

const imageURL = (image) => {
  if (image) {
    return `http://localhost:4000/${image}`;
  }
};

const sportSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    get: imageURL,
  },
});

sportSchema.set("toJSON", { getters: true, virtuals: false });
sportSchema.set("toObject", { getters: true, virtuals: false });

const sports = mongoose.model("Sport", sportSchema);

export default sports;

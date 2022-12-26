import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  recipe: [{ type: mongoose.Types.ObjectId, ref: "Recipe", required: true }],
  likes: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Recipe",
      required: true,
    },
  ],
});
export default mongoose.model("User", userSchema);

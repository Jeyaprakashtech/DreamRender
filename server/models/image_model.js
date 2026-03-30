import mongoose, { Types } from "mongoose";

const imageSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  image: { type: String, required: true },
  prompt: { type: String, required: true, unique: true },
  date: { type: Number },
});

const imageModel = mongoose.model.image || mongoose.model("Image", imageSchema);

export default imageModel;

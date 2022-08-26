import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  description: { type: String, required: true },
  checked: { type: Boolean, default: false },
  createdAt: { type: Date, default: new Date() },
});
const todoModal = mongoose.model("todo", todoSchema);

export default todoModal;

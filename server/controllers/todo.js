import todoModal from "../models/todoModal.js";
import mongoose from "mongoose";

export const getTodoList = async (req, res) => {
  try {
    const todoList = await todoModal.find({});
    res.status(200).json({ data: todoList });
  } catch (error) {
    res.status(401).json({ message: error });
  }
};

export const addNewTodo = async (req, res) => {
  const newTodo = new todoModal({
    ...req.body,
  });
  try {
    await newTodo.save();
    res.status(200).json({ data: newTodo });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

export const deleteTodo = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: `No todo exist with id:${id}` });
    }
    await todoModal.findByIdAndRemove(id);
    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateTodo = async (req, res) => {
  const { id } = req.params;
  const { description, checked } = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: `No tour exist with id:${id}` });
    }
    const updatedTodo = {
      description,
      checked,
    };
    await todoModal.findByIdAndUpdate(id, updatedTodo, { new: true });
    res.json(updatedTodo);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

import express from "express";
import {
  getTodoList,
  addNewTodo,
  deleteTodo,
  updateTodo,
} from "../controllers/todo.js";
const router = express.Router();

router.get("/", getTodoList);
router.post("/", addNewTodo);
router.delete("/:id", deleteTodo);
router.patch("/:id", updateTodo);

export default router;

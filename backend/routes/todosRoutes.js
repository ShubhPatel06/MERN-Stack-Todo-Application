import express from "express";
import {
  createTodo,
  deleteTodo,
  getTodos,
  updateTodo,
  updateTodoStatus,
} from "../controllers/todosController.js";
import verifyJWT from "../middleware/verifyJWT.js";

const router = express.Router();

router.get("/", verifyJWT, getTodos);

router.post("/", verifyJWT, createTodo);

router.put("/:id", verifyJWT, updateTodo);

router.patch("/:id", verifyJWT, updateTodoStatus);

router.delete("/:id", verifyJWT, deleteTodo);

export default router;

const express = require("express");
const {
  createTodo,
  getAllTodos,
  updateTodo,
  deleteTodo,
} = require("../controllers/TodoController");

const router = express.Router();

router.post("/", createTodo);
router.get("/", getAllTodos);
router.put("/:id", updateTodo);
router.delete("/:id", deleteTodo);

module.exports = router;
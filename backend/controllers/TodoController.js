const Todo = require("../models/TodoModel");

// Create a ToDo
const createTodo = async (req, res) => {
  try {
    const { text, userId } = req.body;
    if (!userId) return res.status(400).json({ message: "userId is required" });

    const newTodo = new Todo({ text, userId });
    const savedTodo = await newTodo.save();
    res.status(201).json(savedTodo);
  } catch (error) {
    res.status(500).json({ message: "Error creating todo" });
  }
};

// Get all ToDos for a specific user
const getAllTodos = async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) return res.status(400).json({ message: "userId is required" });

    const todos = await Todo.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: "Error fetching todos" });
  }
};

// Update ToDo
const updateTodo = async (req, res) => {
  try {
    const { text, completed, userId } = req.body;
    const updated = await Todo.findOneAndUpdate(
      { _id: req.params.id, userId },
      { text, completed },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Todo not found" });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Error updating todo" });
  }
};

// Delete ToDo
const deleteTodo = async (req, res) => {
  try {
    const { userId } = req.query;
    const deleted = await Todo.findOneAndDelete({ _id: req.params.id, userId });
    if (!deleted) return res.status(404).json({ message: "Todo not found" });
    res.json({ message: "Todo deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting todo" });
  }
};

module.exports = {
  createTodo,
  getAllTodos,
  updateTodo,
  deleteTodo,
};

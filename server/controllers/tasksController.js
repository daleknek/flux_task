const Task = require("../models/task.model");

const tasksController = {};

// Get all tasks of a column
tasksController.getAllTasks = async (req, res) => {
  try {
    const columnId = req.params.columnId;
    const tasks = await Task.find({ column_id: columnId });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(400).json({ error: "Failed to fetch tasks" });
  }
};

// Get a specific task by ID
tasksController.getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.taskId);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({ error: "Failed to fetch task" });
  }
};

// Create a new task for a column
tasksController.createNewTask = async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    console.error("Task creation error:", error);
    res.status(400).json({ error: "Failed to create task" });
  }
};

// Update a task by ID
tasksController.updateTask = async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.taskId,
      req.body,
      { new: true }
    );
    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(400).json({ error: "Failed to update task" });
  }
};

// Delete a task by ID
tasksController.deleteTask = async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.taskId);
    if (!deletedTask) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: "Failed to delete task" });
  }
};

module.exports = tasksController;

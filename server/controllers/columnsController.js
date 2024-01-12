const Column = require("../models/column.model");
const Task = require("../models/task.model");
const Board = require("../models/board.model");

const columnsController = {};

// Get all columns of a board
columnsController.getAllColumns = async (req, res) => {
  try {
    const boardId = req.params.boardId;
    const columns = await Column.find({ board: boardId }).populate({
      path: "tasks",
      model: "Task",
    });
    res.status(200).json(columns);
    console.log("My columns: ", columns);
  } catch (error) {
    res.status(400).json({ error: "Failed to fetch columns" });
  }
};

// Get a specific column by ID
columnsController.getColumnById = async (req, res) => {
  try {
    const column = await Column.findById(req.params.columnId);
    if (!column) {
      return res.status(404).json({ error: "Column not found" });
    }
    res.status(200).json(column);
  } catch (error) {
    res.status(400).json({ error: "Failed to fetch column" });
  }
};

// Create a new column for a board
columnsController.createNewColumn = async (req, res) => {
  try {
    const columnData = {
      name: req.body.name,
      wip: req.body.wip,
      board: req.body.board,
      tasks: req.body.tasks || [],
    };

    const column = new Column(columnData);
    await column.save();

    // Update the board to reference the new column
    // const board = await Board.findById(req.body.board);
    // if (!board) {
    //   // Delete the column if the board doesn't exist
    //   await Column.findByIdAndDelete(column._id);
    //   return res.status(404).json({ error: "Board not found" });
    // }
    // board.columns.push(column._id);
    // await board.save();

    res.status(201).json(column);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Failed to create column" });
  }
};

// Update a column by ID
columnsController.updateColumn = async (req, res) => {
  console.log(req);
  try {
    const updatedColumn = await Column.findByIdAndUpdate(
      req.params.columnId,
      req.body,
      { new: true }
    );
    if (!updatedColumn) {
      return res.status(404).json({ error: "Column not found" });
    }
    res.status(200).json(updatedColumn);
  } catch (error) {
    console.error("Error in updateColumn:", error);
    res.status(400).json({ error: "Failed to update column" });
  }
};

// Delete a column by ID
columnsController.deleteColumn = async (req, res) => {
  try {
    const deletedColumn = await Column.findByIdAndDelete(req.params.columnId);
    if (!deletedColumn) {
      return res.status(404).json({ error: "Column not found" });
    }

    // delete all tasks associated with the column
    // await Task.deleteMany({ column: req.params.columnId });

    res.status(200).json({ message: "Column deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: "Failed to delete column" });
  }
};

module.exports = columnsController;

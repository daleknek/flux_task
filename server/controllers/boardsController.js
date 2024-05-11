const Board = require("../models/board.model");
const Column = require("../models/column.model");

const boardsController = {};

// Get the single board of a user
boardsController.getUserBoard = async (req, res) => {
  try {
    const board = await Board.findOne(req.params.boardId).populate({
      path: "columns",
      model: "Column",
      populate: {
        path: "tasks",
        model: "Task",
      },
    });

    if (!board) {
      return res.status(404).json({ board: {} });
    }
    res.status(200).json({
      _id: board._id,
      name: board.name,
      columns: board.columns,
    });
  } catch (error) {
    res.status(400).json({ error: "Failed to fetch board" });
  }
};

// Get a specific board by ID
boardsController.getBoardById = async (req, res) => {
  try {
    const board = await Board.findById(req.params.boardId);
    if (!board) {
      return res.status(404).json({ error: "Board not found" });
    }
    res.status(200).json(board);
  } catch (error) {
    res.status(400).json({ error: "Failed to fetch board" });
  }
};

// Create a new board for a user
boardsController.createNewBoard = async (req, res) => {
  try {
    const boardData = {
      name: req.body.name,
      columns: req.body.columns || [],
    };
    const board = new Board(boardData);
    await board.save();
    res.status(201).json(board);
  } catch (error) {
    console.error("Error when creating board:", error.message);
    res
      .status(400)
      .json({ error: "Failed to create board", details: error.message });
  }
  console.log("Request to create new board:", req.body);
};

// Update a board by ID
boardsController.updateBoard = async (req, res) => {
  try {
    const updatedBoard = await Board.findByIdAndUpdate(
      req.params.boardId,
      req.body,
      { new: true }
    );
    if (!updatedBoard) {
      return res.status(404).json({ error: "Board not found" });
    }
    res.status(200).json(updatedBoard);
  } catch (error) {
    console.error("Error in updateBoard:", error);
    res.status(400).json({ error: "Failed to update board" });
  }
};

module.exports = boardsController;

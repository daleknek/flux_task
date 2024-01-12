const Board = require("../models/board.model");
const Column = require("../models/column.model");

const boardsController = {};

// Get the single board of a user
boardsController.getUserBoard = async (req, res) => {
  try {
    // const userId = req.user.id;
    const board = await Board.findOne({ name: "New Board" }).populate({
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
      // user: board.user,
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
      // user: req.user.id,
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
  // console.log("User ID:", req.user._id);
};

// Update a board by ID
boardsController.updateBoard = async (req, res) => {
  try {
    // console.log("Request to update board with ID:", req.params.boardId);
    // console.log("Update data:", req.body);

    const updatedBoard = await Board.findByIdAndUpdate(
      req.params.boardId,
      req.body,
      { new: true }
    );

    // console.log("Updated board:", updatedBoard);

    if (!updatedBoard) {
      return res.status(404).json({ error: "Board not found" });
    }
    res.status(200).json(updatedBoard);
  } catch (error) {
    console.error("Error in updateBoard:", error);
    res.status(400).json({ error: "Failed to update board" });
  }
};

// // Delete a board by ID
// boardsController.deleteBoard = async (req, res) => {
//   try {
//     const deletedBoard = await Board.findByIdAndDelete(req.params.boardId);
//     if (!deletedBoard) {
//       return res.status(404).json({ error: "Board not found" });
//     }
//     res.status(200).json({ message: "Board deleted successfully" });
//   } catch (error) {
//     res.status(400).json({ error: "Failed to delete board" });
//   }
// };

module.exports = boardsController;

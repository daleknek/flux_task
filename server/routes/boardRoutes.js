const express = require("express");
const router = express.Router();
const boardsController = require("../controllers/boardsController");
const authorization = require("../middleware/authorization");

router
  .route("/")
  .get(authorization, boardsController.getUserBoard)
  .post(authorization, boardsController.createNewBoard);

router
  .route("/:boardId")
  .get(authorization, boardsController.getBoardById)
  .patch(authorization, boardsController.updateBoard);

module.exports = router;

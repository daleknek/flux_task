const express = require("express");
const router = express.Router();
const boardsController = require("../controllers/boardsController");
const authentication = require("../middleware/authentication");

router
  .route("/")
  .get(authentication, boardsController.getUserBoard)
  .post(authentication, boardsController.createNewBoard);

router
  .route("/:boardId")
  .get(authentication, boardsController.getBoardById)
  .patch(authentication, boardsController.updateBoard);
// .delete(authentication, boardsController.deleteBoard);

module.exports = router;

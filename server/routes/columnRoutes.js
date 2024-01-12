const express = require("express");
const router = express.Router();
const columnsController = require("../controllers/columnsController");
const authentication = require("../middleware/authentication");
// const { isAdmin } = require("../middleware/authorization");

router
  .route("/")
  .get(authentication, columnsController.getAllColumns)
  .post(authentication, columnsController.createNewColumn);

router
  .route("/:columnId")
  .get(authentication, columnsController.getColumnById)
  .patch(authentication, columnsController.updateColumn)
  .delete(authentication, columnsController.deleteColumn);

module.exports = router;

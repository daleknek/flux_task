const express = require("express");
const router = express.Router();
const columnsController = require("../controllers/columnsController");
const authorization = require("../middleware/authorization");

router
  .route("/")
  .get(authorization, columnsController.getAllColumns)
  .post(authorization, columnsController.createNewColumn);

router
  .route("/:columnId")
  .get(authorization, columnsController.getColumnById)
  .patch(authorization, columnsController.updateColumn)
  .delete(authorization, columnsController.deleteColumn);

module.exports = router;

const express = require("express");
const router = express.Router();
const tasksController = require("../controllers/tasksController");
const authorization = require("../middleware/authorization");

router
  .route("/")
  .get(authorization, tasksController.getAllTasks)
  .post(authorization, tasksController.createNewTask);

router
  .route("/:taskId")
  .get(authorization, tasksController.getTaskById)
  .patch(authorization, tasksController.updateTask)
  .delete(authorization, tasksController.deleteTask);

module.exports = router;

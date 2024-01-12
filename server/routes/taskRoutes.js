const express = require("express");
const router = express.Router();
const tasksController = require("../controllers/tasksController");
const authentication = require("../middleware/authentication");
// const { isAdmin } = require("../middleware/authorization");

router
  .route("/")
  .get(authentication, tasksController.getAllTasks)
  .post(authentication, tasksController.createNewTask);

router
  .route("/:taskId")
  .get(authentication, tasksController.getTaskById)
  .patch(authentication, tasksController.updateTask)
  .delete(authentication, tasksController.deleteTask);

module.exports = router;

const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");

router.route("/").get(usersController.getAllUsers);

// router.route("/:userId").get(authentication, usersController.getUserById);

module.exports = router;

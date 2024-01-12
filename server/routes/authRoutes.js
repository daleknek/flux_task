const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");

router.post("/signup", usersController.signUp);
router.post("/login", usersController.logIn);

module.exports = router;

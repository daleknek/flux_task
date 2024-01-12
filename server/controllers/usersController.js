const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const usersController = {};

// Sign up user
usersController.signUp = async (req, res) => {
  try {
    const { email, username, password } = req.body;

    const user = new User({ email, username, password });
    await user.save();

    res.status(201).send({ message: "User registered successfully!" });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const SECRET = process.env.JWT_SECRET;

// Log in user
usersController.logIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    const isMatch = user && (await bcrypt.compare(password, user.password));

    if (!isMatch) {
      return res.status(400).send("Invalid login details");
    }

    const token = jwt.sign({ _id: user._id }, SECRET, {
      expiresIn: "1h",
    });
    res.send({ _id: user._id, token });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
};

module.exports = usersController;

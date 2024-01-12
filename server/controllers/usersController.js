const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const usersController = {};

// Get all users
// usersController.getAllUsers = async (req, res) => {
//   try {
//     const users = await User.find({});
//     res.status(200).json(users);
//   } catch (error) {
//     res.status(400).json({ error: "Failed to fetch users" });
//   }
// };

// Get a specific user by ID
// usersController.getUserById = async (req, res) => {
//   try {
//     const user = await User.findById(req.params.userId);
//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }
//     res.status(200).json(user);
//   } catch (error) {
//     res.status(400).json({ error: "Failed to fetch user" });
//   }
// };

// Create a new user
// usersController.createNewUser = async (req, res) => {
//   //   console.log("Received data:", req.body);
//   try {
//     const user = new User(req.body);
//     await user.save();
//     res.status(201).json(user);
//   } catch (error) {
//     console.error("Error when creating user:", error.message);
//     res
//       .status(400)
//       .json({ error: "Failed to create user", details: error.message });
//   }
// };

// Update a user by ID
// usersController.updateUser = async (req, res) => {
//   try {
//     const updatedUser = await User.findByIdAndUpdate(
//       req.params.userId,
//       req.body,
//       { new: true }
//     );
//     if (!updatedUser) {
//       return res.status(404).json({ error: "User not found" });
//     }
//     res.status(200).json(updatedUser);
//   } catch (error) {
//     res.status(400).json({ error: "Failed to update user" });
//   }
// };

//Delete a user by ID
// usersController.deleteUser = async (req, res) => {
//   try {
//     const deletedUser = await User.findByIdAndDelete(req.params.userId);
//     if (!deletedUser) {
//       return res.status(404).json({ error: "User not found" });
//     }
//     res.status(200).json({ message: "User deleted successfully" });
//   } catch (error) {
//     res.status(400).json({ error: "Failed to delete user" });
//   }
// };

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

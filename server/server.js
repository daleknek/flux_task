const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const logRequests = require("./middleware/logRequests");

require("dotenv").config({ path: "../.env" });

const app = express();
const PORT = 4000;

const corsOptions = {
  origin: "http://localhost:3000",
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(logRequests);

app.get("/", (req, res) => {
  res.send("Hello from the server!");
});

const uri = process.env.ATLAS_URI;
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

const boardRoutes = require("./routes/boardRoutes");
const columnRoutes = require("./routes/columnRoutes");
const taskRoutes = require("./routes/taskRoutes");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

app.use((req, res, next) => {
  console.log("Middle log:", req.body);
  next();
});

app.use(authRoutes);
app.use("/users", userRoutes);
app.use("/boards", boardRoutes);
app.use("/columns", columnRoutes);
app.use("/tasks", taskRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

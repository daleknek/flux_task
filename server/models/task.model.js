const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const taskSchema = new Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    date: {
      type: Date,
    },
    column: {
      type: Schema.Types.ObjectId,
      ref: "Column",
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;

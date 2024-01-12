const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const columnSchema = new Schema(
  {
    name: {
      type: String,
    },
    wip: {
      type: String,
    },
    board: {
      type: Schema.Types.ObjectId,
      ref: "Board",
    },
    tasks: [
      {
        type: Schema.Types.ObjectId,
        ref: "Task",
      },
    ],
  },
  { timestamps: true }
);

const Column = mongoose.model("Column", columnSchema);
module.exports = Column;

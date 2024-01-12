const mongoose = require("mongoose");
require("mongoose-type-email");
const bcrypt = require("bcryptjs");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
    },
    email: {
      type: mongoose.SchemaTypes.Email,
      unique: true,
      required: true,
      trim: true,
      minlength: 3,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },
    role: {
      type: String,
      default: "user",
    },
  },
  { timestamps: true }
);

// Hash password before saving to database
userSchema.pre("save", async function (next) {
  try {
    if (this.isModified("password")) {
      this.password = await bcrypt.hash(this.password, 12);
    }
    next(); //proceed to save the user
  } catch (error) {
    console.log("An error occurred", error);
    next(error);
  }
});

const User = mongoose.model("User", userSchema);
module.exports = User;

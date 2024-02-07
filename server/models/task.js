const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Task title is required"],
      minLength: [3, "Task title is too short"],
      unique: [true, "Title must be unique"],
    },
    description: String,
    completed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Task = mongoose.model("tasks", taskSchema);

module.exports = Task;

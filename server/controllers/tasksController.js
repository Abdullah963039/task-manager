const asyncHandler = require("express-async-handler");

const Task = require("../models/task");
const ApiError = require("../lib/errors/apiError");

//* desc    Get all tasks
//* route   GET api/v1/tasks
const getAllTasks = asyncHandler(async (_req, res) => {
  const tasks = await Task.find({});

  res.status(200).json({ results: tasks.length, data: tasks });
});

//* desc    Get specific task
//* route   GET api/v1/tasks/:id
const getTask = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const task = await Task.findById(id);

  if (!task) return next(new ApiError("Task not found", 404));

  res.status(200).json({ data: task });
});

//* desc    Create new task
//* route   POST api/v1/tasks
const createTask = asyncHandler(async (req, res) => {
  const title = req.body.title;
  const description = req.body.description ?? null;
  const completed = req.body.completed ?? false;

  const task = await Task.create({ title, description, completed });

  res.status(201).json({ data: task });
});

//* desc    Update task
//* route   PATCH api/v1/tasks/:id
const updateTask = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;

  const task = await Task.findByIdAndUpdate(
    id,
    {
      title,
      description,
      completed,
    },
    { new: true }
  );

  if (!task) return next(new ApiError("Task not found", 404));

  res.status(200).json({ data: task });
});

//* desc    Delete task
//* route   DELETE api/v1/tasks/:id
const deleteTask = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const task = await Task.deleteOne({ _id: id });

  if (!task) return next(new ApiError("Task not found", 404));

  res.status(204).json({ message: "Deleted successfuly", data: task });
});

//* desc    Delete all tasks
//* route   DELETE api/v1/tasks
const clearTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.deleteMany();

  res.status(204).json({ message: "Tasks cleared" });
});

module.exports = {
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  clearTasks,
};

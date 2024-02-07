const express = require("express");

const {
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  clearTasks,
  deleteTask,
} = require("../controllers/tasksController");
const {
  getTaskValid,
  createTaskValid,
  updateTaskValid,
  deleteTastValid,
} = require("../lib/validators/taskValidator");

const router = express.Router();

router
  .route("/")
  .get(getAllTasks)
  .post(createTaskValid, createTask)
  .delete(clearTasks);
router
  .route("/:id")
  .get(getTaskValid, getTask)
  .patch(updateTaskValid, updateTask)
  .delete(deleteTastValid, deleteTask);

module.exports = router;

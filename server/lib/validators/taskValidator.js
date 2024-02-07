const { check } = require("express-validator");

const validatorMiddlware = require("../../middlewares/validator-middlware");

const isMongoId = () => check("id").isMongoId().withMessage("Invalid id value");

const getTaskValid = [isMongoId(), validatorMiddlware];

const createTaskValid = [
  check("title")
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 3 })
    .withMessage("Too short title"),
  check("description").optional(),
  validatorMiddlware,
];

const updateTaskValid = [
  check("title")
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 3 })
    .withMessage("Too short title"),
  check("description").optional(),
  check("completed")
    .isBoolean()
    .withMessage("This field can be true or false!"),
  validatorMiddlware,
];

const deleteTastValid = [isMongoId(), validatorMiddlware];

module.exports = {
  getTaskValid,
  createTaskValid,
  updateTaskValid,
  deleteTastValid,
};

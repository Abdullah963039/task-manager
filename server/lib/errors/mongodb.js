//! Expected mongodb errors

const ApiError = require("./apiError");

const castErrorHandler = (err) => {
  const message = `Invalid ${err.path}: ${err.value}.`;

  return new ApiError(message, 400);
};

const duplicateErrorHandler = (err) => {
  const value = err.message.match(/(["'])(\\?.)*?\1/)[0];

  const message = `${value} already exist. please use another`;
  return new ApiError(message, 400);
};

module.exports = { castErrorHandler, duplicateErrorHandler };

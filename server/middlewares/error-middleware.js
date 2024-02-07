const {
  castErrorHandler,
  duplicateErrorHandler,
} = require("../lib/errors/mongodb");

const globalErrorMiddleware = (err, _req, res, _next) => {
  err.statusCode = err.statusCode ?? 500;
  err.message = err.message ?? "Internal server error";

  if (process.env.NODE_ENV === "development") {
    devError(err, res);
  } else {
    if (err.name === "CastError") err = castErrorHandler(err);
    if (err.code === 11000) err = duplicateErrorHandler(err);
    prodError(err, res);
  }
};

const devError = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const prodError = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    res.status(500).json({
      status: "error",
      message: "something went very wrong!",
    });
  }
};
module.exports = globalErrorMiddleware;

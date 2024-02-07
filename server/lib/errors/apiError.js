class ApiError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.message = message;
    this.status = `${statusCode}`.startsWith("4") ? "Failed" : "Done";
    this.statusCode = statusCode;
    this.isOperational = true;
  }
}

module.exports = ApiError;

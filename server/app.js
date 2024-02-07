const express = require("express");
const dbConnect = require("./config/db");
const cors = require("cors");
require("dotenv").config({ path: ".env" });

const tasksRoute = require("./routes/taskRoute");
const globalErrorMiddleware = require("./middlewares/error-middleware");
const ApiError = require("./lib/errors/apiError");

const app = express();

app.use(cors());
app.use(express.json());

// Connect with DB
dbConnect();

// Routes
app.use("/api/v1/tasks", tasksRoute);

app.use("*", (req, res, next) => {
  next(new ApiError(`Can't find this route =>'${req.originalUrl}'`, 404));
});

// Error middlware
app.use(globalErrorMiddleware);

// Run app
const PORT = process.env.PORT ?? 8000;
const server = app.listen(PORT);

// Unhandled Rejection Errors ( Handle errors outside express )
process.on("unhandledRejection", (error) => {
  console.error(`Unhandled Rejection Error: ${error.name} - ${error.message}`);
  server.close(() => {
    console.error(`Shutting down application ...`);
    process.exit(1);
  });
});

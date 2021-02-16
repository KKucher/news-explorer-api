const {
  serverErrorMessage,
  clientErrorMessage,
} = require("../utils/errorsMessages");

const errorHandler = (err, req, res, next) => {
  const error = {
    statusCode: err.statusCode || 500,
    message: err.message || serverErrorMessage.serverError,
  };

  if (err.name === "ValidationError") {
    error.statusCode = 400;
    error.message = err.message || "Неверно заполнены поля";
  }
  if (
    err.name !== "ValidationError" &&
    err.status === 400 &&
    err.type === "cors"
  ) {
    error.statusCode = 400;
    error.message = err.message || "Неверно заполнены поля";
  }
  if (err.name === "CastError") {
    error.statusCode = 422;
    error.message = clientErrorMessage.castError;
  }
  if (err.name === "DisconnectedError") {
    error.statusCode = 503;
    error.message = serverErrorMessage.disconnectedError;
  }
  res.status(error.statusCode).send({ message: error.message });
  next();
};

module.exports = errorHandler;

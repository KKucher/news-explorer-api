const { isCelebrateError } = require("celebrate");
const { ValidationError } = require("../../errors");
const { clientErrorMessage } = require("../../utils/errorsMessages");

module.exports = (err, req, res, next) => {
  if (isCelebrateError(err)) {
    const customError = err.details.get("body") || err.details.get("params");
    throw new ValidationError(`${clientErrorMessage.validationError}: ${customError.message.replace(/"/g, "")}`);
  }
  next(err);
};

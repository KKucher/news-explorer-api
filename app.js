const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const helmet = require("helmet");

require("dotenv").config();

const { MONGODB, PORT, allowedCors } = require("./config/config");
const { limiter } = require("./middlewares/rateLimiter");
const celebrateErrorHandler = require("./middlewares/celebrateValidation/celebrateErrorHandler");
const errorHandler = require("./middlewares/errorHandler");
const { serverErrorMessage } = require("./utils/errorsMessages");
const { requestLogger, errorLogger } = require("./middlewares/logger");

mongoose.connect(MONGODB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const router = require("./routes");

const app = express();

app.use(cors({ origin: allowedCors }));

app.use(requestLogger);

app.use(limiter);
app.use(helmet());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error(serverErrorMessage.serverFallError);
  }, 0);
});

app.use("/", router);

app.use(errorLogger);
app.use(celebrateErrorHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

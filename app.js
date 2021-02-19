require('dotenv-flow').config();
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');

const errorHandler = require('./middlewares/errorHandler');
const router = require('./routes');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { PORT, MONGO_URL, corsConfig } = require('./config/config');
const { limiter } = require("./middlewares/rateLimiter");

const app = express();

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(cors(corsConfig));

app.use(requestLogger);

app.use(limiter);
app.use(helmet());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/", router);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

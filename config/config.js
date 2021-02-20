const {
  PORT = 3001,
  JWT_SECRET = "JWT_SECRET",
  MONGO_URL = "mongodb://localhost:27017/newsdb",
  COOKIES_SECURE = true,
  COOKIES_SAMESITE = "None",
} = process.env;

const corsConfig = {
  origin: [
    "https://news-kucher.students.nomoredomains.monster",
    "http://news-kucher.students.nomoredomains.monster",
    "http://localhost:3000",
  ],
  credentials: true,
};

module.exports = {
  PORT,
  JWT_SECRET,
  MONGO_URL,
  COOKIES_SECURE,
  COOKIES_SAMESITE,
  corsConfig,
};

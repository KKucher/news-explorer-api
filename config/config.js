const {
  JWT_SECRET = "JWT_SECRET",
  PORT = 3001,
  MONGODB = "mongodb://localhost:27017/newsdb",
} = process.env;

const corsConfig = {
  origin: [
    "https://news-kucher.students.nomoredomains.monster/",
    "http://news-kucher.students.nomoredomains.monster/",
    "http://localhost:3000",
  ],
  credentials: true,
};

const urlRegex = /^(https?:\/\/(www\.)?)[\w-]+\.[\w./():,-]+#?$/;

module.exports = {
  JWT_SECRET,
  PORT,
  MONGODB,
  corsConfig,
  urlRegex,
};

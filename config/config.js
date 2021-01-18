const {
  JWT_SECRET = "JWT_SECRET",
  PORT = 3000,
  MONGODB = "mongodb://localhost:27017/newsdb",
} = process.env;

const allowedCors = [
  "http://localhost:3000",
];

const urlRegex = /^(https?:\/\/(www\.)?)[\w-]+\.[\w./():,-]+#?$/;

module.exports = {
  JWT_SECRET,
  PORT,
  MONGODB,
  allowedCors,
  urlRegex,
};

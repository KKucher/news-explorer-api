const usersRouter = require("express").Router();

const { getUserMe } = require("../controllers/users.js");

usersRouter.get("/me", getUserMe);

module.exports = usersRouter;

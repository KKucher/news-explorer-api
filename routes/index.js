const router = require("express").Router();
const usersRouter = require("./users");
const articlesRouter = require("./articles");

const { login, createUser } = require("../controllers/users.js");
const { validateUser, validateUserRegister } = require("../middlewares/celebrateValidation/celebrateValidation");
const { NotFoundError } = require("../errors");
const { clientErrorMessage } = require("../utils/errorsMessages");

const auth = require("../middlewares/auth");

router.post("/signup", validateUserRegister, createUser);
router.post("/signin", validateUser, login);

router.use("/articles", auth, articlesRouter);
router.use("/users", auth, usersRouter);

router.use("*", (res, req, next) => {
  next(new NotFoundError(clientErrorMessage.notFoundRes));
});

module.exports = router;

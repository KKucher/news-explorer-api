const articlesRouter = require("express").Router();

const {
  validateArticle,
  validateArticleId,
} = require("../middlewares/celebrateValidation/celebrateValidation");

const {
  getArticles,
  createArticle,
  deleteArticle,
} = require("../controllers/articles.js");

articlesRouter.get("/", getArticles);
articlesRouter.post("/", validateArticle, createArticle);
articlesRouter.delete("/:articleId", validateArticleId, deleteArticle);

module.exports = articlesRouter;

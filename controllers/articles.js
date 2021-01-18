const Article = require("../models/article");
const { ForbiddenError, NotFoundError } = require("../errors");
const { clientErrorMessage } = require("../utils/errorsMessages");

module.exports.getArticles = (req, res, next) => {
  Article.find({ owner: req.user._id })
    .populate("user")
    .then((articles) => {
      res.send(articles);
    })
    .catch(next);
};

module.exports.createArticle = (req, res, next) => {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;
  Article.create({
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
    owner: req.user._id,
  })
    .then((article) => res.status(201).send({
      _id: article._id,
      keyword: article.keyword,
      title: article.title,
      text: article.text,
      date: article.date,
      source: article.source,
      link: article.link,
      image: article.image,
    }))
    .catch(next);
};

module.exports.deleteArticle = (req, res, next) => {
  const { articleId } = req.params;
  Article.findById(articleId)
    .select("+owner")
    .orFail(() => {
      throw new NotFoundError(clientErrorMessage.notFoundArticle);
    })
    .then((article) => {
      if (article.owner.toString() === req.user._id) {
        article.remove().then((removeArticle) => res.status(200).send({
          _id: removeArticle._id,
          keyword: removeArticle.keyword,
          title: removeArticle.title,
          text: removeArticle.text,
          date: removeArticle.date,
          source: removeArticle.source,
          link: removeArticle.link,
          image: removeArticle.image,
        }));
      } else {
        throw new ForbiddenError(clientErrorMessage.forbiddenArticle);
      }
    })
    .catch(next);
};

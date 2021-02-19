const router = require('express').Router();
const { getArticles, saveArticle, deleteArticle } = require('../controllers/articles');
const { validateArticleBody, validateObjectId } = require('../middlewares/validations');

router.get('/', getArticles);
router.post('/', validateArticleBody, saveArticle);
router.delete('/:id', validateObjectId, deleteArticle);

module.exports = router;

const router = require('koa-router')();
const controller = require('../controller/articleController.js');

router.get('/article/getType', controller.getArticleType);
router.post('/article/save', controller.save);
router.post('/article/getConetent', controller.getArticleContent)

module.exports = router;
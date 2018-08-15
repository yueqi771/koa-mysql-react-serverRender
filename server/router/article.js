const router = require('koa-router')();
const controller = require('../controller/articleController.js');

router.post('/article/save', controller.save);
router.post('/article/getConetent', controller.getArticleContent)

module.exports = router;
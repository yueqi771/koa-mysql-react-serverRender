const router = require('koa-router')();
const controller = require('../controller/articleController.js');

router.post('/article/save', controller.save);

module.exports = router;
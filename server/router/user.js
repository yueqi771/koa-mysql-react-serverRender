const router = require('koa-router')();
const controller = require('../controller/userController.js');

// 
router.get('/', controller.test);

module.exports = router;
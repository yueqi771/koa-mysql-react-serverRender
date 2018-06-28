const router = require('koa-router')();
const controller = require('../controller/userController.js');

// 
router.get('/user', controller.test);

module.exports = router;
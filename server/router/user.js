const router = require('koa-router')();
const controller = require('../controller/userController.js');

// 
router.post('/register', controller.test);

module.exports = router;
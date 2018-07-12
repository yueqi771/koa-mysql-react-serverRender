const router = require('koa-router')();
const controller = require('../controller/userController.js');

// router.post('/login', controller.login);
router.post('/register', controller.register);

module.exports = router;
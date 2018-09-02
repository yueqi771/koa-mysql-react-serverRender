const Router = require('koa-router');
const serverRender = require('./server-render');
const path = require('path')
const fs = require('fs');
const serverEntry = require('../../dist/server-entry');
const template = fs.readFileSync(path.join(__dirname, "../../dist/server.ejs"), "utf-8");

const router = require('koa-router')();

const handleSSR = async (ctx) => {
	console.log('这里是serverEntry')
	console.log(serverEntry)
	serverRender(ctx, serverEntry, template)
}

router.get('*', handleSSR)

module.exports = router
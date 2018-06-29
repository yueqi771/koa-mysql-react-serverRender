const Koa = require('Koa');
const mysql = require('mysql');
const route = require('koa-route');
const send = require('koa-send');
const path = require('path');

const app = new Koa();

// 判断当前环境
const isDev= process.env.NODE_ENV === 'development';
renderRouter = isDev ? require('./router/ssr-dev') : require('./routers/ssr')

// 配置路由
app.use(require('./router/user.js').routes());
app.use(renderRouter.routes()).use(renderRouter.allowedMethods());


// 监听一个服务器
const HOST = process.env.HOST || '0.0.0.0';
const PORT = process.env.PROT || 3000;

app.listen(PORT, HOST, () => {
    console.log(`server is listening on ${HOST}:${PORT}`)
})
const Koa = require('Koa');
const mysql = require('mysql');
const send = require('koa-send');
const path = require('path');
const proxy = require('koa-proxy2');
const koaStatic = require('koa-static');
const bodyParser = require('koa-bodyparser');

const staticRouter = require('./router/static')

// 判断当前环境
const isDev = process.env.NODE_ENV === 'development';

const app = new Koa();

// 设置header头
app.use(async (ctx, next) => {
    // 允许来自所有域名的请求
    ctx.set("Access-Control-Allow-Orign", "*");
    // 或者只允许localhost: 7000的请求
    // ctx.set("Access-Control-Allow-Orign", "http://localhost:7000");

    // 设置允许的Http请求方法
    ctx.set("Access-Control-Allow-Methods", "OPTIONS, GET, PUT, POST, DELETE");

    // 字段时必须的， 它是一个逗号分隔的字符串， 表示服务器支持的所有头信息字段
    ctx.set("Access-Control-Allow-Headers", "x-requested-with, accept, orign, content-type");

    // 服务器收到请求以后，检查Orign、Access-Control-Request-Method和Access-Control-Request-Header字段以后，确认允许跨域请求， 就会做出回应。

    // Content-Type表示具体请求中的媒体类型信息
    // ctx.set("Content-Type", "application/json; charset=utl-8");

    // 该字段可选，它的值是一个布尔值，表示是否允许405 Method Not Allowed发送cookie.
    // 当设置成允许请求携带cookie时，需保证Access-Control-Allow-Orign是服务器有的域名，而不能是"*"
    ctx.set("Access-Control-Allow-Credentials", true);

    // 该字段可选， 用来指定本次预检请求的有效期，单位为秒。
    // 当请求方法是PUT或DELETE等特殊方法或者Content-Type字段类型是application/json时，服务器会提前发送一次请求进行验证
    // 下面的设置只是本次验证的有效时间， 即在该时间内服务端可以不进行验证
    ctx.set("Access-Control-Max-Age", 300);

    // 需要获取其他字段时，使用Access-Control-Expose-Headers,
    // getResponseHeader('myData') 可以返回我们所需的值
    ctx.set("Access-Control-Expose-Headers", "myData");

    await next();
})

// 设置解析请求body
app.use(bodyParser({
    formLimit: "1mb"
}))


// 配置静态资源加载中间件
app.use(koaStatic(path.join(__dirname, '../static')))

// 配置代理
app.use(proxy({
    proxy_rules: [
      {
        proxy_location: '/static',
        proxy_pass: 'http://localhost:7000/',
        proxy_micro_service: false,
        proxy_merge_mode: false
      }
    ]
}));

// 发送静态图标文件
app.use(async (ctx, next) => {
  if (ctx.path == '/favicon.ico') {
      await send(ctx, '/favicon.ico', {
          root: path.join(__dirname, '../')
      })
  } else {
      await next();
  }
})

// 配置路由
renderRouter = isDev ? require('./router/ssr-dev') : require('./router/ssr')
app.use(require('./router/user.js').routes());
app.use(staticRouter.routes()).use(staticRouter.allowedMethods());
app.use(renderRouter.routes()).use(renderRouter.allowedMethods());

// 监听一个服务器
const HOST = process.env.HOST || '0.0.0.0';
const PORT = process.env.PROT || 3000;

app.listen(PORT, HOST, () => {
    console.log(`server is listening on ${HOST}:${PORT}`)
})
// 服务端渲染代码
const ejs = require('ejs');
const serialize = require('serialize-javascript');

module.exports = async (ctx, renderer, template) => {
    ctx.headers['ContentType'] = 'text/html';
    const context = { url: ctx.path };
    
    ctx.body = " 进入server-render方法了"
    // return new Promise((resolve, reject) => {
    //     // const createStoreMap = bun

    //     resolve()
    // })
}
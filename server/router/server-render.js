// 服务端渲染代码
const ejs = require('ejs');
const serialize = require('serialize-javascript');

module.exports = async(ctx, renderer, tem) {
    ctx.headers['ContentType'] = 'text/html';
    const context = { url: ctx.path };
    
    return new Promise((resolve, reject) => {
        // const createStoreMap = bun
        console.log('进入server-render方法了')

        resolve
    })
}
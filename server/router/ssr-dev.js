const Router = require('koa-router');
// 将输出文件写入到内存中， 但不会写入磁盘， 这样可以有效减少读取时间， 增加运行效率
const MemoryFs = require('memory-fs');
const fs = require('fs');
const webpack = require('webpack');
const path = require('path');
const vm = require("vm");
const axios = require('axios');
const serverConfig = require('../../build/webpack.server.conf.js');
const serverRender = require('./server-render')

const mfs = new MemoryFs();

const serverCompiler = webpack(serverConfig);
// 将编译文件输出到内存中
serverCompiler.outputFileSystem = mfs;

// 生成一个可以运行js代码的沙箱
const NativeModule = require('module'); 

// dev server的时候是没有html页面的，所以使用axios去dev client下获取

const getTemplateFromClient = () => {
		// 此处暂时是死路径，可以写成活的,文件命名由webpack.client.conf决定
    return axios.get('http://localhost:7000/static/server.ejs')
        .then(res => {
            console.log(res.data)
            return res.data
        })
        .catch(err => {
            console.log(err)
        })
}

const getModuleFromString = (bundle, filename) => {
    const m = { exports: {} };
    /*
        wrap方法把执行的js代码进行包装
        function(exports, require, module, filename, __dirname) {
            // 需要执行的代码
            ...bundle
        }
    */
    const wrapper = NativeModule.wrap(bundle);
    // console.log(wrapper);

    // 执行wrap代码
    const script = new vm.Script(wrapper, {
        filename: filename,
        displayErrors: true,
    })

    // 指定在当前上下文环境下执行wrap里面的代码
    const result = script.runInThisContext();
    // 使用m.exports作为调用者执行result代码
    // 这里的require的是当前环境的node_modules, 所以可以解决存在多个mobx实例的问题
    result.call(m.exports, m.exports, require, m);

    // 最后把m，即m.exports里面的东西赋值在m对象上
    return m;

}

const Module = module.constructor;

// 记录， 监听webpack打包出来的文件
let serverBundle, bundle;

serverCompiler.watch({}, (err, status) => {
    if(err) throw err;
    status = status.toJson();
    status.errors.forEach(err => console.log(err));
    status.warnings.forEach(warn => console.log(warn));

    const bundlePath = path.join(
        serverConfig.output.path,
        serverConfig.output.filename
    )

    // 读取文件内容
    bundle = mfs.readFileSync(bundlePath, 'utf-8');

    // 将读取出来的字符串转化成js可以及解析的格式
    const m = getModuleFromString(bundle, 'server-entry.js');
    serverBundle = m.exports;

    console.log('正在重新打包中....')
})

const handleSSR = async (ctx) => {
    // console.log(bundle)
    if(!bundle) {
        ctx.body = "node正在编译中， 请稍候";
        return;
    }

    // 读取客户端的模版文件
    let template = await getTemplateFromClient();
   //     ctx.body = template;
    // .then(template => {
 
    // });
    console.log(template)
    await serverRender(ctx, serverBundle, template)

}


const router = require('koa-router')();

router.get('*', handleSSR)

module.exports = router
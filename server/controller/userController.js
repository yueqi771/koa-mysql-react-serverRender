const userModel = require('../mysql/index.js');

// 查询user
exports.test = async (ctx) => {
    console.log(ctx.request)
    await userModel.findUser(0)
        .then(result => {
            let res = result;
            ctx.body = res;
        })
}
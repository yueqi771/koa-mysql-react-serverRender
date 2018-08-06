const userModel = require('../mysql/index.js');
// const monent = require('monent');
const checkLogin = require('../middlewares/check.js').isLogout;

// 保存编辑的文章
exports.save = async ctx => {
    // await isLogout(ctx);
    console.log('session======>')
    console.log(ctx.request.body)
    let { title, thumb, description, type, uid, content, addtime } = ctx.request.body,
        author = "越祈";
        // ctx.session.user

    await userModel.inserArticle([thumb, title, description, parseInt(type), author, content, addtime, uid])
        .then(() => {
            ctx.body = {
                code: 1,
                message: '发表文章成功'
            }
        }).catch((err) => {
            console.log(err)
            ctx.body = {
                code: 0,
                message: "发表文章失败， 请稍后再试"
            }
            
        })
}
const userModel = require('../mysql/index.js');
const monent = require('monent');
const checkLogin = require('../maddlewares/check.js').isLogout;

// 保存编辑的文章
exports.save = async ctx => {
    // await isLogout(ctx);

    let { title, thumb, description, type, uid, author, content, addtime } = ctx.request.body,
        author = ctx.session.user;

        // thumb=?, title=?, description=?, type=?,  content=?, clicks=0, addtime=?";
    await userModel.inserArticle([thumb, title, description, type, content, addtime, author, uid])
        .then(() => {
            ctx.body = {
                code: 1,
                message: '发表文章成功'
            }
        }).catch(() => {
            code: 0,
            message: "发表文章失败， 请稍后再试"
        })
}
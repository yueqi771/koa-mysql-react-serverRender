const userModel = require('../mysql/index.js');
// const moment = require('moment');
const checkLogin = require('../middlewares/check.js').isLogout;

// 保存编辑的文章
exports.save = async ctx => {
    // await isLogout(ctx);
    let { id, title, thumb, description, type, uid, content, addtime } = ctx.request.body,
        author = "越祈";
  
	// 非空验证
	if(!title || !addtime || !type) {
		ctx.body = {
			code: 0,
			message: "请填写文章信息"
		}
    }
    // 如果存在，那么更新数据库中的文章
    if(id) {
        await userModel.updateArticle([title, description, parseInt(type), author, content, parseInt(addtime/1000), id])
            .then(() => {
                ctx.body = {
                    code: 1, 
                    message: "更新文章成功"
                }
            }).catch(err => {
                console.log(err);
                ctx.body = {
                    code: 0,
                    message: "更新文章失败， 请稍后再试"
                }
            })

        return
    }

    // 如果不存在文章id, 那么插入数据库中的文章
    await userModel.inserArticle([thumb, title, description, parseInt(type), author, content, parseInt(addtime/1000), uid])
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

// 返回文章内容
exports.getArticleContent = async ctx => {
    let { id } = ctx.request.body;

    // 根据标题查找文章
    await userModel.findArticle(id)
        .then(res => {
            if(res.length > 0){
                ctx.body={
                    code: 1,
                    data: {
                        ...res[0]
                    } 
                }
            }else{
                ctx.body={
                    code: 0,
                    data: {

                    }
                }
            }
        })
}

// 返回文章所有类型
exports.getArticleType = async ctx => {
    ctx.body = {
        code: 1,
        type: [
            { type: 'javaScript设计模式', id: 1 },
            { type: 'mysql', id: 2 },
            { type: 'node', id: 3 },
            { type: 'vue', id: 4 },
            { type: 'react', id: 5 },
            { type: 'HTTP', id: 6 },
        ]
    }
}

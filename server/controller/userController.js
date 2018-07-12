const utility = require('utility');
const userModel = require('../mysql/index.js');

// 密码加密算法
function screct(password) {
    const salt = "yueqi_is_three_44564@sdf#$%#$%@#$~";
    return utility.md5(utility.md5(password + salt));
}

// 注册用户
exports.register = async ctx => {
    console.log(ctx.request.body);
    let { mobile, code, nickName, wechat, password, repassword } = ctx.request.body;

    await userModel.findUser(mobile)
        .then(async res => {
            if(res.length != 0) {
                try {
                    throw Error('用户已存在');
                } catch (error) {
                    console.log(error);
                }

                // 返回用户已存在信息
                ctx.body = {
                    code: 0,
                    message: "用户已存在"
                }

                return;
            }
            
            // 验证信息
            if(mobile != "" || nickName != "" || wechat != "" || password != "" ){
                // let _sql = "insert into user set name=?, mobile=?, password=?, timezone=?, wechat=?, description=?; "

                await userModel.insertUser([nickName, mobile, screct(password), "", wechat, ""])
                    .then(res => {
                        // 注册成功， 返回信息
                        ctx.body = {
                            code: 1,
                            message: "注册成功"
                        }
                    })
            }
        })

    
}
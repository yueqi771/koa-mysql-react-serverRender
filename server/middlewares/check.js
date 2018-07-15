module.exports = {
    // 验证是否登陆
    isLogin: (ctx) => {
        if(ctx.session && ctx.session.user) {
            ctx.redirect('/index');
            return false;
        }

        return true
    },

    // 未登录
    isLogout: (ctx) => {
        if(!ctx.session || !ctx.session.user) {
            ctx.redirect('/login');
            return false;
        }

        return true;
    }
}
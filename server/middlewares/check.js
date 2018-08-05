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
        console.log(ctx.session)
        console.log( '传入的id是否和session的id相同' + ':' +   ctx.session.id != ctx.require.body.uid)
        if((!ctx.session || !ctx.session.user) || ctx.session.id != ctx.require.body.uid ) {
            ctx.redirect('/login');
            return false;
        }

        return true;
    }
}
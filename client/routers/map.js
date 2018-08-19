import React from 'react';
import Component from '@utils/component';



const RouteMap = [
    {
        path: '/index',
        component: Component.Async(() =>
            import ('@pages/Index/index')),
        exact: 'true'
    },

    {
        path: '/login',
        component: Component.Async(() =>
            import ('@pages/User/login')),
        exact: 'true'
    },

    {
        path: '/register',
        component: Component.Async(() =>
            import ('@pages/User/register')),
        exact: 'true'
    },

    // 文章列表页面
    {
        path: '/list',
        component: Component.Async(() =>
            import ('@pages/article/list')),
        exact: 'true'
    },

    // 编辑文章页面
    {
        path: '/edit/:id',
        component: Component.Async(() =>
            import ('@pages/Article/edit')),
        exact: 'true'
    },

    {
        path: '/edit',
        component: Component.Async(() =>
            import ('@pages/Article/edit')),
    },


    // 文章详情页面
    {
        path: '/detail/:id',
        component: Component.Async(() =>
            import ('@pages/Article/detail')),
        exact: 'true'
    },
    

]

export default RouteMap;

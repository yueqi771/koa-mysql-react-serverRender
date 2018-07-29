import React from 'react';
import Component from '@utils/component';
import Index from '@pages/Index/index'
import Login from '@pages/User/login'
import Register from '@pages/User/register'
import EditArticle from '@pages/Article/edit'



const RouteMap = [
    {
        path: '/index',
        component: Index,
        exact: 'true'
    },

    {
        path: '/login',
        component: Login,
        exact: 'true'
    },

    {
        path: '/register',
        component: Register,
        exact: 'true'
    },

    // 编辑文章页面
    {
        path: '/edit',
        component: EditArticle,
        exact: 'true'
    },
]

export default RouteMap;
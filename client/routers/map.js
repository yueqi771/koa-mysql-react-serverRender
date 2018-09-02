import React from 'react';
import Index from '@pages/Index/index';
import Login from '@pages/User/login';
import Register from '@pages/User/register';
import ArticleList from '@pages/article/list';
import Edit from '@pages/article/edit';
import ArticleDetail from '@pages/Article/detail';
import Component from '@utils/component';



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

    // 文章列表页面
    {
        path: '/list',
        component: ArticleList,
        exact: 'true'
    },

    // 编辑文章页面
    {
        path: '/edit/:id',
        component: Edit,
        exact: 'true'
    },

    {
        path: '/edit',
        component: Edit,
    },


    // 文章详情页面
    {
        path: '/detail/:id',
        component: ArticleDetail,
        exact: 'true'
    },
    

]

export default RouteMap;

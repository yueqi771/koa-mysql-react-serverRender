import React from 'react';
import Component from '@utils/component';
import Index from '@pages/Index/index'
import Login from '@pages/User/login'


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
]

export default RouteMap;
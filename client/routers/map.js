import React from 'react';
import Component from '@utils/component';

const RouteMap = [
    {
        path: '/index',
        component: Component.Async(() =>
            import ('@page/Index/index')),
        exact: 'true'
    },
]

export default RouteMap;
import React from 'react';
import Component from '@utils/component';

const RouteMap = [
    {
        path: '/index',
        component: Component.Async(() =>
            import ('@pages/Index/index')),
        exact: 'true'
    },
]

export default RouteMap;
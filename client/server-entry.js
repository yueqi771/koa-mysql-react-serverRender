import React from 'react';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'mobx-react';
// 接口代理工具
const Proxy = require('http-proxy-middleware')
import { createStoreMap } from './store'
import App from './App.jsx'


export default (store, routerContext, url) => (
    <Provider {...store}>
        <StaticRouter context={routerContext} location={url}>
            <App />
        </StaticRouter>
    </Provider>
)

export { createStoreMap }
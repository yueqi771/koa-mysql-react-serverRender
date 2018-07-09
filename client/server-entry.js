import React from 'react';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'mobx-react';
import { createStoreMap } from './store'
import App from './App.jsx'


export default (store, routerContext, url) => {
    console.log('11111111serverEntry执行')
    console.log('url' + url)
    return (
        <Provider {...store}>
            <StaticRouter context={routerContext} location={url}>
                <App />
            </StaticRouter>
        </Provider>
    )
}

export { createStoreMap }
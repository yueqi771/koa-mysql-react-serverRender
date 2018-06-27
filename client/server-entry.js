import React from 'react';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStoreMap } from './store'
import App from './App.jsx'


export default (store, routerContext, url) => {
    <Provider {...store}>
        <StaticRouter context={routerContext} location={url}>
            <App />
        </StaticRouter>
    </Provider>
}

export const createStore = () => {
    if(process.env.NODE_ENV == 'develop'){
        var middleWare = applyMiddleware(thunk);
        var enhancer = compose(middleWare, window.devToolsExtension && window.devToolsExtension());
        var store = createStore(reducer, enhancer);
    }else{
        var middleWare = applyMiddleware(thunk);
        var store = createStore(reducer, middleWare);
    }
}

export { createStoreMap }
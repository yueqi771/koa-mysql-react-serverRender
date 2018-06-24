import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter, Redirect, Route } from 'react-router-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createHashHistory } from 'history'
import reducer from './reducers'
import AppContainer from './App'

/* 初始化redux store */
if(process.env.NODE_ENV == 'develop'){
    var middleWare = applyMiddleware(thunk);
    var enhancer = compose(middleWare, window.devToolsExtension && window.devToolsExtension());
    var store = createStore(reducer, enhancer);
}else{
    var middleWare = applyMiddleware(thunk);
    var store = createStore(reducer, middleWare);
}


const render = Component => {
    ReactDom.render(
        <Provider store={store}>
            <BrowserRouter redirect={createHashHistory()}>
                <div style={{height:'100%'}}>
                    <Route path="/" render={() => <Redirect to="/index" />} exact />
                    <Component />
                </div>
            </BrowserRouter>
        </Provider>,
        document.getElementById('root')
    )
}

render(AppContainer)
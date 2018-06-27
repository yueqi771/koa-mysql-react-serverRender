import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter, Redirect, Route } from 'react-router-dom';
import { Provider } from 'mobx-react';
import { store } from './store'
import { createHashHistory } from 'history'
import AppContainer from './App'

/* 初始化redux store */

const initialState = window.__INITIAL__STATE__ || {}

const render = Component => {
    ReactDom.render(
        <Provider state={store}>
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
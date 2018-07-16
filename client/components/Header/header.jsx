import React, { Component } from 'react';
import PropTypes from 'prop-types';

import "./header.less"

class Header extends Component {
    constructor(props, context) {
        super(props, context)
    }

    render() {
        const { router } = this.context
        return (
            // style={{backgroundImage: 'url(http://localhost:3000/images/big.jpg)'}}
            <div className="header-wrapper">
                <div className="header">
                    <img src="http://localhost:3000/images/logo.png" alt=""/>

                    <div className="header-list">
                        <p className="header-list-item" onClick={e => {router.history.push('/index')}}>首页</p>
                        <p className="header-list-item" onClick={e => {router.history.push('/index')}}>技术杂谈</p>
                        <p className="header-list-item" onClick={e => {router.history.push('/index')}}>关于自己</p>
                        <p className="header-list-item" onClick={e => {router.history.push('/index')}}>时间轴</p>
                        <p className="header-list-item" onClick={e => {router.history.push('/login')}}>登陆</p>
                        <p className="header-list-item" onClick={e => {router.history.push('/register')}}>注册</p>
                    </div>
                </div>
            </div>
        )
    }
}

Header.contextTypes = {
    router: PropTypes.object.isRequired
}

export default Header;
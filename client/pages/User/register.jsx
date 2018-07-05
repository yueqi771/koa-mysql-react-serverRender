import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { Input, Icon } from 'antd';

import { Button } from '@components/Button/button';
import './register.less'

class Register extends Component {
    render() {
        console.log('123123')
        return (
            <div className="register">
                 {/* 页面的title和meta */}
                 <Helmet>
                    <title>祈风-注册</title>
                </Helmet>

                <div className="register-container">
                    <p className="title">登录</p>

                    <Input placeholder="Enter your mobile"
                        className="user-input"
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    />

                    <Input placeholder="Enter your password"
                        type="password"
                        className="user-input"
                        prefix={<Icon type="unlock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    />

                    <Button text="登录" loading={false} handleClick={this.handleClick} />
                </div>

                {/* 注册页面背景 */}
                <div className="shadow" style={{ backgroundImage: 'url(http://localhost:3000/images/bk6.jpg)' }}></div>
                <div className="shadow-bk"></div>

            </div>
        )
    }
} 

export default Register;
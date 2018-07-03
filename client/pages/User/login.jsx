import React, { Component } from 'react';
import { Input, Icon } from 'antd';

import Button from '@components/Button/button';
import './login.less';

class Login extends Component {
    constructor() {
        super(...arguments)
    }

    componentDidMount() {
     
    }
    // 
    render() {
        return (
            <div className="login" >

                <div className="shadow" style={{ backgroundImage: 'url(http://localhost:3000/images/bk6.jpg)' }}></div>
                <div className="shadow-bk"></div>


                <div className="login-container">
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

                    <Button text="登录" loading={false} />
                </div>

            </div>
        )
    }
}

export default Login
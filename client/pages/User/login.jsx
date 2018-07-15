import React, { Component } from 'react';
import { Input, Icon, Checkbox, message } from 'antd';
import PropTypes from 'prop-types'

import { Button } from '@components/Button/button';
import regexp from '@utils/regexp';
import http from '@utils/http';
import './login.less';

class Login extends Component {
    constructor() {
        super(...arguments);

        this.state = {
            mobile: "",
            password: "",
        }

        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
     
    }

    // 确认登录
    handleClick() {
        const { mobile, password } = this.state;
        if(!regexp.mobile.test(mobile)){ message.error("请输入正确的手机号") }
        if(password.trim().length < 6){ message.error("请输入正确的密码") }

        http.post({
            url: "/login",
            data: {
                mobile: mobile,
                password: password,
            }
        }).then(res => {
            if(res.code == 1){
                message.success("登陆成功")
                this.context.router.history.push("/index")
            }else{
                message.error(res.message)
            }
        })

    }

    // 
    render() {
        const { mobile, password } = this.state;
        return (
            <div className="login" >

                <div className="shadow" style={{ backgroundImage: 'url(http://localhost:3000/images/bk6.jpg)' }}></div>
                <div className="shadow-bk"></div>

                <div className="login-container">
                    <p className="title">登录</p>

                    <Input placeholder="Enter your mobile"
                        className="user-input"
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        onChange={e => {this.setState({mobile: e.target.value})}}
                    />

                    <Input placeholder="Enter your password"
                        type="password"
                        className="user-input"
                        prefix={<Icon type="unlock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        onChange={e => {this.setState({password: e.target.value})}}
                    />
                    <div className="remember">
                        <Checkbox >记住我</Checkbox>
                    </div>
                    <Button text="登录" loading={false} handleClick={this.handleClick} />

                    {/* 注册页面接口 */}
                    <p className="link">没有账号？ <span onClick={e => {this.context.router.history.push('/register')}}>去注册</span></p>
                </div>

            </div>
        )
    }
}

Login.contextTypes = {
    router: PropTypes.object.isRequired
}

export default Login
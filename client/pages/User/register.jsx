import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { Redirect } from 'react-router-dom';
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, AutoComplete } from 'antd';

import { Button } from '@components/Button/button';
// import Link from '@components/Link/link'
import regexp from '@utils/regexp';
import './register.less';

const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;

class Register extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        if (_.isEqual(this.props, nextProps) && _.isEqual(this.state, nextState)) {
            return false
        }
        return true
    }

    constructor(props, context) {
        super(props, context);

        this.state = {
            // 手机号
            mobile: "",
            allowMobile: true,

            // 验证码
            code: "",
            allowCode: true,

            // 昵称
            nickName: "",
            allowName: true,

            // 微信
            wechat: "",
            allowWechat: true,

            // 密码
            password: "",
            allowPassword: true,

            // 确认密码
            repassword: "",
            allowRepassword: true,

            // 重新向路由
            redirectTo: ""
        }

        console.log(this.context)

    }

    componentDidMount() {
    }

    // 验证手机号
    vertifyMobile = (e) => {
        const mobileText = e.target ? e.target.value : this.state.mobile;

        if(!regexp.mobile.test(mobileText)){
            this.setState({
                allowMobile: false,
                mobile: mobileText
            })

            return false
        }

        this.setState({
            allowMobile: true,
            mobile: mobileText
        })
        
        return true;
    }

    // 验证非空函数
    vertifyEmpty = (e, key, tipKey ) => {
        const text = e ? e.target.value : this.state[key];
        
        if(text == ""){
            this.setState({
                [tipKey]: false
            }, () => {})

            return false;
        }

        this.setState({
            [tipKey]: true,
            [key]: text
        })

        return true;
    }

    // 验证密码是否输入正确
    vertifyPassword = (e) => {
        const passwordText = e.target ? e.target.value : this.state.password;
        console.log(passwordText.trim().legnth)
        if(passwordText.trim().length < 6){
            this.setState({
                password: passwordText,
                allowPassword: false
            });
            return false;
        }

        this.setState({
            password: passwordText,
            allowPassword: true
        });

        return true;
    }

    // 验证密码是否输入一致
    vertifyRepassword = (e) => {
        const rePasswordText = e.target ? e.target.value : this.state.repassword;

        if(rePasswordText != this.state.password){
            this.setState({
                repassword: rePasswordText,
                allowRepassword: false
            });

            return false;
        }

        this.setState({
            repassword: rePasswordText,
            allowRepassword: true
        });

        return true;
    }

    // 确定注册
    confirmRegister = (e) => {
        const { mobile, code, nickName, wechat, password, repassword } = this.state;
        if(this.vertifyMobile(mobile) && this.vertifyEmpty(null, 'code', 'allowCode') && this.vertifyEmpty(null, 'nickName', 'allowName') 
           && this.vertifyEmpty(null, 'wechat', 'allowWechat') && this.vertifyPassword(password) 
           && this.vertifyRepassword(repassword) ) {

            // 发送接口
            alert('注册成功')
        }
    }


    render() {
        const { getFieldDecorator } = this.props.form;
        const { allowMobile, allowCode, allowName,allowWechat,allowPassword, allowRepassword } = this.state;

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };

        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: '86',
        })(
            <Select style={{ width: 70 }}>
                <Option value="86">+86</Option>
            </Select>
        );

        

        return (
            <div className="register">
                {/* 页面的title和meta */}
                <Helmet>
                    <title>祈风-注册</title>
                </Helmet>

                 {/* 注册页面背景 */}
                 <div className="shadow" style={{ backgroundImage: 'url(http://localhost:3000/images/bk.jpg)' }}></div>
                {/* <div className="shadow-bk"></div> */}

                <div className="register-container">
                    <p className="title">欢迎注册</p>

                    <Form onSubmit={this.handleSubmit}>
                        {/* 手机号 */}
                        <FormItem {...formItemLayout} label="手机" >
                            <Input  addonBefore={prefixSelector} style={{ width: '100%' }}  placeholder="Enter your mobile" onChange={e => this.vertifyMobile(e)}/>

                            {
                                !allowMobile ? <p className="error-tip">请输入正确的手机号</p> : null
                            }
                            
                        </FormItem>

                        {/* 验证码 */}
                        <FormItem
                            {...formItemLayout}
                            label="验证码"
                            className="code-wrapper"
                            extra="We must make sure that your are a human."
                        >
                            <Row gutter={4}>
                                <Col span={12}>
                                    <Input  placeholder="Enter your code" onChange={e => {this.vertifyEmpty(e, 'allowCode', 'code')}} />
                                </Col>
                                <Col span={10}>
                                    <Button className="get-code" text="获取验证码" loading={false} />
                                </Col>
                            </Row>
                            
                            {
                                !allowCode ? <p className="error-tip" style={{'bottom': "-42px"}}>请输入验证码</p> : null
                            }
                            
                        </FormItem>

                        {/* 昵称 */}
                        <FormItem
                            {...formItemLayout}
                            label={(
                                <span>
                                    昵称&nbsp;
                                    <Tooltip title="What do you want others to call you?">
                                        <Icon type="question-circle-o" />
                                    </Tooltip>
                                </span>
                            )}
                        >
                            <Input placeholder="Enter your nickName" onChange={e => {this.vertifyEmpty(e, 'allowName', 'nickName')}} />
                            {
                                !allowName ? <p className="error-tip">请输入您的昵称</p> : null
                            }
                        </FormItem>

                        {/* 请输入微信 */}
                        <FormItem {...formItemLayout} label="微信" >
                            <Input type="password"  placeholder="Enter your wechat" onChange={e => {this.vertifyEmpty(e, 'allowWechat', 'wechat')}}  />
                            
                            {
                                !allowWechat ? <p className="error-tip">请输入您的微信，方便发送奖励</p> : null
                            }
                            
                        </FormItem>

                        {/* 请输入密码 */}
                        <FormItem {...formItemLayout} label="密码" >
                            <Input type="password"  placeholder="Enter your password"  onChange={e => this.vertifyPassword(e)} />
                            {
                                !allowPassword ? <p className="error-tip">请输入至少6位数的密码</p> : null
                            }
                        </FormItem>

                        {/* 确认输入密码 */}
                        <FormItem {...formItemLayout} label="确认密码">
                            <Input type="password"  placeholder="Confirm your password"  onChange={e => this.vertifyRepassword(e)} />
                            {
                                !allowRepassword ? <p className="error-tip">两次密码不一致</p> : null
                            }
                        </FormItem>

                        <FormItem className="submit-wrapper">
                            <p className="user-tip">
                                已有账号? 
                                <a href="/login">去登录</a>
                            </p>
                            <Button text="注册" loading={false} handleClick={this.confirmRegister} />
                        </FormItem>
                    </Form>


                </div>

               

            </div>
        )
    }
}
const RegisterForm = Form.create()(Register);
export default RegisterForm;
import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, AutoComplete } from 'antd';

import { Button } from '@components/Button/button';
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

    constructor() {
        super(...arguments);

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
            allowRepassword: true
        }

    }

    componentDidMount() {
        console.log(this.state['allowCode'])
    }

    // 验证手机号
    vertifyMobile = (e) => {
        const mobileText = e.target ? e.target.value : "";

        this.setState({
            allowMobile: true,
            mobile: mobileText
        })

        if(!regexp.test(this.state.mobile)){
            this.setState({
                allowMobile: false,
                mobile: mobileText
            })

            return false
        }
        
        return true;
    }

    // 验证非空函数
    vertifyEmpty = (e, tipKey, key) => {
        const text = e.target ? e.target.value : "";

        this.setState({
            [tipKey]: true,
            [key]: text
        })

        if(this.state[key] == ""){
            this.setState({
                [tipKey]: false
            })

            return false;
        }

        return true;
    }




    render() {
        const { getFieldDecorator } = this.props.form;
        const { mobile, allowMobile, code, allowCode, nickName, allowName, wechat, allowWechat, password, allowPassword, repassword, allowRepassword } = this.state;

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
                            <Input addonBefore={prefixSelector} style={{ width: '100%' }}  placeholder="Enter your mobile" onChange={e => this.vertifyMobile(e)}/>

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
                                !allowCode ? <p className="error-tip" style={{'bottom': "-42px"}}>请输入正确的手机号</p> : null
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
                            <Input placeholder="Enter your nickName" />
                            {
                                !allowName ? <p className="error-tip">请输入您的姓名</p> : null
                            }
                        </FormItem>

                        {/* 请输入微信 */}
                        <FormItem {...formItemLayout} label="微信" >
                            <Input type="password"  placeholder="Enter your wechat" />
                            
                            {
                                !allowWechat ? <p className="error-tip">请输入您的微信，方便发送奖励</p> : null
                            }
                            
                        </FormItem>

                        {/* 请输入密码 */}
                        <FormItem {...formItemLayout} label="密码" >
                            <Input type="password"  placeholder="Enter your password" />
                            {
                                !allowPassword ? <p className="error-tip">请输入密码</p> : null
                            }
                        </FormItem>

                        {/* 确认输入密码 */}
                        <FormItem {...formItemLayout} label="确认密码">
                            <Input type="password"  placeholder="Confirm your password"/>
                            {
                                !allowRepassword ? <p className="error-tip">请再次输入密码</p> : null
                            }
                        </FormItem>

                        <FormItem className="submit-wrapper">
                            <p className="user-tip">
                                已有账号? 
                                <span onClick={ e => { alert(1); return((<Redirect to="/login" /> ))}} >去登录</span>
                            </p>
                            <Button text="注册" loading={false} handleClick={e=>console.log(this.props.form.getFieldsValue())} />
                        </FormItem>
                    </Form>


                </div>

               

            </div>
        )
    }
}
const RegisterForm = Form.create()(Register);
export default RegisterForm;
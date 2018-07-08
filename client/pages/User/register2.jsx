import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, AutoComplete } from 'antd';

import { Button } from '@components/Button/button';
import './register.less'

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
            confirmDirty: false,
            autoCompleteResult: [],

            // 手机号
            mobile: ""
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleConfirmBlur = this.handleConfirmBlur.bind(this);
        this.compareToFirstPassword = this.compareToFirstPassword.bind(this);
        this.validateToNextPassword = this.validateToNextPassword.bind(this);

    }

    handleConfirmBlur = (e) => {
        const value = e.target.value;
        console.log(value)
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }

    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        console.log(form.getFieldValue('password'))
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    }

    validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
          }
        });
    }

    onFieldsChange(props, changedFields) {
        console.log(changedFields)
        props.onChange(changedFields);
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { autoCompleteResult, mobile } = this.state;
        console.log(getFieldDecorator)

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };

        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
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
                    <p className="title">注册</p>

                        {/* 手机号 */}
                        <div className="input-wrapper">
                            <Input 
                                prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />} 
                                addonBefore={prefixSelector} 
                                placeholder="Enter your mobile" />
                        </div>

                        {/* 验证码 */}
                        <Row gutter={4} className="input-wrapper code-wrapper">
                            <Col span={12}>
                                <Input prefix={<Icon type="message" />} placeholder="Enter your code" />
                            </Col>
                            <Col span={10}>
                                <Button className="get-code" text="获取验证码" loading={false} />
                            </Col>
                        </Row>

                        {/* 请输入密码 */}
                        <div className="input-wrapper">
                            <Input 
                                type="password" 
                                prefix={<Icon type="unlock" style={{ color: 'rgba(0,0,0,.25)' }} />} 
                                placeholder="Enter your password" />
                        </div>

                        {/* 确认输入密码 */}
                        <div className="input-wrapper">
                            <Input 
                                type="password"  
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} 
                                placeholder="Confirm your password"/>
                        </div>
                        
                        <div className="input-wrapper">
                            <Input 
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} 
                                placeholder="Confirm your nickName" />
                        </div>
                        
                        {/* 微信 */}
                        {/* <FormItem {...formItemLayout} label="微信" >
                            {getFieldDecorator('wechat', {
                                rules: [{
                                    required: true, message: 'Please input your password!',
                                }, {
                                    validator: this.validateToNextPassword,
                                }],
                            })(
                                <Input type="password" />
                            )}
                        </FormItem> */}
                        
                        <Button text="登录" loading={false} handleClick={e=>console.log(this.props.form.getFieldsValue())} />


                </div>

               

            </div>
        )
    }
}
const RegisterForm = Form.create()(Register);
export default RegisterForm;
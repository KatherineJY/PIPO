import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox, Radio } from 'antd';

import dataAccess from '../../model/dataAccess'
import storage from '../../model/storage'

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginError: false,
            errorMsg: "wrong pwd or wrong username",
            loginInfo: this.props.loginInfo
        };
    }


    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('received values of form: ', values);
                dataAccess.postData('/login', values, (response) => {
                    console.log("login", response);
                    if (response.data===1) {
                        let tempData = this.state.loginInfo;
                        tempData.isLogin = true;
                        tempData.firstName = values.firstName;
                        tempData.lastName = values.lastName;
                        tempData.email = values.email;
                        tempData.isInvester = values.userType === 0 ? 0 : 1;
                        tempData.isIssuer = values.userType === 1 ? 0 : 1;
                        storage.set('loginInfo',tempData);
                        this.props.setLoginInfo(tempData);
                        this.props.closeLogin();
                    }
                    else {
                        this.setState({
                            loginError: true
                        })
                    }
                });
            }
        })
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const fromItemLayout = {
            labelCol: { span: 8 },
            wrapperCol: { sapn: 8 }
        }
        return (
            <div >
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <FormItem {...fromItemLayout} label="Log in as an">
                        {
                            getFieldDecorator('userType', {
                                rules: [{ required: true, message: 'Please select your user type!' },],
                            })(
                                <RadioGroup>
                                    <Radio value='0'>Investor</Radio>
                                    <Radio value='1'>Issuer</Radio>
                                </RadioGroup>
                            )
                        }
                    </FormItem>
                    <FormItem>
                        {
                            getFieldDecorator('email', {
                                rules: [{ type: 'email', required: true, message: 'Please input your email!' },],
                            })(
                                <Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25' }} />} placeholder="Email" />
                            )
                        }
                    </FormItem>
                    <FormItem>
                        {
                            getFieldDecorator('password', {
                                rules: [{ required: true, message: 'Please input your Password!' }, {
                                    validater: this.getPwd
                                }],
                            })(
                                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25' }} />} type="password" placeholder="Password" />
                            )
                        }
                    </FormItem>
                    <FormItem>
                        {
                            getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: true,
                            })(
                                <Checkbox>Remember me</Checkbox>
                            )
                        }
                        <a className="login-form-forgot" href="">Forgot password</a>
                        <Button type="primary" size="large" htmlType="submit" className="login-form-button">Log in</Button>
                        Or <a href="">Register now!</a>
                        {
                            this.state.loginError && (<p style={{ color: 'red' }}><Icon type="warning" theme="outlined" />{this.state.errorMsg}</p>)
                        }

                    </FormItem>
                </Form>
            </div>
        );

    }
}

const WrappedLoginForm = Form.create()(LoginForm);

export default WrappedLoginForm;
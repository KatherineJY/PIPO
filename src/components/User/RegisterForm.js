import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox, Radio } from 'antd';

const FormItem = Form.Item;

class RegisterForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inforError: false,
            errorMsg: "wrong pwd or wrong username",
            userInfo: this.props.userInfo
        };
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('received values of form: ', values);
                console.log(this.state.userInfo);
                this.props.next();
            }
            else {
                console.log(err);
            }
        })

    }

    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        }
        else {
            let tempData = this.state.userInfo;
            tempData.password = value;
            this.setState({
                userInfo: tempData
            })
            callback();
        }
    }

    getLastName = (rule, value, callback) => {
        console.log(value);
        let tempData = this.state.userInfo;
        tempData.lastName = value;
        this.setState({
            userInfo: tempData
        })
        console.log("last name", this.state.userInfo);
        callback();
    }

    getFirstName = (rule, value, callback) => {
        console.log(value);
        let tempData = this.state.userInfo;
        tempData.firstName = value;
        this.setState({
            userInfo: tempData
        })
        console.log("last name", this.state.userInfo);
        callback();
    }

    getEmail = (rule, value, callback) => {
        console.log(value);
        let tempData = this.state.userInfo;
        tempData.email = value;
        this.setState({
            userInfo: tempData
        })
        console.log("email", this.state.userInfo);
        callback();
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelcol: {
                xs: { span: 24 },
                sm: { span: 8 }
            },
            wrappercol: {
                xs: { span: 24 },
                sm: { span: 16 }
            }
        }
        return (
            <div className="register-info-container">
                <Form onSubmit={this.handleSubmit} className="register-form">
                    <FormItem
                        {...formItemLayout}
                        label="Last Name">
                        {
                            getFieldDecorator('lastName', {
                                rules: [{ required: true, message: 'Please input your last name!' },
                                {
                                    validator: this.getLastName
                                }],
                            })(
                                <Input value={this.state.userInfo.lastName} />
                            )
                        }
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="First Name">
                        {
                            getFieldDecorator('firstName', {
                                rules: [{ required: true, message: 'Please input your first name!' },
                                {
                                    validator: this.getFirstName
                                }],
                            })(
                                <Input />
                            )
                        }
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="Email">
                        {
                            getFieldDecorator('email', {
                                rules: [{ type:'email', required: true, message: 'Please input your email!' },
                                {
                                    validator: this.getEmail
                                }],
                            })(
                                <Input />
                            )
                        }
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="Password">
                        {
                            getFieldDecorator('password', {
                                rules: [{ required: true, message: 'Please input your Password!' }, {
                                    validator: this.validateToNextPassword,
                                }],
                            })(
                                <Input type="password" placeholder="At least 8 characters" />
                            )
                        }
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="Comfirm Password">
                        {
                            getFieldDecorator('password2', {
                                rules: [{ required: true, message: 'Please input your Password agin!' }, {
                                    validator: this.compareToFirstPassword
                                }],
                            })(
                                <Input type="password" placeholder="Input your password again" />
                            )
                        }
                    </FormItem>
                    <FormItem>
                        <Button className="register-form-button" type="primary" htmlType="submit">Continue</Button>
                    </FormItem>
                </Form>
            </div>
        );
    }
}

const WrappedRegisterForm = Form.create({
    // onFieldsChange(props,changedFields) {
    //     props.onChange(changedFields);
    // },
    // mapPropsToFields(props) {
    //     return {
    //         firstName: Form.createFormField({
    //             ...props.firstName,
    //             value: props.firstName.value,
    //         }),
    //     }
    // },
    // onValuesChange(_,values) {
    //     console.log(values);
    // }
}

)(RegisterForm);

export default WrappedRegisterForm;
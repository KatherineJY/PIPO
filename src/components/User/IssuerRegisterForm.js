import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox, Radio, DatePicker, Select } from 'antd';

import selectOptions from './selectOptions'

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;


class IssuerRegisterForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
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

    getGender = (rule, value, callback) => {
        console.log(value);
        let tempData = this.state.userInfo;
        tempData.gender = value;
        this.setState({
            userInfo: tempData
        })
        console.log("gender", this.state.userInfo);
        callback();
    }

    getBirthday = (rule, value, callback) => {
        console.log(value);
        let tempData = this.state.userInfo;
        tempData.birthday = value.format('YYYY-MM-DD');
        this.setState({
            userInfo: tempData
        })
        console.log("birthday", this.state.userInfo);
        callback();
    }

    getMarital = (rule, value, callback) => {
        console.log(value);
        let tempData = this.state.userInfo;
        tempData.marital = value;
        this.setState({
            userInfo: tempData
        })
        console.log("marital", this.state.userInfo);
        callback();
    }

    getIncome = (rule, value, callback) => {
        console.log(value);
        let tempData = this.state.userInfo;
        tempData.income = value;
        this.setState({
            userInfo: tempData
        })
        console.log("income", this.state.userInfo);
        callback();
    }

    getOccupation = (rule, value, callback) => {
        console.log(value);
        let tempData = this.state.userInfo;
        tempData.occupation = value;
        this.setState({
            userInfo: tempData
        })
        console.log("occupation", this.state.userInfo);
        callback();
    }

    getKids = (rule, value, callback) => {
        console.log(value);
        let tempData = this.state.userInfo;
        tempData.kids = value;
        this.setState({
            userInfo: tempData
        })
        console.log("kids", this.state.userInfo);
        callback();
    }

    getHouse = (rule, value, callback) => {
        console.log(value);
        let tempData = this.state.userInfo;
        tempData.house = value;
        this.setState({
            userInfo: tempData
        })
        console.log("house", this.state.userInfo);
        callback();
    }

    getEducation = (rule, value, callback) => {
        console.log(value);
        let tempData = this.state.userInfo;
        tempData.education = value;
        this.setState({
            userInfo: tempData
        })
        console.log("education", this.state.userInfo);
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
                    <FormItem {...formItemLayout} label="Gender">
                        {
                            getFieldDecorator('gender', {
                                rules: [{ required: true, message: 'Please select your gender!' },
                                {
                                    validator: this.getGender
                                }],
                            })(
                                <RadioGroup>
                                    <Radio value={0}>Male</Radio>
                                    <Radio value={1}>Female</Radio>
                                </RadioGroup>
                            )
                        }
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="Date of Birth">
                        {
                            getFieldDecorator('birthday', {
                                rules: [{ type: 'object', required: true, message: 'Please input your birthday!' },
                                {
                                    validator: this.getBirthday
                                }],
                            })(
                                <DatePicker />
                            )
                        }
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="Marital Status">
                        {
                            getFieldDecorator('marital', {
                                rules: [{ required: true, message: 'Please select your marital status!' },
                                {
                                    validator: this.getMarital
                                }],
                            })(
                                <Select>
                                    {
                                        selectOptions.maritalOptions.map((item,key) => {
                                            return <Option key={key} value={item.title}>{item.title}</Option>
                                        })
                                    }
                                </Select>
                            )
                        }
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="Number of Kids">
                        {
                            getFieldDecorator('kids', {
                                rules: [{ required: true, message: 'Please input the number of your kids!' },
                                {
                                    validator: this.getKids
                                }],
                            })(
                                <Input min={0} max={20} placeholder='1, 2, 3, etc' />
                            )
                        }
                    </FormItem>

                    <FormItem
                        {...formItemLayout}
                        label="House Tenure">
                        {
                            getFieldDecorator('house', {
                                rules: [{ required: true, message: 'Please select your house tenure!' },
                                {
                                    validator: this.getHouse
                                }],
                            })(
                                <Select placeholder='In last 12 months'>
                                    {
                                        selectOptions.houseOptionse.map((item,key) => {
                                            return <Option key={key} value={item.title}>{item.title}</Option>
                                        })
                                    }
                                </Select>
                            )
                        }
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="Education">
                        {
                            getFieldDecorator('education', {
                                rules: [{ required: true, message: 'Please select your education!' },
                                {
                                    validator: this.getEducation
                                }],
                            })(
                                <Select>
                                    {
                                        selectOptions.educationOptions.map((item,key) => {
                                            return <Option key={key} value={item.title}>{item.title}</Option>
                                        })
                                    }
                                </Select>
                            )
                        }
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="Occupation">
                        {
                            getFieldDecorator('occupation', {
                                rules: [{ required: true, message: 'Please select your occupation!' },
                                {
                                    validator: this.getOccupation
                                }],
                            })(
                                <Select>
                                    {
                                        selectOptions.jobOptions.map((item,key) => {
                                            return <Option key={key} value={item.title}>{item.title}</Option>
                                        })
                                    }
                                </Select>
                            )
                        }
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="Income">
                        {
                            getFieldDecorator('income', {
                                rules: [{ required: true, message: 'Please select your income!' },
                                {
                                    validator: this.getIncome
                                }],
                            })(
                                <Select placeholder='In last 12 months'>
                                    {
                                        selectOptions.incomeOptions.map((item) => {
                                            return <Option value={item.title}>{item.title}</Option>
                                        })
                                    }
                                </Select>
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

const WrappedRegisterForm = Form.create({})(IssuerRegisterForm);

export default WrappedRegisterForm;
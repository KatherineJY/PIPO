import React, { Component } from 'react';

import { Steps, Form, Icon, Input, Button, Checkbox, Radio, InputNumber,DatePicker } from 'antd';

import dataAccess from '../../model/dataAccess'

const FormItem = Form.Item;
const { TextArea } = Input;

class IssueForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            purpose:'',
            quantity:0,
            minOfOrder:0,
            marketLot:0,
            term:0,
            hasRecommendedPrice:true,
            hasRecommendedTotal:true,
            recommendedTotal:0,
            recommendedAmount:0,
            recommendedPrice:0,
        }
    }

    componentDidMount = ()=> {
        let sendData = {
            issuer_id:'P100002',
            purpose:'',
            quantity:0,
            minOfOrder:0,
            marketLot:0,
            term:0
        }
        dataAccess.postData('/get_recommended_price',sendData,(response)=>{
            console.log(response);

        });

        sendData = {
            issuer_id:'P1111',
            purpose:'',
            quantity:0,
            minOfOrder:0,
            marketLot:0,
            term:0,
            price:0
        }
        dataAccess.postData('/',sendData,(response)=>{
            console.log(response);

        });
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
            <div className="issue-info-container">
                <Form onSubmit={this.handleSubmit} className="issue-form">
                    <FormItem
                        {...formItemLayout}
                        label="Purpose of PIPO">
                        {
                            getFieldDecorator('purpose', {
                                rules: [{ required: true, message: 'Please input your last name!' },{
                                    
                                }],
                            })(
                                <TextArea value={this.state.purposeOfPipo} autosize={{ minRows: 1 }} />
                            )
                        }
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="xiang yao gu shu">
                        {
                            getFieldDecorator('quantity', {
                                rules: [{ required: true, message: 'Please input your first name!' },{
                                    validater: (rule, value, callback) => {
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
                                    
                                }],
                            })(
                                <InputNumber min={0} />
                            )
                        }
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="minimum order">
                        {
                            getFieldDecorator('minOfOrder', {
                                rules: [{ required: true, message: 'Please input your email!' },],
                            })(
                                <InputNumber min={0} />
                            )
                        }
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="Market Lot">
                        {
                            getFieldDecorator('marketLot', {
                                rules: [{ required: true, message: 'Please input your Password!' },]
                            }
                            )(
                                <InputNumber min={0} />
                            )
                        }
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="Term(year)">
                        {
                            getFieldDecorator('term', {
                                rules: [{ required: true, message: 'Please input your Password agin!' },],
                            })(
                                <InputNumber min={0} placeholder='1, 2, 3, etc' />
                            )
                        }
                    </FormItem>
                    {
                        this.state.hasRecommendedPrice && 
                        (<div className='recommended-container'>
                            {this.state.recommendedAmount}
                            {this.state.recommendedPrice}
                        </div>)
                    }
                    <FormItem
                        {...formItemLayout}
                        label="Wanted price($)">
                        {
                            getFieldDecorator('price', {
                                rules: [{ required: true, message: 'Please input your Password agin!' },],
                            })(
                                <InputNumber min={0} />
                            )
                        }
                    </FormItem>
                    {
                        this.state.hasRecommendedTotal && 
                        (<div className='recommended-container'>
                            {this.state.recommendedTotal}
                        </div>)
                    }
                    <FormItem
                        {...formItemLayout}
                        label="Deadline for bidding">
                        {
                            getFieldDecorator('ddl', {
                                rules: [{ type: 'object', required: true, message: 'Please input your birthday!' },],
                            })(
                                <DatePicker />
                            )
                        }
                    </FormItem>
                    <FormItem>
                        <Button className="register-form-button" type="primary" htmlType="submit" onClick={()=>{
                            this.setState({
                                
                            })
                        }}>ISSUE MY PIPO</Button>
                    </FormItem>
                </Form>
            </div>
        );
    }
}

const WrappedForm = Form.create()(IssueForm);

export default WrappedForm;

import React, { Component } from 'react';

import { Steps, Form, Icon, Input, Button, Checkbox, Radio, InputNumber,DatePicker } from 'antd';

const FormItem = Form.Item;
const { TextArea } = Input;

class BuybackForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
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
                        label="price($)">
                        {
                            getFieldDecorator('price', {
                                rules: [{ required: true, message: 'Please input your Password agin!' },],
                            })(
                                <InputNumber min={0} />
                            )
                        }
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="quantity">
                        {
                            getFieldDecorator('quantity', {
                                rules: [{ required: true, message: 'Please input your Password agin!' },],
                            })(
                                <InputNumber min={0} />
                            )
                        }
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="Buyback Date">
                        {
                            getFieldDecorator('date', {
                                rules: [{ required: true, message: 'Please input your Password agin!' },],
                            })(
                                <DatePicker />
                            )
                        }
                    </FormItem>
                    <FormItem>
                        <Button className="register-form-button" type="primary" htmlType="submit">Buy back</Button>
                    </FormItem>
                </Form>
            </div>
        );
    }
}

const WrappedForm = Form.create()(BuybackForm);

export default WrappedForm;

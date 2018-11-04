import React, { Component } from 'react';

import { Steps, Form, Icon, Input, Button, Checkbox, Radio } from 'antd';

import IssueForm from './IssueForm'
import IssueSubmit from './IssueSubmit'

const Step = Steps.Step;

const steps = [
    {
        title: 'Issue',
        icon: 'user',
        content: ''
    },
    {
        title: 'Done',
        icon: 'check',
        content: ''
    },
]

class IssuePIPO extends Component {

    constructor(props) {
        super(props);
        this.state = {
            current: 0,

        }
    }

    next = () => {
        const current = this.state.current + 1;
        this.setState({
            current: current
        })
    }

    prev = () => {
        const current = this.state.current - 1;
        this.setState({
            current: current
        })
    }

    render() {
        

        return (
            <div className="issue-panel">
                <div className="issue-title">
                    <h1>Join Investus</h1>
                    <p>Open a new account to explore</p>
                </div>
                <Steps current={this.state.current}>
                    {
                        steps.map((item, key) => <Step key={key} title={item.title} icon={<Icon type={item.icon} />} />)
                    }
                </Steps>
                <div className="steps-content">
                    {
                        this.state.current==0&&<IssueForm/>
                    }
                    {
                        this.state.current==1&&<IssueSubmit />
                    }
                </div>
            </div>
        )
    }
}
export default IssuePIPO;
import React, { Component } from 'react';
import { Steps, Button, Icon, Radio } from 'antd';

import RegisterSubmit from './RegisterSubmit'
import RegisterForm from './RegisterForm'
import InvestRegisterForm from './InvestRegisterForm'
import IssuerRegisterForm from './IssuerRegisterForm'

import "../../assets/css/register.css"

const Step = Steps.Step;
const RadioGroup = Radio.Group;

const steps = [
    {
        title: 'role',
        icon: 'setting',
    },
    {
        title: 'Information',
        icon: 'user',
        content: ''
    },
    {
        title: 'Verification',
        icon: 'solution',
        content: ''
    },
    {
        title: 'Done',
        icon: 'check',
        content: ''
    },
]

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 0,
            userType: this.props.location.query ? this.props.location.query.userType : 0,
            userInfo: {

            },
            loginInfo: this.props.loginInfo

        }
    }

    componentDidMount = () => {
        // console.log('from register.js', this.props.loginInfo);
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

    radioOnChange = (e) => {
        this.setState({
            userType: e.target.value
        })
    }

    showContent = (key) => {
        this.setState({
            current: key
        })
    }

    render() {
        const radioStyle = {
            height: '30px',
            lineHeight: '30px',
            fontSize: '18px',
        }

        return (
            <div className="component-holder">
                <div className="register-panel">
                    <div className="register-title">
                        <h1>Join Investus</h1>
                        <p>Open a new account to explore</p>
                    </div>
                    <Steps current={this.state.current}>
                        {
                            steps.map((item, key) => <Step onClick={this.showContent.bind(this, key)} key={key} title={item.title} icon={<Icon type={item.icon} />} />)
                        }
                    </Steps>
                    <div className="steps-content">
                        {
                            this.state.current == 0
                            && (<div className="radio-holder">
                                <div className="radio-label">Choose to be an</div>
                                <RadioGroup defaultValue={this.state.userType} onChange={this.radioOnChange} size="large">
                                    <Radio style={radioStyle} value={0}>Investor</Radio>
                                    <Radio style={radioStyle} value={1}>Issuer</Radio>
                                </RadioGroup>
                                <div className='roleDescription'>
                                    {this.state.userType === 0 ? (<p>Being a Investor, you will be able to access to .... you can you can youcan you can you can youcan you can you can youcanyou can you can youcanyou can you can youcan </p>) :
                                        (<p>Being a Issuer, you will be able to access to .... you can you can youcan</p>)}
                                </div>
                                <Button className="register-form-button" type="primary" style={{ marginTop: '15px' }} onClick={() => {
                                    this.next()
                                }
                                }>Continue</Button>
                            </div>)
                        }
                        {
                            this.state.current == 1
                            && (<div className="register-info-container">
                                <RegisterForm next={this.next} userInfo={this.state.userInfo}></RegisterForm>
                            </div>)
                        }
                        {
                            this.state.current == 2 && this.state.userType == 0
                            && (<div>
                                <InvestRegisterForm next={this.next} userInfo={this.state.userInfo}></InvestRegisterForm>
                            </div>)
                        }
                        {
                            this.state.current == 2 && this.state.userType == 1
                            && (<div>
                                <IssuerRegisterForm next={this.next} userInfo={this.state.userInfo}></IssuerRegisterForm>
                            </div>)
                        }
                        {
                            this.state.current == 3
                            && (<RegisterSubmit userType={this.state.userType} userInfo={this.state.userInfo} loginInfo={this.state.loginInfo} setLoginInfo={this.props.setLoginInfo}></RegisterSubmit>)
                        }

                    </div>
                </div>
            </div>
        );
    }
}

export default Register;
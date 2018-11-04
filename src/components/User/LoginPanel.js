import React, { Component } from 'react';
import {Icon,Button} from 'antd'

import LoginForm from './LoginForm'

import '../../assets/css/login-panel.css'

class LoginPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    closeLoginPanel = () => {
        this.props.closeLogin();
    }

    render() {
        return(
            <div className="login-panel">
                <div className="login-description">
                    <h1>Built for developers</h1>
                    <p>XXX is ... platform inspired by ,,,,,,,,,XXX is ... platform inspired by ,,,,,,,,,XXX is ... platform inspired by ,,,,,,,,,XXX is ... platform inspired by ,,,,,,,,,</p>
                </div>
                <LoginForm closeLogin={this.props.closeLogin} loginInfo={this.props.loginInfo} setLoginInfo={this.props.setLoginInfo}></LoginForm>
                <Button ghost shape="circle"size="small" icon="close" onClick={this.closeLoginPanel} />
            </div>
        )
    }
}


export default LoginPanel;
import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox, Radio } from 'antd';
import { Link } from 'react-router-dom'

import dataAccess from '../../model/dataAccess'

class RegisterSubmit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginInfo: this.props.loginInfo,
            registerSuccess: false
        };
    }

    componentDidMount = () => {
        let data = {
            userType: this.props.userType, userInfo: this.props.userInfo
        }
        dataAccess.postData('/register', data, (response) => {
            console.log("register", response);
            if (response.data === 1) {
                let tempData = this.state.loginInfo;
                tempData.isLogin = true;
                tempData.email = this.props.userInfo.email;
                tempData.firstName = this.props.userInfo.firstName;
                tempData.lastName = this.props.userInfo.lastName;
                tempData.isInvester = this.props.userInfo.userType === 0 ? 0 : 1;
                tempData.isIssuer = this.props.userInfo.userType === 1 ? 0 : 1;
                //put into cookie
                this.setState({
                    registerSuccess: true,
                    loginInfo: tempData
                });
                this.props.setLoginInfo(tempData);
            }
            else { }
        })
    }

    render() {
        return (

            <div className="send-data-panel">
                {
                    this.state.registerSuccess ? (<div>
                        <Icon type="check-circle" theme='twoTone' twoToneColor='#52c41a' />
                        <h3>Register Successfully</h3>
                        {/* {this.props.loginInfo.isLogin&&<h3>Login Successfully</h3>} */}
                        <p>Hello,{this.props.userInfo.firstName}{this.props.userInfo.lastName}.</p>
                        <p>It's time to explore the PIPO market, </p>
                        {this.props.userType == 0 ? (<p>bid for the desired PIPO, and manage your assets.</p>) : (<p>issue your own PIPO, and manage your assets.</p>)}
                        {this.props.userType == 0 ? (<Button type='primary'><Link to='/invest'>To Invest</Link></Button>) : (<Button type='primary'>To Issue</Button>)}
                        <Button style={{ marginLeft: '8px' }}>To Personal Center</Button>
                    </div>) : (<div><Icon type="loading" /><p>sending data to server...</p></div>)
                }
            </div>
        );
    }
}

export default RegisterSubmit;
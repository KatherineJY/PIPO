import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Icon, message, Button } from 'antd'

class InvestIntroduction extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    visitControl = (e) => {
        console.log(this.props);
        if (!this.props.loginInfo.isLogin) {
           // e.preventDefault();
            message.warning('Before entering the PIPO market, please log in as an investor first!');
        }
    }

    render() {
        return (
            <div className="component-holder banner-container investHome">
                <div className="invest-start-container">
                    <h1>Customize my portfolio,<br />Get competitive return.</h1>
                    <Button className='to-register' ><Link onClick={this.visitControl} to={{
                        pathname: '/invest/investMain',
                    }}>Get Started<Icon type="right" /></Link></Button>
                </div>
            </div>
        );
    }
}

export default InvestIntroduction;
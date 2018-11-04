import React, { Component } from 'react';
import { Icon, Button } from 'antd';
import { Link } from 'react-router-dom'



class Home extends Component {
    render() {
        return (
            <div>
                <div className="component-holder banner-container home-container">
                    <div className="home-start-container">
                        <h1>TAILORED PIPO</h1>
                        <Button className='to-register'><Link to={{
                            pathname: '/register',
                            query: { userType: 0 }
                        }}>Be An Investor <Icon type="right" /></Link></Button>
                        <Button className='to-register'><Link to={{
                            pathname: '/register',
                            query: { userType: 1 }
                        }}>Be An Issuer <Icon type="right" /></Link></Button>
                    </div>
                </div>
                <div className='img-holder'>
                    <img src={require('../assets/images/ICON-1ISSUE.png')}></img>
                    <img src={require('../assets/images/icon-1risk.png')}></img>
                    <img src={require('../assets/images/icon-1target.png')}></img>
                </div>
                <div className="description">
                    <h1>How it works?</h1>
                    <p>First,sign in with your basic information.then create your own account with more personal information after authorizing us to save them. Finish these two steps, and you can be one of Inventus'issuers.</p>
                </div>
                <div className="description">
                    <h1>Why choose us?</h1>
                    <p><b>Effciency and compactness</b> As long as we get necessary information, the issuing process become direct</p>
                    <p><b>Advanced risk management</b> You can join mutual assurance mechanism we specially design for issuers. In this scenario, if you cannot pay dividends due to force majeure factors, others in the same agreement will share your payment obligation.</p>
                    <p><b>Mutual selection</b> You can choose investors as they can choose yo. During the process of bid_ask, we can offer you investors with higher quality ceteris paribus</p>
                </div>
            </div>
        );
    }
}

export default Home;
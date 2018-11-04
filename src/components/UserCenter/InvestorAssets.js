import React, { Component } from 'react';

import { Breadcrumb, Row, Col, Button, Tabs } from 'antd'
import { StickyContainer, Sticky } from 'react-sticky'

import AssetsMyPIPO from './AssetsMyPIPO'
import AssetsHistory from './AssetsHistory'

const TabPane = Tabs.TabPane;

const renderTabBar = (props, DefaultTabBar) => (
    <Sticky bottomOffset={80}>
        {({ style }) => (
            <DefaultTabBar {...props} style={{ ...style, zIndex: 1, background: '#fff', marginBottom: '0' }} />
        )}
    </Sticky>
);

class InvestorAssets extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userType: 0,
            ratio: 3
        }
    }

    render() {
        return (
            <div className='component-holder'>

                <Breadcrumb>
                    <Breadcrumb.Item>USER CENTER</Breadcrumb.Item>
                    <Breadcrumb.Item>ASSETS</Breadcrumb.Item>
                </Breadcrumb>
                <div className='assets-main-container'>
                    <div className='portfolio-title'><b>MY ACCOUNT</b></div>
                    <div className='assets-main-container-info'>
                        <div className='assets-main-container-left'>
                            <Row type="flex" justify="space-around">
                                <Col span={8}> <p>TOTAL ASSETS <h1> $1,000,000</h1></p> </Col>
                                <Col span={8}> <p>BALANCE <h1> $50,000</h1></p> </Col>
                                <Col span={8}> <p>LOCKED <h1> $50,000</h1></p> </Col>
                            </Row>
                            <Row type="flex" justify="space-around">
                                <Col span={8}> <p>RETURN <h1> $50,000</h1></p> </Col>
                                <Col span={8}> <p>RETURN RATIO <h1 style={this.state.ratio > 0 ? { color: 'green' } : { color: 'red' }}> +3.9%</h1></p> </Col>
                                <Col span={8}></Col>
                            </Row>
                        </div>
                        <div className='assets-main-container-right'>
                            <Button type='primary' >Top Up</Button>
                            <Button >Withdraw</Button>
                        </div>
                    </div>
                </div>

                <StickyContainer>
                    <Tabs renderTabBar={renderTabBar}>

                        <TabPane tab='MY PIPO' key={0}>
                            <AssetsMyPIPO />
                        </TabPane>

                        <TabPane tab='HISTORY' key={1}>
                            <AssetsHistory />
                        </TabPane>
                    </Tabs>
                </StickyContainer>

            </div>
        
        );
    }
}

export default InvestorAssets;
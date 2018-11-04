import React, { Component } from 'react';
import { Breadcrumb, Icon, Row, Col, Button, InputNumber, Tooltip, Tabs, message } from 'antd';
import { StickyContainer, Sticky } from 'react-sticky'

import InvestorsComposition from './pipo-portfile/InvestorsComposition'
import Issuer from './pipo-portfile/Issuer'
import Prospectus from './pipo-portfile/Prospectus'

import dataAccess from '../model/dataAccess'

const TabPane = Tabs.TabPane;

const tabPanes = [
    {
        title: 'ISSUER',
        component: Issuer
    },
    {
        title: 'PROSPECTUS',
        component: Prospectus
    },
    // {
    //     title: 'PRICE FLUCATUATION',
    //     component: PriceFlucatuation
    // },
    {
        title: 'INVESTORS COMPOSITION',
        component: InvestorsComposition
    },
]

const renderTabBar = (props, DefaultTabBar) => (
    <Sticky bottomOffset={80}>
        {({ style }) => (
            <DefaultTabBar {...props} style={{ ...style, zIndex: 1, background: '#fff', marginBottom: '0' }} />
        )}
    </Sticky>
);

class PipoDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pipoId: this.props.location.query ? this.props.location.query.pipoId : '',
            isLike: false,
            pipoInfo: {},
            userInfo: {
                email: 'k@163.com',
                balance: 11000,
            },
            bidInfo: {
                bidPrice: 0,
                bidOrder: 200,
            },

        };
    }

    componentDidMount = () => {
        console.log("state",this.state.userInfo.balance);
        //let sendData = {pipoId:this.state.pipoId};
        let sendData = { issuer_id: 'P100002' };
        dataAccess.postData('/get_issue_by_id', sendData, (response) => {
            console.log('getPIPOinfo', response.data);
            let tempData = [];
            tempData.id = this.state.pipoId;
            tempData.price = response.data.price_ask;
            tempData.term = response.data.term;
            tempData.offerSharing = response.data.shares_offering;
            tempData.minOfOrder = response.data.min_order_quantity;
            tempData.risk = response.data.risk_grade ? response.data.risk_grade : 'A';
            tempData.creditCardCharge = response.data.credit_card_charge_percentage;
            tempData.marketLot = response.data.market_lot;
            tempData.bidDay = response.data.end_time ? response.data.end_time : '2019-01-08';
            tempData.progress = response.data.progress ? response.data.progress : '0%';
            tempData.recommendedPrice = response.data.price_indicate;
            this.setState({
                pipoInfo: tempData
            })
        })
        console.log("state",this.state.userInfo.balance);
        //sendData = {issuer_id:this.state.pipoId,email:this.state.userInfo.email};
        sendData = { issuer_id: 'P100011', email: 'sql@qq.com' };
        dataAccess.postData('/get_shoucang_status', sendData, (response) => {
            console.log('getIfShoucang', response.data);
            this.setState({
                isLike: response.data == 1 ? true : false
            })
        })
        console.log("state",this.state.userInfo.balance);
        //sendData = {email:this.state.userInfo.email};
        sendData = { email: '111@qq.com' };
        dataAccess.postData('/get_investor_balance_by_id', sendData, (response) => {
            console.log('get_investor_balance_by_id', response.data);
            let tempData = this.state.userInfo;
            tempData.balance = response.data.account_balance;
            this.setState({
                userInfo:tempData
            })
        })
        
        //sendData = { email: '111@qq.com', issuer_id: 'P100002', bidPrice: this.state.bidInfo.bidPrice, bidOrder: this.state.bidInfo.bidOrder };
        sendData = { email: '111@qq.com', issuer_id: 'P100002', bidPrice:10, bidOrder: this.state.bidInfo.bidOrder };
        dataAccess.postData('/receive_investor_price_num', sendData, (response) => {
            console.log('receive_investor_price_num', response.data);
            let tempData = this.state.userInfo;
            tempData.balance = response.data;
            console.log(response.data);
            this.setState({
                userInfo:tempData
            })
        })
        
        
        
    }

    toBid = () => {
        message.config({ top: 100, duration: 2 });
        message.success('Bid successfully!')
    }

    changeIsLike = () => {
        let tempData = this.isLike;
        this.setState({
            isLike: !tempData
        })
        let sendData = { issuer_id: 'P100011', email: 'sql@qq.com', shoucang: this.state.isLike };
        dataAccess.postData('/toggle_shoucang', sendData, (response) => {
            console.log('setIfShoucang', response.data);
        })
    }

    render() {


        return (
            <div className='component-holder'>
                <Breadcrumb>
                    <Breadcrumb.Item>Invest Home</Breadcrumb.Item>
                    <Breadcrumb.Item>MarketPlace</Breadcrumb.Item>
                    <Breadcrumb.Item>Protfile</Breadcrumb.Item>
                </Breadcrumb>
                <div className='portfolio-main-container'>
                    <div className='portfolio-info-container'>
                        <div className='portfolio-title'>
                            <b style={{ marginRight: '5px' }}>ID:{this.state.pipoId}</b>
                            {this.state.isLike ? (<span onClick={this.changeIsLike}><Icon type='star' theme='twoTone' />REMOVE FROM COLLECTION</span>) : (<span onClick={this.changeIsLike}><Icon type='star' />ADD TO COLLECTION</span>)}
                        </div>
                        <Row type="flex" justify="space-around">
                            <Col span={4}> <p>PRICE<h1>${this.state.pipoInfo.price}</h1></p> </Col>
                            <Col span={4}> <p>TERM<h1>{this.state.pipoInfo.term}Year</h1></p> </Col>
                            <Col span={4}> <p>OFFER SHARING<h1>{this.state.pipoInfo.offerSharing}</h1></p> </Col>
                            <Col span={4}> <p>PROGRESS<h1>{this.state.pipoInfo.progress}</h1></p> </Col>
                        </Row>
                        <Row type="flex" justify="space-around">
                            <Col span={4}> <p>MIN ORDER: <b> {this.state.pipoInfo.minOfOrder}</b></p> </Col>
                            <Col span={4}> <p>RISK: <b> {this.state.pipoInfo.risk}</b></p> </Col>
                            <Col span={8}> <p>CREDIT CARD CHARGE: <b> {this.state.pipoInfo.creditCardCharge}</b></p> </Col>
                        </Row>
                        <Row type="flex" justify="space-around">
                            <Col span={4}> <p>MARKET LOT: <b> {this.state.pipoInfo.marketLot}</b></p> </Col>
                            <Col span={4}> <p>BID DAY: <b> {this.state.pipoInfo.bidDay}</b></p> </Col>
                            <Col span={8}> <p>RECOMMENDED PRICE: <b> ${this.state.pipoInfo.recommendedPrice}</b></p> </Col>
                        </Row>
                    </div>

                    <div className='bid-container'>
                        <div className='portfolio-title'>
                            <b>BID</b>
                        </div>
                        <div className='bid-input-container'>
                            <Row type='flex' justify="space-between" align='middle'>
                                <Col><p style={{ lineHeight: '24px', marginBottom: '0' }}>BALANCE: ${this.state.userInfo.balance}</p></Col>
                                <Col><Tooltip placement='top' title='click to top up'><Button size='small'>TOP UP</Button></Tooltip></Col>
                            </Row>
                            <Tooltip placement='right' title='Input the bid price'>
                                <InputNumber style={{ width: '100%', marginTop: '10px' }} min={0}
                                    precision={2}
                                    formatter={value => `$${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    parser={value => value.replace(/\$\s?|(,*)/g, '')}
                                    value={this.state.bidInfo.bidPrice}
                                    onChange={(value) => {
                                        let tempData = this.state.bidInfo;
                                        tempData.bidPrice = value;
                                        this.setState({ bidInfo: tempData });
                                    }} />
                            </Tooltip>
                            <Tooltip placement='right' title={`Input the order you want to bid at least ${this.state.pipoInfo.minOfOrder} order`} >
                                <InputNumber style={{ width: '100%', marginTop: '10px' }} min={200}
                                    formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    parser={value => value.replace(/\$\s?|(,*)/g, '')}
                                    value={this.state.bidInfo.bidOrder}
                                    onChange={(value) => {
                                        let tempData = this.state.bidInfo;
                                        tempData.bidOrder = value;
                                        this.setState({ bidInfo: tempData });
                                    }} />
                            </Tooltip>

                            {
                                this.state.bidInfo.bidOrder * this.state.bidInfo.bidPrice > this.state.userInfo.balance ?
                                    (<p style={{ width: '100%', marginTop: '10px', textAlign: 'right' }}><span style={{ color: 'red' }}><Icon type='warning' />Amount exceeds maximum balance amount.</span></p>)
                                    : (<p style={{ width: '100%', marginTop: '10px', textAlign: 'right' }}><Icon type='check-circle' theme='twoTone' twoToneColor='#52c41a' />Total: {(this.state.bidInfo.bidOrder * this.state.bidInfo.bidPrice).toFixed(2)}</p>)
                            }
                            <Button onClick={this.toBid} type='primary' disabled={this.state.bidInfo.bidOrder * this.state.bidInfo.bidPrice > this.state.userInfo.balance} >Bid</Button>

                        </div>
                    </div>
                </div>
                <StickyContainer>
                    <Tabs renderTabBar={renderTabBar}>
                        {
                            tabPanes.map((item, key) => {
                                return (
                                    <TabPane tab={item.title} key={key}>
                                        <item.component issueId={this.state.pipoId}></item.component>
                                    </TabPane>
                                )
                            })
                        }
                    </Tabs>
                </StickyContainer>
            </div>
        );
    }
}

export default PipoDetail;
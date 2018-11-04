import React, { Component } from 'react';
import { Breadcrumb, Table, Progress, Button, Popconfirm, Icon, Row, Col, Tooltip, InputNumber, message } from 'antd'
import { Link } from 'react-router-dom'

class Collection extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showBidPanel: false,
            bidInfo: {
                bidId: '',
                bidPrice: 0,
                bidOrder: 0,
            },
            userInfo: {
                balance: 110,
            },
            data: [
                {
                    key: 0,
                    id: 'P100001',
                    linkId: 'P100001',
                    bidId: 'P100001',
                    deleteId: 0,
                    price: 10,
                    referencePrice: 10.7,
                    creditCardCharge: 0.01,
                    term: 3,
                    marketLot: 67.3,
                    minOfOrder: 67.3,
                    progress: 0.5,
                },
                {
                    key: 1,
                    id: 'P100002',
                    linkId: 'P100002',
                    bidId: 'P100002',
                    deleteId: 1,
                    price: 10,
                    referencePrice: 10.7,
                    creditCardCharge: 0.01,
                    term: 3,
                    marketLot: 67.3,
                    minOfOrder: 67.3,
                    progress: 1,
                },
            ]
        };
    }

    toBid = () => {
        message.config({ top: 100, duration: 2 });
        message.success('Bid successfully!');
        this.setState({
            showBidPanel:false
        })
    }

    render() {
        const columns = [
            {
                title: 'ID',
                dataIndex: 'id',
                align: 'center',
            },
            {
                title: 'PRICE($)',
                dataIndex: 'price',
                align: 'center',
                sorter: (record1, record2) => record1.price - record2.price
            },
            {
                title: 'REFERENCE PRICE($)',
                dataIndex: 'referencePrice',
                align: 'center',
                sorter: (record1, record2) => record1.referencePrice - record2.referencePrice
            },
            {
                title: 'CREDIT CARD CHARGE',
                dataIndex: 'creditCardCharge',
                align: 'center',
                sorter: (record1, record2) => record1.creditCardCharge - record2.creditCardCharge
            },
            {
                title: 'TERM(Year)',
                dataIndex: 'term',
                align: 'center',
                sorter: (record1, record2) => record1.term - record2.term
            },
            {
                title: 'MARKET LOT',
                dataIndex: 'marketLot',
                align: 'center',
                sorter: (record1, record2) => record1.marketLot - record2.marketLot
            },
            {
                title: 'MIN OF ORDER',
                dataIndex: 'minOfOrder',
                align: 'center',
                sorter: (record1, record2) => record1.minOfOrder - record2.minOfOrder
            },
            {
                title: 'PROGRESS',
                dataIndex: 'progress',
                align: 'center',
                sorter: (record1, record2) => record1.progress - record2.progress,
                render: progress => (
                    <Progress percent={progress * 100} size="small" />
                )
            },
            {
                title: 'DETAIL',
                dataIndex: 'linkId',
                align: 'center',
                render: (linkId) => (<Link to={{
                    pathname: '/invest/pipoDetail',
                    query: { pipoId: linkId }
                }}>Detail</Link>)
            },
            {
                title: '',
                dataIndex: 'bidId',
                align: 'center',
                render: (bidId) => (<Button size='small' type='primary' onClick={() => {

                }}>BID NOW</Button>),
                onCell: (record) => {
                    return {
                        onClick: () => {
                            console.log(record);
                            this.setState({
                                showBidPanel: true,
                                bidInfo: {
                                    bidId: record.id,
                                    minBidOrder: record.minOfOrder,
                                    bidOrder: record.minOfOrder,
                                    bidPrice: 0,
                                }
                            })
                        },
                    }
                }
            },
            {
                title: '',
                dataIndex: 'deleteId',
                align: 'center',
                render: (deleteId) => (
                    <Popconfirm placement='rightTop' title="Are you sure to cancel collecting?" onConfirm={() => {
                        let tempData = this.state.data;
                        tempData.splice(deleteId, 1);
                        this.setState({ data: tempData });
                    }} okText="Yes" cancelText="No">
                        <Icon type='delete' />
                    </Popconfirm>
                ),
            },
        ]


        return (
            <div className='component-holder'>
                <Breadcrumb>
                    <Breadcrumb.Item>USER CENTER</Breadcrumb.Item>
                    <Breadcrumb.Item>COLLECTION</Breadcrumb.Item>
                </Breadcrumb>
                <Table style={{ marginTop: '20px' }} columns={columns} dataSource={this.state.data} />

                {
                    this.state.showBidPanel && (
                        <div className='bid-container popup-container '>
                            <div className='portfolio-title'>
                                <b>BID {this.state.bidInfo.bidId}</b>
                                <Button shape="circle" size="small" icon="close" onClick={() => {
                                    this.setState({
                                        showBidPanel: false
                                    })
                                }} />
                            </div>
                            <div className='bid-input-container'>
                                <Row type='flex' justify="space-between" align='middle'>
                                    <Col><p style={{ lineHeight: '24px', marginBottom: '0' }}>BALANCE: ${this.state.userInfo.balance.toFixed(2)}</p></Col>
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
                                <Tooltip placement='right' title={`Input the order you want to bid at least ${this.state.bidInfo.minBidOrder} order`} >
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
                    )
                }
            </div>
        );
    }
}

export default Collection;
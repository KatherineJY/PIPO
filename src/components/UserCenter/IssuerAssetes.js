import React, { Component } from 'react';
import { Chart, Geom, Axis, Coord, Label, Legend, Tooltip } from 'bizcharts'
import DataSet from '@antv/data-set'
import { Breadcrumb, Row, Col, Button, Tabs, Icon, Progress } from 'antd'

class IssuerAssetes extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isFinished: 1,
            ratio: 3,
            pipoInfo: {
                price: 0,
                term: 0,
                offerSharing: 0,
                progress: 0,
            },
            data: [
                // {
                //     item: 'Bidders higher',
                //     population: 34,
                //     amount: 8232
                // },
                // {
                //     item: 'Bidders who bid  under your given',
                //     population: 26,
                //     amount: 823
                // },
                {
                    item: 'Substantial shareholder',
                    count: 40,
                    order: 'large than 100'
                },
                {
                    item: 'Medium shareholder',
                    count: 40,
                    order: '30-100'
                },
                {
                    item: 'Small shareholder',
                    count: 40,
                    order: '0-30'
                },
            ]
        }
    }

    render() {
        const { DataView } = DataSet;
        const dv = new DataView();
        if (!this.state.isFinished) {
            dv.source(this.state.data).transform({
                type: 'percent',
                field: 'population',
                dimension: 'item',
                as: 'percent'
            });
        }
        else {
            dv.source(this.state.data).transform({
                type: 'percent',
                field: 'count',
                dimension: 'item',
                as: 'percent'
            });
        }
        const cols = {
            percent: {
                formatter: val => {
                    val = (val * 100).toFixed(2) + '%';
                    return val;
                }
            }
        };

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
                                <Col span={12}> <p>FUND RASING <h1> $1,000,000</h1></p> </Col>
                                <Col span={12}> <p>LOCKED <h1> $50,000</h1></p> </Col>
                            </Row>
                        </div>
                        <div className='assets-main-container-right'>
                            <Button type='primary' >Top Up</Button>
                            <Button >Withdraw</Button>
                        </div>
                    </div>
                </div>
                <div className='assets-main-container'>
                    <div className='portfolio-title'>
                        <b>ID: P100001</b>
                        {!this.state.isFinished ? <span><Icon type='exclamation-circle' theme='twoTone' />BIDDING</span> :
                            <span><Icon type='check-circle' theme='twoTone' twoToneColor='#52c41a' />Purchased successfully</span>}
                    </div>
                    <Row type="flex" justify="space-around">
                        <Col span={4}> <p>PRICE<h1>${this.state.pipoInfo.price}</h1></p> </Col>
                        <Col span={4}> <p>TERM<h1>{this.state.pipoInfo.term}Year</h1></p> </Col>
                        <Col span={4}> <p>OFFER SHARING<h1>{this.state.pipoInfo.offerSharing}</h1></p> </Col>
                        <Col span={4}> <p>PROGRESS<h1>{this.state.pipoInfo.progress}</h1></p> </Col>
                        <Col span={4}> <p>RAISED FUND<h1>{this.state.pipoInfo.progress}</h1></p> </Col>
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
                <div className='assets-main-container'>
                    <div className='portfolio-title'><b>INFORMATION OF INVESTORS</b></div>
                    {
                        !this.state.isFinished ?
                            (
                                <Chart height={400}
                                    data={dv} scale={cols} forceFit>
                                    <Coord type={'theta'} radius={0.75} innerRadius={0.6} />
                                    <Axis name='percent' />
                                    <Legend position='right' offsetY={0} offsetX={-300} />
                                    <Geom type='intervalStack' position='percent' color='item'
                                        tooltip={[
                                            'item*percent',
                                            (item, percent) => {
                                                percent = (percent * 100).toFixed(0) + '%';
                                                return {
                                                    name: item,
                                                    value: percent
                                                };
                                            }
                                        ]}
                                        style={{
                                            lineWidth: 1,
                                            stroke: '#fff'
                                        }}
                                    >
                                        <Label content='percent'
                                            formatter={(val, item) => { return item.point.item + '\n' + 'percent' + ': ' + val + '\n' + 'population' + ': ' + item.point.population + '\n' + 'Total amount' + ': ' + item.point.amount }}
                                            textStyle={{
                                                // textAlign:'end',
                                                fontSize: '14',
                                                lineHeight: '20'
                                            }} />
                                    </Geom>
                                </Chart>

                            ) : (
                                <Chart height={400}
                                    data={dv} scale={cols} forceFit>
                                    <Coord type={'theta'} radius={0.75} innerRadius={0.6} />
                                    <Axis name='percent' />
                                    <Legend position='right' offsetY={0} offsetX={-300} />
                                    <Geom type='intervalStack' position='percent' color='item'
                                        tooltip={[
                                            'item*percent',
                                            (item, percent) => {
                                                percent = (percent * 100).toFixed(0) + '%';
                                                return {
                                                    name: item,
                                                    value: percent
                                                };
                                            }
                                        ]}
                                        style={{
                                            lineWidth: 1,
                                            stroke: '#fff'
                                        }}
                                    >
                                        <Label content='percent'
                                            formatter={(val, item) => { return item.point.item + '\n' + 'percent: ' + val + '\n'+'Order:'+item.point.order}}
                                            textStyle={{
                                                // textAlign:'end',
                                                fontSize: '14',
                                                lineHeight: '20'
                                            }} />
                                    </Geom>
                                </Chart>
                            )
                    }
                </div>
            </div>
        );
    }
}

export default IssuerAssetes;
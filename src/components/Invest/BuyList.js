import React, { Component } from 'react';
import { Breadcrumb, Checkbox, Table, Button, message,Tooltip,InputNumber,Icon } from 'antd';
import { Link } from 'react-router-dom';
import dataAccess from '../../model/dataAccess';

const CheckboxGroup = Checkbox.Group;

const ageOptions = [
    {
        label: 'Below 20',
        value: '<20'
    },
    {
        label: '20-40',
        value: '20-40'
    },
    {
        label: '40-60',
        value: '40-60'
    },
    {
        label: 'Higher than 60',
        value: '>60'
    },
]

const defaultAgeValue = ['<20', '20-40', '40-60', '>60']

const defaultOccupationValue = ['Manager', 'Professional', 'Student', 'Others']

const occupation = [
    {
        label: 'Manager',
        value: 'Manager'
    },
    {
        label: 'Professional',
        value: 'Professional'
    },
    {
        label: 'Student',
        value: 'Student'
    },
    {
        label: 'Others',
        value: 'Others'
    },
]


class BuyList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showSellPanel:false,
            ageFilters: [],
            occupationFilters: [],
            ageIndeterminate: false,
            ageCheckAll: false,
            occupationIndeterminate: false,
            occupationCheckAll: false,
            data: [
                {
                    key: 0,
                    id: 'P100001',
                    linkId: 'P100001',
                    sellId:'P100001',
                    age: '<20',
                    occupation: 'Manager',
                    price: 10,
                    referencePrice: 10.7,
                    creditCardCharge: 0.01,
                    term: 3,
                    marketLot: 67.3,
                    minOfOrder: 67.3,
                    progress: 0.5,
                    like: true
                },
                {
                    key: 1,
                    id: 'P100002',
                    linkId: 'P100002',
                    sellId:'P100002',
                    age: '20-40',
                    occupation: 'Student',
                    price: 10,
                    referencePrice: 10.7,
                    creditCardCharge: 0.01,
                    term: 3,
                    marketLot: 67.3,
                    minOfOrder: 67.3,
                    progress: 1,
                    like: false
                },
            ]
        };
    }

    componentDidMount = ()=> {
        //let sendData = {email:this.props.loginInfo.email};
        let sendData = {email:'111@qq.com'};
        console.log(sendData);
        dataAccess.postData('/all_on_buy_list',sendData,(response)=>{
            console.log(response);
            let tempData = response.data.map( (item,key)=> {
                return {
                    key: key,
                    deal_id: item.deal_id,
                    issue_id: item.issuer_id,
                    issuer: item.first_name+' '+item.last_name, 
                    linkId: item.issuer_id,
                    sellId: item.issuer_id,
                    buyback_price: item.buy_back_prc,
                    quantity:item.buy_back_num,
                    buy_price:item.deal_price,
                    creditCardCharge: item.charge_percent,
                    term: item.term,
                    sharingOffering: item.shares_offering,
                    marketLot: item.market_lot,
                    minOfOrder: item.minimum_order,
                }
            } )
            this.setState({
                data:tempData
            })
        })
    }

    // ageOnChange = (checkedList) => {
    //     this.setState({
    //         ageFilters: checkedList,
    //         ageIndeterminate: !!checkedList.length && (checkedList.length < ageOptions.length),
    //         ageCheckAll: checkedList.length === ageOptions.length
    //     })
    // }

    // occupationOnChange = (checkedList) => {
    //     this.setState({
    //         occupationFilters: checkedList,
    //         occupationIndeterminate: !!checkedList.length && (checkedList.length < occupation.length),
    //         occupationCheckAll: checkedList.length === occupation.length
    //     })
    // }

    // onCheckAllAgeChange = (e) => {
    //     this.setState({
    //         ageFilters: e.target.checked ? defaultAgeValue : [],
    //         ageIndeterminate: false,
    //         ageCheckAll: e.target.checked
    //     })
    // }

    // onCheckAllOccupationChange = (e) => {
    //     this.setState({
    //         occupationFilters: e.target.checked ? defaultOccupationValue : [],
    //         occupationIndeterminate: false,
    //         occupationCheckAll: e.target.checked
    //     })
    // }

    toSell = () => {
        message.config({ top: 100, duration: 2 });
        message.success('You have sold '+this.state.sellInfo.sellId+' successfully!');
        this.setState({
            showSellPanel: false
        })
    }

    render() {
        const columns = [
            {
                title: 'DEAL ID',
                dataIndex: 'deal_id',
                align: 'center',
            },
            {
                title: 'ISSUE ID',
                dataIndex: 'issue_id',
                align: 'center',
            },
            {
                title: 'ISSUER ',
                dataIndex: 'issuer',
                align: 'center',
            },
            {
                title: 'DEAL PRICE($)',
                dataIndex: 'buy_price',
                align: 'center',
                sorter: (record1, record2) => record1.buy_price - record2.buy_price
            },
            {
                title: 'BUY-BACK PRICE($)',
                dataIndex: 'buyback_price',
                align: 'center',
                sorter: (record1, record2) => record1.buyback_price - record2.buyback_price
            },
            {
                title: 'SHARING OFFERING',
                dataIndex: 'sharingOffering',
                align: 'center',
                sorter: (record1, record2) => record1.sharingOffering - record2.sharingOffering
            },
            {
                title: 'QUANTITY',
                dataIndex: 'quantity',
                align: 'center',
                sorter: (record1, record2) => record1.quantity - record2.quantity
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
                title: 'DETAIL',
                dataIndex:'linkId',
                align:'center',
                render: (linkId) => (<Link to={{
                    pathname:'/invest/pipoDetail',
                    query:{pipoId:linkId}
                }}>Detail</Link>)
            },
            {
                title: '',
                dataIndex: 'sellId',
                align: 'center',
                render: (sellId) => (<Button size='small' type='primary' >SELL</Button>),
                onCell: (record) => {
                    return {
                        onClick: () => {
                            console.log(record);
                            this.setState({
                                showSellPanel: true,
                                sellInfo: {
                                    sellId: record.issue_id,
                                    minOfOrder:record.minOfOrder,
                                    maxOfOrder:record.quantity,
                                    quantity: record.minOfOrder,
                                    price: record.buyback_price,
                                }
                                
                            })
                        },
                    }
                }
            },
        ]


        return (
            <div className='second-component-holder'>
                <Breadcrumb>
                    <Breadcrumb.Item>Invest Home</Breadcrumb.Item>
                    <Breadcrumb.Item>MarketPlace</Breadcrumb.Item>
                </Breadcrumb>

                {/* <div className='filters-container'>
                    <div className="filters-title">Applied Filters for the issuers of PIPO</div>
                    <div className='single-filter'>
                        <span className='single-filter-title'>Age</span>
                        <Checkbox indeterminate={this.state.ageIndeterminate} onChange={this.onCheckAllAgeChange} checked={this.state.ageCheckAll}>Check All</Checkbox>
                        <CheckboxGroup options={ageOptions} value={this.state.ageFilters} onChange={this.ageOnChange} />
                    </div>
                    <div className='single-filter'>
                        <span className='single-filter-title'>Occupation</span>
                        <Checkbox indeterminate={this.state.occupationIndeterminate} onChange={this.onCheckAllOccupationChange} checked={this.state.occupationCheckAll}>Check All</Checkbox>
                        <CheckboxGroup options={occupation} value={this.state.occupationFilters} onChange={this.occupationOnChange} />
                    </div>
                </div> */}

                <Table style={{background:'#fff',padding:'5px 10px',boxSizing:'border-box',marginTop:'10px'}} columns={columns} dataSource={this.state.data} /> 
                {
                    this.state.showSellPanel && (
                        <div className='bid-container popup-container '>
                            <div className='portfolio-title'>
                                <b>SELL </b>
                                <Button shape="circle" size="small" icon="close" onClick={() => {
                                    this.setState({
                                        showSellPanel: false
                                    })
                                }} />
                            </div>
                            <div className='bid-input-container'>
                                <p>Seleted: {this.state.sellInfo.sellId}</p>
                                <p>How many shares do you want to sell?</p>
                                <Tooltip placement='right' title={`Input the quantit you want to sell at most ${this.state.sellInfo.maxOfOrder}`} >
                                    <InputNumber style={{ width: '100%', marginTop: '10px' }}
                                        placeHolder="Input the quantity to sell"
                                        value={this.state.sellInfo.quantity}
                                        min={this.state.sellInfo.minOfOrder}
                                        max={this.state.sellInfo.maxOfOrder}
                                        onChange={(value) => {
                                            let tempData = this.state.sellInfo;
                                            tempData.quantity = value;
                                            this.setState({ sellInfo: tempData });
                                        }} />
                                </Tooltip>
                                <p style={{ width: '100%', marginTop: '10px', textAlign: 'right' }}><Icon type='check-circle' theme='twoTone' twoToneColor='#52c41a' />Total: {(this.state.sellInfo.quantity * this.state.sellInfo.price).toFixed(2)}</p>
                                <Button onClick={this.toSell} type='primary' >SELL</Button>

                            </div>
                        </div>
                    )
                }
            </div>
        );
    }
}

export default BuyList;
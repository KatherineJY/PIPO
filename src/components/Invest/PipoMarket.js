import React, { Component } from 'react';
import { Breadcrumb, Checkbox, Table, Progress, Icon, Tooltip } from 'antd'
import { Link } from 'react-router-dom'

import dataAccess from '../../model/dataAccess'

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


class PipoMarket extends Component {

    constructor(props) {
        super(props);
        this.state = {
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
        let sendData = {email:'sql@qq.com'};
        console.log(sendData);
        dataAccess.postData('/get_issue_items',sendData,(response)=>{
            console.log(response);
            let tempData = response.data.map( (item,key)=> {
                return {
                    key: key,
                    id: item.issuer_id,
                    linkId: item.issuer_id,
                    age: item.age_relable,
                    occupation: item.occupation_relable,
                    price: item.price_ask,
                    referencePrice: item.price_indicate,
                    creditCardCharge: item.credit_card_charge_percentage,
                    term: item.term,
                    marketLot: item.market_lot,
                    minOfOrder: item.min_order_quantity,
                    progress: item.progress,
                    like: item.shoucang
                }
            } )
            this.setState({
                data:tempData
            })
        })
    }

    ageOnChange = (checkedList) => {
        this.setState({
            ageFilters: checkedList,
            ageIndeterminate: !!checkedList.length && (checkedList.length < ageOptions.length),
            ageCheckAll: checkedList.length === ageOptions.length
        })
    }

    occupationOnChange = (checkedList) => {
        this.setState({
            occupationFilters: checkedList,
            occupationIndeterminate: !!checkedList.length && (checkedList.length < occupation.length),
            occupationCheckAll: checkedList.length === occupation.length
        })
    }

    onCheckAllAgeChange = (e) => {
        this.setState({
            ageFilters: e.target.checked ? defaultAgeValue : [],
            ageIndeterminate: false,
            ageCheckAll: e.target.checked
        })
    }

    onCheckAllOccupationChange = (e) => {
        this.setState({
            occupationFilters: e.target.checked ? defaultOccupationValue : [],
            occupationIndeterminate: false,
            occupationCheckAll: e.target.checked
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
                title: 'AGE',
                dataIndex: 'age',
                align: 'center',
                filters: defaultAgeValue.map((item) => {
                    return {
                        text: item,
                        value: item
                    }
                }),
                filteredValue: this.state.ageFilters,
                onFilter: (value, record) => record.age.indexOf(value) === 0

            },
            {
                title: 'OCCUPATION',
                dataIndex: 'occupation',
                align: 'center',
                filters: defaultOccupationValue.map((item) => {
                    return {
                        text: item,
                        value: item
                    }
                }),
                filteredValue: this.state.occupationFilters,
                onFilter: (value, record) => record.occupation.indexOf(value) === 0
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
                title: 'PREFER',
                dataIndex: 'like',
                align: 'center',
                render: (like) => (
                    <Tooltip placement='right' title={like?("Click to canel collecting"):("Click to collect")}>
                        {like ?(<Icon type='heart' theme="twoTone" />):(<Icon type='heart' />)}
                    </Tooltip>
                ),
                onCell: (record) => {
                    return {
                        onClick: () => {
                            let tempData = this.state.data;
                            tempData[record.key].like = !tempData[record.key].like;
                            this.setState({
                                data: tempData
                            })
                            let sendData = {
                                issuer_id:record.id,
                                email:'sql@qq.com',
                                shoucang:tempData[record.key].like?1:-1
                            }
                            dataAccess.postData('/toggle_shoucang',sendData,(response)=>{
                                console.log(response);
                            })
                        },
                    }
                }
            },
            {
                title: 'DETAIL',
                dataIndex:'linkId',
                align:'center',
                render: (linkId) => (<Link to={{
                    pathname:'/invest/pipoDetail',
                    query:{pipoId:linkId}
                }}>Detail</Link>)
            }
        ]


        return (
            <div className='second-component-holder'>
                <Breadcrumb>
                    <Breadcrumb.Item>Invest Home</Breadcrumb.Item>
                    <Breadcrumb.Item>MarketPlace</Breadcrumb.Item>
                </Breadcrumb>

                <div className='filters-container'>
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
                </div>

                <Table style={{background:'#fff',padding:'5px 10px',boxSizing:'border-box'}} columns={columns} dataSource={this.state.data} /> 
            </div>
        );
    }
}

export default PipoMarket;
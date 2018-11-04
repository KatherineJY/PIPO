import React, { Component } from 'react';
import { Table, Button, Popconfirm, Icon, Form, InputNumber, Row, Col, Tooltip, message } from 'antd'
import { Link } from 'react-router-dom'

const FormItem = Form.Item;
const EditableContext = React.createContext();

const EditableRow = ({form,index,...props})=>(
    <EditableContext.Provider value={form}>
        <tr {...props} />
    </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends Component {
    
    getInput = () => {
        return <InputNumber />
    }

    render() {
        const {
            editing,
            dataIndex,
            title,
            inputType,
            record,
            index,
            ...restProps
        } = this.props;
        return (
            <EditableContext.Consumer>
                {(form) => {
                    const {getFieldDecorator} = form;
                    return (
                        <td {...restProps}>
                            {editing?(
                                <FormItem style={{margin:0}}>
                                {
                                    getFieldDecorator(dataIndex,{
                                        rules:[{
                                            required:true,
                                            message:'Please input price'
                                        }],
                                        initialValue: record[dataIndex],
                                    })(this.getInput())}</FormItem>
                            ):restProps.children}
                        </td>
                    )
                }
                }
            </EditableContext.Consumer>
        );
    }
}


class AssetsBinding extends Component {

    constructor(props) {
        super(props);
        this.state = {
            bindingData: [
                {
                    key: 0,
                    dealId: 'P100002',
                    issuerId: 'S100002',
                    deleteId: 0,
                    price: 10,
                    referencePrice: 10.7,
                    dividendRatio: 0.01,
                    term: 3,
                    amount:67.3,
                    quantity:100,
                    endDate:'2018-10-29'
                }
            ],
            purData: [
                {
                    key: 0,
                    dealId: 'P100002',
                    issuerId: 'S100002',
                    sellId: 'P100002',
                    price: 10,
                    buyingPrice:10,
                    referencePrice: 10.7,
                    orderQuantity:100,
                    dividendRatio: 0.01,
                    term: 3,
                    total:10,
                    date:'2018-10-29'
                }
            ],
            bindingEditingKey: -1,
            showSellPanel:false
        }
    }

    isEditing = (record) => {
        return record.key === this.state.bindingEditingKey;
    }

    edit(key) {
        this.setState({ bindingEditingKey: key })
        console.log(this.state);
    }

    save(form, key) {
        form.validateFields((error,row)=>{
            if(error) {
                return;
            }
            
            const newData = [...this.state.bindingData];
            const index = newData.findIndex(item=> key===item.key);
            if( index >-1 ){
                const item = newData[index];
                
                newData.splice(index,1,{
                    ...item,
                    ...row
                });
                this.setState({bindingData:newData,bindingEditingKey:-1});

                //updata data
            }
            else {
                newData.push(row);
                this.setState({bindingData:newData,bindingEditingKey:-1});
            }
        })
    }

    cancel = () => {
        this.setState({bindingEditingKey:-1})
    }

    toSell = () => {
        message.config({ top: 100, duration: 2 });
        message.success('Your PIPO have added to market!');
        this.setState({
            showSellPanel:false
        })
    }

    render() {
        const bindColumns = [
            {
                title: 'DEAL ID',
                dataIndex: 'dealId',
                align: 'center',
            },
            {
                title: 'ISSUER ID',
                dataIndex: 'issuerId',
                align: 'center',
                render: (issuerId) => (<Link to={{
                    pathname: '/invest/pipoDetail',
                    query: { pipoId: issuerId }
                }}>{issuerId}</Link>)
            },
            {
                title: 'PRICE($)',
                dataIndex: 'price',
                align: 'center',
                editable: true,
                sorter: (record1, record2) => record1.price - record2.price,
                onCell: record => ({
                    record,
                    dataIndex: 'price',
                    title:'PRICE($)',
                    editing: this.isEditing(record)
                })
            },
            {
                title: 'REFERENCE PRICE($)',
                dataIndex: 'referencePrice',
                align: 'center',
                sorter: (record1, record2) => record1.referencePrice - record2.referencePrice
            },
            {
                title: 'DIVIDEND RATIO',
                dataIndex: 'dividendRatio',
                align: 'center',
                sorter: (record1, record2) => record1.dividendRatio - record2.dividendRatio
            },
            {
                title: 'TERM(Year)',
                dataIndex: 'term',
                align: 'center',
                sorter: (record1, record2) => record1.term - record2.term
            },
            {
                title: 'AMOUNT($)',
                dataIndex: 'amount',
                align: 'center',
                sorter: (record1, record2) => record1.amount - record2.amount
            },
            {
                title: 'QUANTITY',
                dataIndex: 'quantity',
                align: 'center',
                sorter: (record1, record2) => record1.quantity - record2.quantity
            },
            {
                title: 'END DATE',
                dataIndex: 'endDate',
                align: 'center',
                // sorter: (record1, record2) => record1.quantity - record2.quantity
            },
            {
                title: '',
                dataIndex: 'operation',
                align:'center',
                render: (text, record) => {
                    const editable = this.isEditing(record);
                    return (
                        <div>
                            {editable ? (
                                <span>
                                    <EditableContext.Consumer>
                                        {form => (
                                            <a href="javascript:;"
                                                onClick={() => this.save(form, record.key)}
                                                style={{ marginRight: 8 }}>Save</a>
                                        )}
                                        
                                    </EditableContext.Consumer>
                                    <Popconfirm title="Sure to Cancel" onConfirm={() => this.cancel(record.key)}><a>Cancel</a></Popconfirm>
                                </span>
                            ) : (
                                    <a onClick={() => this.edit(record.key)}><Icon type='edit' /></a>
                                )}
                        </div>
                    )
                }
            },
            {
                title: '',
                dataIndex: 'deleteId',
                align: 'center',
                render: (deleteId) => (
                    <Popconfirm placement='rightTop' title="Are you sure to cancel collecting?" onConfirm={() => {
                        let tempData = this.state.bindingData;
                        tempData.splice(deleteId, 1);
                        this.setState({ data: tempData });
                    }} okText="Yes" cancelText="No">
                        <Icon type='delete' />
                    </Popconfirm>
                ),
            },
        ];

        const purColumns = [
            {
                title: 'DATE',
                dataIndex: 'date',
                align: 'center',
            },
            {
                title: 'DEAL ID',
                dataIndex: 'dealId',
                align: 'center',
            },
            {
                title: 'ISSUER ID',
                dataIndex: 'issuerId',
                align: 'center',
                render: (issuerId) => (<Link to={{
                    pathname: '/invest/pipoDetail',
                    query: { pipoId: issuerId }
                }}>{issuerId}</Link>)
            },
            {
                title: 'PRICE($)',
                dataIndex: 'price',
                align: 'center',
                sorter: (record1, record2) => record1.price - record2.price
            },
            {
                title: 'BUYING PRICE($)',
                dataIndex: 'buyingPrice',
                align: 'center',
                sorter: (record1, record2) => record1.buyingPrice - record2.buyingPrice
            },
            {
                title: 'ORDER QUANTITY',
                dataIndex: 'orderQuantity',
                align: 'center',
                sorter: (record1, record2) => record1.orderQuantity - record2.orderQuantity
            },
            {
                title: 'DIVIDEND RATIO',
                dataIndex: 'dividendRatio',
                align: 'center',
                sorter: (record1, record2) => record1.dividendRatio - record2.dividendRatio
            },
            {
                title: 'TERM(Year)',
                dataIndex: 'term',
                align: 'center',
                sorter: (record1, record2) => record1.term - record2.term
            },
            {
                title: 'TOTAL($)',
                dataIndex: 'total',
                align: 'center',
                sorter: (record1, record2) => record1.total - record2.total
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
                                    sellId: record.id,
                                    quantity: record.orderQuantity,
                                    price: record.price,
                                }
                            })
                        },
                    }
                }
            },
        ]
        

        const components = {
            body:{
                row: EditableFormRow,
                cell: EditableCell
            }
        }

        return (
            <div className='tabPanel-container'>
                <div className='info-container'>
                    <div className='portfolio-title'>BIDING</div>
                    <Table components={components} columns={bindColumns} dataSource={this.state.bindingData} />
                </div>
                <div className='info-container'>
                    <div className='portfolio-title'>PURCHASED</div>
                    <Table columns={purColumns} dataSource={this.state.purData} />
                </div>
                {
                    this.state.showSellPanel && (
                        <div className='bid-container popup-container '>
                            <div className='portfolio-title'>
                                <b>SELL {this.state.sellInfo.sellId}</b>
                                <Button shape="circle" size="small" icon="close" onClick={() => {
                                    this.setState({
                                        showSellPanel: false
                                    })
                                }} />
                            </div>
                            <div className='bid-input-container'>
                                <Tooltip placement='right' title={`Input the quantit you want to sell at most ${this.state.sellInfo.quantity}`} >
                                    <InputNumber style={{ width: '100%', marginTop: '10px' }} min={200}
                                        placeHolder="Input the quantity to sell"
                                        value={this.state.sellInfo.quantity}
                                        min={0}
                                        max={this.state.sellInfo.quantity}
                                        onChange={(value) => {
                                            let tempData = this.state.sellInfo;
                                            tempData.quantity = value;
                                            this.setState({ sellInfo: tempData });
                                        }} />
                                </Tooltip>
                                <p style={{ width: '100%', marginTop: '10px', textAlign: 'right' }}><Icon type='check-circle' theme='twoTone' twoToneColor='#52c41a' />Total: {(this.state.sellInfo.quantity * this.state.sellInfo.price).toFixed(2)}</p>
                                <Button onClick={this.toSell} type='primary' >Sell</Button>

                            </div>
                        </div>
                    )
                }
            </div>
            
        );
    }
}

export default AssetsBinding;
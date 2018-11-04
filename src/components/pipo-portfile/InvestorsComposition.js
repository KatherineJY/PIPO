import React, { Component } from 'react';
import { Chart, Geom, Axis, Coord, Label, Legend } from 'bizcharts'
import DataSet from '@antv/data-set'

import dataAccess from '../../model/dataAccess'

class InvestorsComposition extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [
            {
                item: '1',
                count: 40,
            },
            {
                item: '2',
                count: 40,
            },
            {
                item: '3',
                count: 40,
            },
        ]
        }
    }

    componentDidMount = () => {
        console.log('to get data');
        let sendData = { issuer_id: this.props.issueId };
        sendData = { issuer_id: 'P100002' };
        console.log(sendData);
        dataAccess.postData('/get_record', sendData, (response) => {
            console.log('get_record',response);

        })
    }


    render() {
        const { DataView } = DataSet;
        const dv = new DataView();
        dv.source(this.state.data).transform({
            type: 'percent',
            field: 'count',
            dimension: 'item',
            as: 'percent'
        });
        const cols = {
            percent: {
                formatter: val => {
                    val = (val * 100).toFixed(2) + '%';
                    return val;
                }
            }
        };
        return (
            <div className='tabPanel-container'>

                <div className='info-container'>
                    <div className='portfolio-title'>INVESTORS COMPOSITION</div>
                    <Chart height={400}
                        data={dv} scale={cols} forceFit>
                        <Coord type={'theta'} radius={0.75} innerRadius={0.6} />
                        <Axis name='percent' />
                        <Legend position='right' offsetY={0} offsetX={-100} />
                        <Geom type='intervalStack' position='percent' color='item'
                            tooltip={[
                                'item*percent',
                                (item, percent) => {
                                    percent = (percent * 100).toFixed(2) + '%';
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
                            <Label content='percent' formatter={(val,item)=>{return item.point.item+': '+val}}/>
                        </Geom>
                    </Chart>
                </div>
            </div>
        );
    }
}

export default InvestorsComposition;
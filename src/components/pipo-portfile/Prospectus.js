import React, { Component } from 'react';
import { Chart, Geom, Axis, Coord, Label, Legend, Tooltip } from 'bizcharts'

import dataAccess from '../../model/dataAccess'

class Prospectus extends Component {
    constructor(props) {
        super(props);
        this.state = {
            education: '',
            career: '',
            purpose: '',
            incomes: [
                {
                    year: 1999,
                    value: 1000
                },
                {
                    year: 2000,
                    value: 1500
                },
                {
                    year: 2001,
                    value: 3000
                },
                {
                    year: 2002,
                    value: 3500
                },
                {
                    year: 2003,
                    value: 5000
                },
                {
                    year: 2004,
                    value: 8000
                },
            ]
        }
    }

    componentDidMount = () => {
        let sendData = { pipoId: this.props.issueId };
        sendData = { issuer_id: 'P100002' };
        dataAccess.postData('/get_prospectus', sendData, (response) => {
            console.log(response);
            this.setState({
                education: response.data.education,
                career: response.data.career,
                purpose: response.data.purpose,
                incomes: response.data.income
            })
        })
    }


    render() {
        const cols = {
            value: {
                alias: 'expected income',
                min: 0,
            },
            year: {
                range: [0,1]
            }
        }

        return (
            <div className='tabPanel-container'>
                <div className='info-container'>
                    <div className='portfolio-title'>EDUCATION ANALYSIS</div>
                    <div className='para-container'>
                        <p>{this.state.education}</p>
                    </div>
                </div>
                <div className='info-container'>
                    <div className='portfolio-title'>CAREER ANALYSIS</div>
                    <div className='para-container'>
                        <p>{this.state.career}</p>
                    </div>
                </div>
                <div className='info-container'>
                    <div className='portfolio-title'>PURPOSE</div>
                    <div className='para-container'>
                        <p>{this.state.purpose}</p>
                    </div>
                </div>
                <div className='info-container'>
                    <div className='portfolio-title'>EXPECTATION OF INCOME</div>
                    <Chart height={400} data={this.state.incomes} scale={cols} forceFit>
                        <Axis name="year" />
                        <Axis name="income"
                            label={{
                                formatter: val => `${(val / 1000).toFixed(1)}k`
                            }} />
                        <Tooltip crosshairs={{type:'y'}} />
                        <Geom type='line' position='year*value' size={2} shape={'smooth'} />
                        <Geom type='point' position='year*value' size={4} shape={'circle'} style={{stroke:'#fff',lineWidth:1}}/>
                    </Chart>
                </div>
            </div>
        );
    }
}

export default Prospectus;
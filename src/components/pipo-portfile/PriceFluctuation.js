import React, { Component } from 'react';
import { Chart, Geom, Axis, Coord, Label, Legend } from 'bizcharts'
import DataSet from '@antv/data-set'

import dataAccess from '../../model/dataAccess'

class PriceFluctuation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            prices: []
        }
    }

    componentDidMount = () => {
        let sendData = { pipoId: this.props.issueId };
        dataAccess.postData('/', sendData, (response) => {
            console.log(response);
            this.setState({
                prices: response.data.prices
            })
        })
    }

    render() {
        return (
            <div className='tabPanel-container'>
                <div className='info-container'>
                    <div className='portfolio-title'>PRICE FLUCTUATION</div>

                </div>
            </div>

        );
    }
}

export default PriceFluctuation;
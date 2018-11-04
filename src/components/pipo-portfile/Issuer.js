import React, { Component } from 'react';
import { Icon } from 'antd'

import dataAccess from '../../model/dataAccess'

class Issuer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            issuerInfo: {
                issuer_id:'',

            }

        };
    }

    componentDidMount = () => {
        let sendData = { issuer_id: 'P100002' };
        dataAccess.postData('/get_issue_profile', sendData, (response) => {
            console.log('get_issuer_profile', response.data);
            this.setState({
                issuerInfo:response.data
            })
        })
    }

    render() {
        return (
            <div className='tabPanel-container'>
                <div className='info-container'>
                    <div className='portfolio-title'>PERSONAL INFORMATION</div>
                    <div className='information-container'>
                        <div className='information-container-left'>
                            <div className='pic-holder'><Icon type='user' style={{ fontSize: '98px', color: 'rgba(16,142,233,0.1)' }} /></div>
                            <p style={{ textAlign: 'center' }}><b>ID: {this.state.issuerInfo.issuer_id}</b></p>
                        </div>
                        <div className='information-container-right'>
                            <div className='information-row'>
                                <div className='information-label'>NAME</div>
                                <p>{this.state.issuerInfo.first_name} {this.state.issuerInfo.last_name}</p>
                            </div>
                            <div className='information-row'>
                                <div className='information-label'>GENDER</div>
                                <p>{this.state.issuerInfo.gender}</p>
                            </div>
                            <div className='information-row'>
                                <div className='information-label'>AGE</div>
                                <p>{this.state.issuerInfo.age}</p>
                            </div>
                            <div className='information-row'>
                                <div className='information-label'>OCCUPATION</div>
                                <p>{this.state.issuerInfo.occupation}</p>
                            </div>
                            <div className='information-row'>
                                <div className='information-label'>INCOME</div>
                                <p>{this.state.issuerInfo.income_last12month}</p>
                            </div>
                        </div>
                        <div className='information-container-right'>
                            <div className='information-row'>
                                <div className='information-label-2'>EDUCATION</div>
                                <p>{this.state.issuerInfo.education_level}</p>
                            </div>
                            <div className='information-row'>
                                <div className='information-label-2'>MAJOR</div>
                                <p>{this.state.issuerInfo.major}</p>
                            </div>
                            <div className='information-row'>
                                <div className='information-label-2'>MARITAL STATUS</div>
                                <p>{this.state.issuerInfo.marry}</p>
                            </div>
                            <div className='information-row'>
                                <div className='information-label-2'>NUMBER OF KIDS</div>
                                <p>{this.state.issuerInfo.kids}</p>
                            </div>
                            <div className='information-row'>
                                <div className='information-label-2'>HOUSE TENURE</div>
                                <p>{this.state.issuerInfo.house}</p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className='info-container'>
                    <div className='portfolio-title'>CREDIT SCORE</div>
                </div> */}
            </div>
        );
    }
}

export default Issuer;
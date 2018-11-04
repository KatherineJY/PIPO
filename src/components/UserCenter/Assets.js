import React, { Component } from 'react';

import InvestorAssets from './InvestorAssets'
import IssuerAssets from './IssuerAssetes'

class Assets extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userType: 0,
            ratio: 3
        }
    }

    render() {
        return (
            <div>
                {
                    this.state.userType==0 ? <InvestorAssets />:<IssuerAssets />
                }
            </div>
        );
    }
}

export default Assets;
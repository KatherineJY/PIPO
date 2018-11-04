import React, { Component } from 'react';
import { Tabs, Steps, Button, Icon, InputNumber } from 'antd';

import '../../assets/css/issue.css'
import PipoMarket from './PipoMarket'
import SellList from './SellList'
import BuyList from './BuyList'


const TabPane = Tabs.TabPane;



class InvestMain extends Component {



    render() {
        return (
            <div className='main-component-holder'>
                <Tabs defaultActiveKey='1' tabPosition='left'  >
                    <TabPane tab='Issuer list' key='1'>
                      <PipoMarket />
                    </TabPane>
                    <TabPane tab='On-sell list' key='2'>
                        <SellList />
                    </TabPane>
                    <TabPane tab='Buy-back list' key='3'>
                        <BuyList />
                    </TabPane>
                </Tabs>
            </div>
        );
    }
}

export default InvestMain;
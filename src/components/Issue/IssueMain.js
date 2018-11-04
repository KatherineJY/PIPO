import React, { Component } from 'react';
import { Tabs, Steps, Button, Icon, InputNumber } from 'antd';
import IssuePiPO from './IssuePIPO'
import Buyback from './Buyback';
import '../../assets/css/issue.css'


const TabPane = Tabs.TabPane;



class IssueMain extends Component {



    render() {
        return (
            <div className='component-holder'>
                <Tabs defaultActiveKey='1' tabPosition='left'  >
                    <TabPane tab='Issue PIPO' key='1'>
                        <IssuePiPO />
                    </TabPane>
                    <TabPane tab='Buyback' key='2'>
                        <Buyback />
                    </TabPane>
                    <TabPane tab='Dividened' key='3'>
                        <InputNumber placeholder="please input your income" min={0}/>
                        <Button type='primary'>Submit</Button>
                    </TabPane>
                </Tabs>
            </div>
        );
    }
}

export default IssueMain;
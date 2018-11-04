import React, { Component } from 'react';
import {Icon,Button} from 'antd'
import {Link} from 'react-router-dom'

class IssueSubmit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            issueSuccess: true
        };
    }

    render() {
        return (
            <div className="send-data-panel">
                {
                    this.state.issueSuccess ? (<div>
                        <Icon type="check-circle" theme='twoTone' twoToneColor='#52c41a' />
                        <h3>Issue Successfully</h3>
                        <p>Hello,.</p>
                        <p>It's time to explore the PIPO market, </p>
                        {/* {this.props.userType == 0 ? (<p>bid for the desired PIPO, and manage your assets.</p>) : (<p>issue your own PIPO, and manage your assets.</p>)}
                        {this.props.userType == 0 ? (<Button type='primary'><Link to='/invest'>To Invest</Link></Button>) : (<Button type='primary'>To Issue</Button>)}
                        <Button style={{ marginLeft: '8px' }}>To Personal Center</Button> */}
                    </div>) : (<div><Icon type="loading" /><p>sending data to server...</p></div>)
                }
            </div>
        );
    }
}

export default IssueSubmit;
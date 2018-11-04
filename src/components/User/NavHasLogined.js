import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';

import storage from '../../model/storage'

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;


class NavHasLogined extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loginInfo: this.props.loginInfo
        };
    }

    handleOnclick = (e) => {
        let menuType = e.key;
        if( menuType=='log-out' ) {
            let tempUserData = this.state.loginInfo;
            tempUserData.isLogin = false;
            storage.set('loginInfo',tempUserData);
            this.setState({loginInfo:tempUserData});
            this.props.setLoginInfo(tempUserData);
        }
    }

    render() {
        return (
            <div>
                <Menu mode="horizontal" theme="dark" selectable={false}>
                    <SubMenu key="2" title={<span><Icon type='user' theme='outlined' />{this.state.loginInfo.firstName}{this.state.loginInfo.lastName}</span>}>
                        <MenuItemGroup key="brief" className="brief-info-container" title={<span><Icon type='profile' theme='outlined' />Brief Info</span>}>
                            <Menu.Item key="brief1">{this.state.loginInfo.isInvester?'Investor':'Issuer'}</Menu.Item>
                        </MenuItemGroup>
                        <Menu.Item key="group1" ><Link to='/'><Icon type='heart' theme='outlined' />Prefer</Link></Menu.Item>
                        <Menu.Item key="group3" ><Link to='/'><Icon type='setting' theme='outlined' />User Center</Link></Menu.Item>
                        <Menu.Item  onClick={this.handleOnclick} key="log-out" ><Link to='/'>Log Out</Link></Menu.Item>
                    </SubMenu>
                </Menu>
            </div>
        );
    }
}

export default NavHasLogined;
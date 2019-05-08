import React, {Component} from 'react';
import {Layout, Menu, Icon} from 'antd';
import history from '../services/common/history';

const {Header, Sider, Content, Footer} = Layout;
const SubMenu = Menu.SubMenu;

export default class AppContainer extends Component {

    state = {
        collapsed: false,
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    switchItem = (item) => {
        history.push("/" + item);
    };

    render() {
        return <div id="app-container">
            <Layout>
                <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
                    {/*<div className="logo"> <img src={process.env.PUBLIC_URL + '/logo.png'} style={{height: 20, width: 120}}/>Admin</div>*/}
                    <div className="logo">拍一拍 ADMIN</div>
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                        <SubMenu key="sub1" title={<span><Icon type="setting" /><span>系统管理</span></span>}>
                            <Menu.Item key="1" onClick={() => this.switchItem("systemSettings")}>系统设置</Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub2" title={<span><Icon type="hdd" /><span>订单管理</span></span>}>
                            <Menu.Item key="2" onClick={() => this.switchItem("order")}>订单</Menu.Item>
                            <Menu.Item key="3" onClick={() => this.switchItem("trade")}>交易</Menu.Item>
                            <Menu.Item key="4" onClick={() => this.switchItem("report")}>报表</Menu.Item>
                            <Menu.Item key="5" onClick={() => this.switchItem("failedRequest")}>异常请求</Menu.Item>
                        </SubMenu>
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{background: '#291024', padding: 0, transition: 'all 0.2'}}>
                        <Icon className="trigger" type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} onClick={this.toggle}/>
                    </Header>
                    <Content style={{margin: '24px 16px 0 16px', padding: '24px 24px 0 24px', background: '#fff', minHeight: 280}}>
                        {this.props.children}
                    </Content>
                    <Footer style={{textAlign: 'center', padding: 6}}>
                        ©2019 Created by Derivex
                    </Footer>
                </Layout>
            </Layout>
        </div>
    }
}
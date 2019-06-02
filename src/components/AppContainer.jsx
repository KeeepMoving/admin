import React, {Component} from 'react';
import {Layout, Menu, Icon} from 'antd';
import history from '../services/common/history';
import {getUsername, isLogin} from "../services/common/sessionStorage";

const {Header, Sider, Content, Footer} = Layout;
const SubMenu = Menu.SubMenu;

export default class AppContainer extends Component {

    state = {
        collapsed: false,
        isLogin: false
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    switchItem = (item) => {
        history.push("/" + item);
    };

    componentDidMount() {
        let login = isLogin();
        this.updateLoginStatus(login);
        if (!login) {
            history.push("/login");
        }
    }

    updateLoginStatus = (status) => {
        this.setState({
            isLogin: status
        });
    };

    render() {
        return <div id="app-container">
            <Layout>
                <Sider trigger={null} collapsible collapsed={this.state.collapsed} hidden={!this.state.isLogin}>
                    <div className="logo">拍一拍 ADMIN</div>
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                        <SubMenu key="sub1" title={<span><Icon type="setting" /><span>系统管理</span></span>}>
                            <Menu.Item key="1" onClick={() => this.switchItem("systemSettings")}>系统设置</Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub2" title={<span><Icon type="hdd" /><span>订单管理</span></span>}>
                            <Menu.Item key="2" onClick={() => this.switchItem("order")}>订单</Menu.Item>
                            <Menu.Item key="3" onClick={() => this.switchItem("trade")}>交易</Menu.Item>
                            <Menu.Item key="4" onClick={() => this.switchItem("failedRequest")}>异常请求</Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub3" title={<span><Icon type="table" /><span>报表管理</span></span>}>
                            <Menu.Item key="5" onClick={() => this.switchItem("orderReport")}>订单报表</Menu.Item>
                            <Menu.Item key="6" onClick={() => this.switchItem("earningReport")}>收益报表(DX)</Menu.Item>
                            <Menu.Item key="7" onClick={() => this.switchItem("selfEarningReport")}>收益报表(AOS)</Menu.Item>
                            <Menu.Item key="8" onClick={() => this.switchItem("contractReport")}>合约报表</Menu.Item>
                        </SubMenu>
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{background: '#291024', padding: 0, transition: 'all 0.2'}} >
                        <Icon className="trigger" type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} onClick={this.toggle} hidden={!this.state.isLogin}/>
                        <Icon type="user" />{getUsername()}
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
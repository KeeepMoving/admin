import React, {Component} from 'react';
import {Collapse, Card, Form, Input, Select, Col, Row, Button, message} from 'antd';
import {getSystemSettings, updateSystemSettings, getSystemStatus, switchSystemStatus} from "../../services/system/SystemSettingsService";

const Panel = Collapse.Panel;
const Option = Select.Option;
class SystemSettings extends Component {

    state = {
        settings: {},
        bakSettings: {},
        systemStatus: {
            robot: {
                systemStatus: 'DOWN',
                income: 0
            },
            mouse: {
                systemStatus: 'DOWN',
                income: 0
            }
        }
    };

    componentDidMount() {
        getSystemSettings((response) => {
            this.setState({
                settings: response.data,
                bakSettings: JSON.parse(JSON.stringify(response.data))
            })
        });
        getSystemStatus((response) => {
            this.setState({
                systemStatus: response.data,
            })
        });
    }

    handleInputFilterChange = (e) => {
        const settings = { ...this.state.settings };
        settings[e.target.name] = e.target.value;
        this.setState({
            settings: settings
        })
    };

    handleSelectFilterChange = (name, value) => {
        const settings = { ...this.state.settings };
        settings[name] = value;
        this.setState({
            settings: settings
        })
    };

    handleUpdateSettings = () => {
        if (JSON.stringify(this.state.settings) === JSON.stringify(this.state.bakSettings)) {
            message.warn('没有任何更新');
        } else {
            updateSystemSettings(this.state.settings);
        }
    };

    handleSwitchSystemStatus = (service, action) => {
        switchSystemStatus({
            service: service,
            action: action
        }, () => getSystemStatus((response) => {
            this.setState({
                systemStatus: response.data,
            })
        }));
    };

    getDefaultOptions = (max) => {
        let options = [];
        for (let i = 1; i <= max; i++) {
            options.push(<Option key={i} value={i}>{i}</Option>);
        }
        return options;
    };

    render() {
        return <div>
            <Collapse defaultActiveKey={['1', '2']}>
                <Panel header="系统状态" key="1" className="system-status-container">
                    <table>
                        <thead>
                            <tr>
                                <th>设备</th>
                                <th>状态</th>
                                <th>余额</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>机器人</td>
                                <td><span className={this.state.systemStatus.robot.systemStatus === "ENABLED" ? "gain" : "loss"}>{this.state.systemStatus.robot.systemStatus}</span></td>
                                <td><span>{this.state.systemStatus.robot.income}</span></td>
                                <td>
                                    <Button size='small' disabled={this.state.systemStatus.robot.systemStatus === "DOWN" || this.state.systemStatus.robot.systemStatus === "ENABLED"}
                                            type="primary" onClick={() => this.handleSwitchSystemStatus("robot", "enable")}>ENABLE</Button> &nbsp;
                                    <Button size='small' disabled={this.state.systemStatus.robot.systemStatus === "DOWN" || this.state.systemStatus.robot.systemStatus === "DISABLED"}
                                            type="danger" onClick={() => this.handleSwitchSystemStatus("robot", "disable")}>DISABLE</Button>
                                </td>
                            </tr>
                            <tr>
                                <td>小老鼠</td>
                                <td><span className={this.state.systemStatus.mouse.systemStatus === "ENABLED" ? "gain" : "loss"}>{this.state.systemStatus.mouse.systemStatus}</span></td>
                                <td><span>{this.state.systemStatus.mouse.income}</span></td>
                                <td>
                                    <Button size='small' disabled={this.state.systemStatus.mouse.systemStatus === "DOWN" || this.state.systemStatus.mouse.systemStatus === "ENABLED"}
                                            type="primary" onClick={() => this.handleSwitchSystemStatus("mouse", "enable")}>ENABLE</Button> &nbsp;
                                    <Button size='small' disabled={this.state.systemStatus.mouse.systemStatus === "DOWN" || this.state.systemStatus.mouse.systemStatus === "DISABLED"}
                                            type="danger" onClick={() => this.handleSwitchSystemStatus("mouse", "disable")}>DISABLE</Button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </Panel>
                <Panel header="参数设置" key="2">
                    <Row gutter={24}>
                        <Col span={12}>
                            <Card size='small' title="机器人设置" bordered={true} headStyle={{backgroundColor: '#eff1f4'}}>
                                <Row gutter={24}>
                                    <Col span={12} key={1}>
                                        <Form.Item label="下单间隔(秒)">
                                            <Select name="robotOrderPeriod" value={this.state.settings.robotOrderPeriod}
                                                    onChange={(value) => this.handleSelectFilterChange("robotOrderPeriod", value)}>
                                                {this.getDefaultOptions(10)}
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                    <Col span={12} key={2}>
                                        <Form.Item label="最大头寸">
                                            <Input name="robotMaxMargin" type="number" value={this.state.settings.robotMaxMargin} onChange={this.handleInputFilterChange}/>
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={24}>
                                    <Col span={12} key={1}>
                                        <Form.Item label="最小倍数率">
                                            <Input name="robotMinMultipleRate" type="number" value={this.state.settings.robotMinMultipleRate} onChange={this.handleInputFilterChange}/>
                                        </Form.Item>
                                    </Col>
                                    <Col span={12} key={2}>
                                        <Form.Item label="最大倍数率">
                                            <Input name="robotMaxMultipleRate" type="number" value={this.state.settings.robotMaxMultipleRate} onChange={this.handleInputFilterChange}/>
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={24}>
                                    <Col span={12} key={1}>
                                        <Form.Item label="最小下单份数">
                                            <Input name="robotMinQuantity" type="number" value={this.state.settings.robotMinQuantity} onChange={this.handleInputFilterChange}/>
                                        </Form.Item>
                                    </Col>
                                    <Col span={12} key={2}>
                                        <Form.Item label="最大下单份数">
                                            <Input name="robotMaxQuantity" type="number" value={this.state.settings.robotMaxQuantity} onChange={this.handleInputFilterChange}/>
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                        <Col span={12}>
                            <Card size='small' title="小老鼠设置" bordered={true} headStyle={{backgroundColor: '#eff1f4'}}>
                                <Row gutter={24}>
                                    <Col span={12} key={1}>
                                        <Form.Item label="下单间隔(秒)">
                                            <Select name="mouseOrderPeriod" value={this.state.settings.mouseOrderPeriod}
                                                    onChange={(value) => this.handleSelectFilterChange("mouseOrderPeriod", value)}>
                                                {this.getDefaultOptions(10)}
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                    <Col span={12} key={2}>
                                        <Form.Item label="最大头寸">
                                            <Input name="mouseMaxPremium" type="number" value={this.state.settings.mouseMaxPremium} onChange={this.handleInputFilterChange}/>
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={24}>
                                    <Col span={12} key={1}>
                                        <Form.Item label="最小下单份数">
                                            <Input name="mouseMinQuantity" type="number" value={this.state.settings.mouseMinQuantity} onChange={this.handleInputFilterChange}/>
                                        </Form.Item>
                                    </Col>
                                    <Col span={12} key={2}>
                                        <Form.Item label="最大下单份数">
                                            <Input name="mouseMaxQuantity" type="number" value={this.state.settings.mouseMaxQuantity} onChange={this.handleInputFilterChange}/>
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={24}>
                                    <Col span={12} key={1}>
                                        <Form.Item label="最小倍数率">
                                            <Input name="mouseMinMultipleRate" type="number" value={this.state.settings.mouseMinMultipleRate} onChange={this.handleInputFilterChange}/>
                                        </Form.Item>
                                    </Col>
                                    <Col span={12} key={1}>
                                        <Form.Item label="成交比例">
                                            <Input name="mouseSelfTradeRate" type="number" value={this.state.settings.mouseSelfTradeRate} onChange={this.handleInputFilterChange}/>
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                    </Row>
                    <Row gutter={24}>
                        <Col span={12} key={1}>
                            <Form.Item label="行权概率">
                                <Input name="exercisedProb" type="number" value={this.state.settings.exercisedProb} onChange={this.handleInputFilterChange}/>
                            </Form.Item>
                        </Col>
                        <Col span={12} key={2}>
                            <Form.Item label="action">
                                <Button type="primary" onClick={this.handleUpdateSettings}>提交更新</Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Panel>
            </Collapse>
        </div>
    }
}

export default SystemSettings;
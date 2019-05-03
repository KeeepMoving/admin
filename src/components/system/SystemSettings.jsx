import React, {Component} from 'react';
import {Card, Form, Input, Select, Col, Row, Button, message} from 'antd';
import {getSystemSettings, updateSystemSettings} from "../../services/system/SystemSettingsService";

const Option = Select.Option;
class SystemSettings extends Component {

    state = {
        settings: {},
        bakSettings: {}
    };

    componentDidMount() {
        getSystemSettings((response) => {
            this.setState({
                settings: response.data,
                bakSettings: JSON.parse(JSON.stringify(response.data))
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

    getDefaultOptions = (max) => {
        let options = [];
        for (let i = 1; i <= max; i++) {
            options.push(<Option key={i} value={i}>{i}</Option>);
        }
        return options;
    };

    render() {
        return <div>
            <Button type="primary" onClick={this.handleUpdateSettings}>提交更新</Button>
            <Row gutter={16}>
                <Col span={8}>
                    <Card title="行权周期设置" bordered={true} headStyle={{backgroundColor: '#eff1f4'}}>
                        <Form.Item label="行权周期(分)">
                            <Select name="exercisePeriod" value={this.state.settings.exercisePeriod} onChange={(value) => this.handleSelectFilterChange("exercisePeriod", value)}>
                                <Option value="5">5</Option>
                                <Option value="10">10</Option>
                                <Option value="15">15</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label="交易周期(分))">
                            <Select name="tradePeriod" value={this.state.settings.tradePeriod} onChange={(value) => this.handleSelectFilterChange("tradePeriod", value)}>
                                {this.getDefaultOptions(15)}
                            </Select>
                        </Form.Item>
                    </Card>
                </Col>
                <Col span={8}>
                    <Card title="机器人设置" bordered={true} headStyle={{backgroundColor: '#eff1f4'}}>
                        <Form.Item label="下单间隔(秒)">
                            <Select name="robotOrderPeriod" value={this.state.settings.robotOrderPeriod} onChange={(value) => this.handleSelectFilterChange("robotOrderPeriod", value)}>
                                {this.getDefaultOptions(10)}
                            </Select>
                        </Form.Item>
                        <Form.Item label="最小倍数率">
                            <Input name="robotMinMultipleRate" type="number" value={this.state.settings.robotMinMultipleRate} onChange={this.handleInputFilterChange}/>
                        </Form.Item>
                        <Form.Item label="最大倍数率">
                            <Input name="robotMaxMultipleRate" type="number" value={this.state.settings.robotMaxMultipleRate} onChange={this.handleInputFilterChange}/>
                        </Form.Item>
                        <Form.Item label="最大下单份数">
                            <Input name="robotMaxQuantity" type="number" value={this.state.settings.robotMaxQuantity} onChange={this.handleInputFilterChange}/>
                        </Form.Item>
                    </Card>
                </Col>
                <Col span={8}>
                    <Card title="小老鼠设置" bordered={true} headStyle={{backgroundColor: '#eff1f4'}}>
                        <Form.Item label="下单间隔(秒)">
                            <Select name="mouseOrderPeriod" value={this.state.settings.mouseOrderPeriod} onChange={(value) => this.handleSelectFilterChange("mouseOrderPeriod", value)}>
                                {this.getDefaultOptions(10)}
                            </Select>
                        </Form.Item>
                        <Form.Item label="最小倍数率">
                            <Input name="mouseMinMultipleRate" type="number" value={this.state.settings.mouseMinMultipleRate} onChange={this.handleInputFilterChange}/>
                        </Form.Item>
                        <Form.Item label="最大下单份数">
                            <Input name="mouseMaxQuantity" type="number" value={this.state.settings.mouseMaxQuantity} onChange={this.handleInputFilterChange}/>
                        </Form.Item>
                    </Card>
                </Col>
            </Row>
        </div>
    }
}

export default SystemSettings;
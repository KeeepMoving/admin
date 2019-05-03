import React, {Component} from 'react';
import { Table, Form, Input, Select, DatePicker, Button } from 'antd';
import moment from 'moment';
import constants from '../../data/constants';
import {getFailedRequests} from "../../services/order/FailedRequestService"
import {getFormattedDateString} from "../../utils/commonUitl";

const Option = Select.Option;
const {RangePicker} = DatePicker;
const columns = [{
    title: '订单号',
    dataIndex: 'orderId',
    width: 200
}, {
    title: '产品类型',
    dataIndex: 'category',
    width: 100,
    render: category => {
        return category === "DCO" ? "牛宝" : "熊宝";
    }
},{
    title: '订单类型',
    dataIndex: 'orderType',
    width: 100,
    render: orderType => {
        return orderType === "S" ? "卖" : "买";
    }
}, {
    title: '倍数',
    dataIndex: 'multiple',
    width: 80
}, {
    title: '份数',
    dataIndex: 'quantity',
    width: 80
}, {
    title: '描述',
    dataIndex: 'description',
    textWrap: 'word-break',
}, {
    title: '创建时间',
    dataIndex: 'createdTime',
    width: 200,
    render: createdTime => {
        return getFormattedDateString(createdTime);
    }
}];

export default class FailedRequest extends Component {
    state = {
        data: [],
        pagination: {
            current: 1,
            pageSize: constants.page.pageSize
        },
        loading: false,
        filter: {
            orderId: null,
            category: "All",
            orderType: "All",
            createdTime: null
        }
    };

    componentDidMount() {
        this.fetch();
    }

    handleInputFilterChange = (e) => {
        const filter = { ...this.state.filter };
        filter[e.target.name] = e.target.value;
        this.setState({
            filter: filter
        })
    };

    handleSelectFilterChange = (name, value) => {
        const filter = { ...this.state.filter };
        filter[name] = value;
        this.setState({
            filter: filter
        })
    };

    handleDateFilterChange = (moments) => {
        const filter = { ...this.state.filter };
        filter.createdTime = moments[0].format("x") + "-" + moments[1].format("x");
        this.setState({
            filter: filter
        })
    };

    handleTableChange = (pagination) => {
        const pager = { ...this.state.pagination };
        const filter = { ...this.state.filter };
        Object.keys(filter).forEach(key => {
            if (filter[key] === null || filter[key] === 'All') {
                delete filter[key];
            }
        });
        pager.current = pagination.current;
        this.setState({
            pagination: pager,
        });
        this.fetch({
            pageSize: pagination.pageSize,
            pageIndex: pagination.current,
            ...filter,
        });
    };

    handleSearch = () => {
        const filter = { ...this.state.filter };
        Object.keys(filter).forEach(key => {
            if (filter[key] === null || filter[key] === 'All') {
                delete filter[key];
            }
        });
        this.fetch({
            pageSize: this.state.pagination.pageSize,
            pageIndex: this.state.pagination.current,
            ...filter,
        });
    };

    handleResetFilter = () => {
        this.setState({
            filter: {
                orderId: null,
                category: "All",
                orderType: "All",
                createdTime: null
            }
        })
    };

    fetch = (params = {}) => {
        this.setState({ loading: true });
        getFailedRequests({
            pageSize: this.state.pagination.pageSize,
            pageIndex: this.state.pagination.current,
            ...params,
        }, data => {
            const pagination = { ...this.state.pagination };
            pagination.total = data.data.totalCount;
            this.setState({
                loading: false,
                data: data.data.records,
                pagination: pagination
            });
        });
    };

    render() {
        let filterElement = document.getElementById("search-container");
        let filterElementHeight = filterElement === null ? 0 : filterElement.offsetHeight;
        let tableHeight = document.body.clientHeight - filterElementHeight - 240;
        return (
            <div>
                <Form id="search-container" className="search-container">
                    <Input placeholder="订单号" name="orderId" value={this.state.filter.orderId} onChange={this.handleInputFilterChange}/>
                    <Select name="category" value={this.state.filter.category} onChange={(value) => this.handleSelectFilterChange("category", value)}>
                        <Option value="All">所有</Option>
                        <Option value="DCO">牛宝</Option>
                        <Option value="DPO">熊宝</Option>
                    </Select>
                    <Select value={this.state.filter.orderType} onChange={(value) => this.handleSelectFilterChange("orderType", value)}>
                        <Option value="All">所有</Option>
                        <Option value="B">买</Option>
                        <Option value="S">卖</Option>
                    </Select>
                    <RangePicker onChange={this.handleDateFilterChange} showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}/>
                    <Button type="primary" icon="search" onClick={this.handleSearch}>搜索</Button>&nbsp;
                    <Button onClick={this.handleResetFilter}>重置</Button>
                </Form>
                <Table
                    columns={columns}
                    rowKey={record => record.orderId}
                    dataSource={this.state.data}
                    pagination={this.state.pagination}
                    loading={this.state.loading}
                    onChange={this.handleTableChange}
                    scroll={{ y: tableHeight }}
                    size="small"
                />
            </div>
        );
    }
}

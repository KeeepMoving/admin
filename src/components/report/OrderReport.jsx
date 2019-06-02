import React, {Component} from 'react';
import { Table, Form, DatePicker, Button } from 'antd';
import moment from 'moment';
import constants from '../../data/constants';
import {getOrderReports} from "../../services/report/ReportService"
import {getFormattedDateString, getUuid} from "../../utils/commonUitl";

const {RangePicker} = DatePicker;
const columns = [{
    title: '牛宝买单下单量',
    dataIndex: 'dcoBOrderQuantity',
    width: 60
}, {
    title: '牛宝买单成交量',
    dataIndex: 'dcoBFilledQuantity',
    width: 70
}, {
    title: '牛宝买单部分成交量',
    dataIndex: 'dcoBPartialFilledQuantity',
    width: 80
}, {
    title: '熊宝买单下单量',
    dataIndex: 'dpoBOrderQuantity',
    width: 70
}, {
    title: '熊宝买单成交量',
    dataIndex: 'dpoBFilledQuantity',
    width: 70
}, {
    title: '熊宝买单部分成交量',
    dataIndex: 'dpoBPartialFilledQuantity',
    width: 80
}, {
    title: '牛宝卖单下单量',
    dataIndex: 'dcoSOrderQuantity',
    width: 70
}, {
    title: '牛宝卖单成交量',
    dataIndex: 'dcoSFilledQuantity',
    width: 70
}, {
    title: '牛宝卖单部分成交量',
    dataIndex: 'dcoSPartialFilledQuantity',
    width: 80
}, {
    title: '牛宝卖单撤单量',
    dataIndex: 'dcoSCanceledQuantity',
    width: 70
}, {
    title: '熊宝卖单下单量',
    dataIndex: 'dpoSOrderQuantity',
    width: 70
}, {
    title: '熊宝卖单成交量',
    dataIndex: 'dpoSFilledQuantity',
    width: 70
}, {
    title: '熊宝卖单部分成交量',
    dataIndex: 'dpoSPartialFilledQuantity',
    width: 80
}, {
    title: '熊宝卖单撤单量',
    dataIndex: 'dpoSCanceledQuantity',
    width: 70
}, {
    title: '机器人下单总量',
    dataIndex: 'robotQuantity',
    width: 90,
    render: robotQuantity => {
        return <span className="blob">{robotQuantity}</span>;
    }
}, {
    title: '小老鼠下单总量',
    dataIndex: 'mouseQuantity',
    width: 90,
    render: mouseQuantity => {
        return <span className="blob">{mouseQuantity}</span>;
    }
}, {
    title: '行权时间',
    dataIndex: 'exerciseTime',
    width: 150,
    render: exerciseTime => {
        return getFormattedDateString(exerciseTime);
    }
}, {
    title: '创建时间',
    dataIndex: 'createdTime',
    width: 150,
    render: createdTime => {
        return getFormattedDateString(createdTime);
    }
}];

export default class OrderReport extends Component {
    state = {
        data: [],
        pagination: {
            current: 1,
            pageSize: constants.page.pageSize
        },
        loading: false,
        filter: {
            exerciseTime: null,
            createdTime: null
        }
    };

    componentDidMount() {
        this.fetch();
    }

    handleCreatedDateFilterChange = (moments) => {
        const filter = { ...this.state.filter };
        filter.createdTime = moments[0].format("x") + "-" + moments[1].format("x");
        this.setState({
            filter: filter
        })
    };

    handleExerciseDateFilterChange = (moments) => {
        const filter = { ...this.state.filter };
        filter.exerciseTime = moments[0].format("x") + "-" + moments[1].format("x");
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
                exerciseTime: null,
                createdTime: null
            }
        })
    };

    fetch = (params = {}) => {
        this.setState({ loading: true });
        getOrderReports({
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
                    <RangePicker onChange={this.handleCreatedDateFilterChange} showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}/>
                    <RangePicker onChange={this.handleExerciseDateFilterChange} showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}/>
                    <Button type="primary" icon="search" onClick={this.handleSearch}>搜索</Button>&nbsp;
                    <Button onClick={this.handleResetFilter}>重置</Button>
                </Form>
                <Table
                    columns={columns}
                    rowKey={getUuid()}
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

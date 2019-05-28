import React, {Component} from 'react';
import { Table, Form, DatePicker, Button } from 'antd';
import moment from 'moment';
import constants from '../../data/constants';
import {getContractReports} from "../../services/order/ReportService"
import {getFormattedDateString, getUuid} from "../../utils/commonUitl";

const formatNumber = (value) => {
    return Number(value).toFixed(4);
};

const getEarningRender = (value) => {
    if (value > 0) {
        return <span className="gain">{formatNumber(value)}</span>;
    } else if (value < 0) {
        return <span className="loss">{formatNumber(value)}</span>
    } else {
        return <span>{value}</span>
    }
};
const {RangePicker} = DatePicker;
const columns = [{
    title: '行权时点指数',
    dataIndex: 'currentIndex',
    width: 100
}, {
    title: '牛宝行权价',
    dataIndex: 'dcoPrice',
    width: 100
}, {
    title: '牛宝行权差值',
    width: 100,
    render: item => {
        return getEarningRender(item.currentIndex - item.dcoPrice);
    }
}, {
    title: '熊宝行权价',
    dataIndex: 'dpoPrice',
    width: 100
}, {
    title: '熊宝行权差值',
    width: 100,
    render: item => {
        return getEarningRender(item.dpoPrice - item.currentIndex);
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

export default class ContractReport extends Component {
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
        getContractReports({
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
                    scroll={{ x: 800, y: tableHeight }}
                    size="small"
                />
            </div>
        );
    }
}

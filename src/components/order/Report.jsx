import React, {Component} from 'react';
import { Table, Form, Select, DatePicker, Button } from 'antd';
import moment from 'moment';
import constants from '../../data/constants';
import {getReports} from "../../services/order/ReportService"
import {getFormattedDateString, getUuid} from "../../utils/commonUitl";

const {RangePicker} = DatePicker;
const columns = [{
    title: '牛买量',
    dataIndex: 'dcoBOrderQuantity',
    width: 60
}, {
    title: '牛买成交量',
    dataIndex: 'dcoBFilledQuantity',
    width: 70
}, {
    title: '牛买部分成交量',
    dataIndex: 'dcoBPartialFilledQuantity',
    width: 80
}, {
    title: '熊买量',
    dataIndex: 'dpoBOrderQuantity',
    width: 70
}, {
    title: '熊买成交量',
    dataIndex: 'dpoBFilledQuantity',
    width: 70
}, {
    title: '熊买部分成交量',
    dataIndex: 'dpoBEarning',
    width: 80
}, {
    title: '牛卖量',
    dataIndex: 'dcoSOrderQuantity',
    width: 70
}, {
    title: '牛卖成交量',
    dataIndex: 'dcoSFilledQuantity',
    width: 70
}, {
    title: '牛卖分成交量',
    dataIndex: 'dcoSPartialFilledQuantity',
    width: 80
}, {
    title: '牛卖撤单量',
    dataIndex: 'dcoSCanceledQuantity',
    width: 70
}, {
    title: '熊卖量',
    dataIndex: 'dpoSOrderQuantity',
    width: 70
}, {
    title: '熊卖成交量',
    dataIndex: 'dpoSFilledQuantity',
    width: 70
}, {
    title: '熊卖部分成交量',
    dataIndex: 'dpoSPartialFilledQuantity',
    width: 80
}, {
    title: '熊卖撤单量',
    dataIndex: 'dpoSCanceledQuantity',
    width: 70
}, {
    title: '牛买收益',
    dataIndex: 'dcoBEarning',
    width: 80,
    render: dcoBEarning => {
        if (dcoBEarning > 0) {
            return <span className="gain">{dcoBEarning}</span>;
        } else if (dcoBEarning < 0) {
            return <span className="loss">{dcoBEarning}</span>
        } else {
            return <span>{dcoBEarning}</span>
        }
    }
}, {
    title: '熊买收益',
    dataIndex: 'dpoBEarning',
    width: 80,
    render: dpoBEarning => {
        if (dpoBEarning > 0) {
            return <span className="gain">{dpoBEarning}</span>;
        } else if (dpoBEarning < 0) {
            return <span className="loss">{dpoBEarning}</span>
        } else {
            return <span>{dpoBEarning}</span>
        }
    }
}, {
    title: '牛卖收益',
    dataIndex: 'dcoSEarning',
    width: 80,
    render: dcoSEarning => {
        if (dcoSEarning > 0) {
            return <span className="gain">{dcoSEarning}</span>;
        } else if (dcoSEarning < 0) {
            return <span className="loss">{dcoSEarning}</span>
        } else {
            return <span>{dcoSEarning}</span>
        }
    }
}, {
    title: '熊卖收益',
    dataIndex: 'dpoSEarning',
    width: 80,
    render: dpoSEarning => {
        if (dpoSEarning > 0) {
            return <span className="gain">{dpoSEarning}</span>;
        } else if (dpoSEarning < 0) {
            return <span className="loss">{dpoSEarning}</span>
        } else {
            return <span>{dpoSEarning}</span>
        }
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

export default class Trade extends Component {
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
        console.log('params:', params);
        this.setState({ loading: true });
        getReports({
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

import React, {Component} from 'react';
import { Table, Form, DatePicker, Button } from 'antd';
import moment from 'moment';
import constants from '../../data/constants';
import {getEarningReports} from "../../services/order/ReportService"
import {getFormattedDateString, getUuid} from "../../utils/commonUitl";

const {RangePicker} = DatePicker;
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
const getTotalEarningRender = (value) => {
    if (value > 0) {
        return <span className="gain-blob">{formatNumber(value)}</span>;
    } else if (value < 0) {
        return <span className="loss-blob">{formatNumber(value)}</span>
    } else {
        return <span>{value}</span>
    }
};
const columns = [{
    title: '牛买收益',
    dataIndex: 'dcoBEarning',
    width: 80,
    render: dcoBEarning => {
        return getEarningRender(dcoBEarning);
    }
}, {
    title: '牛卖收益',
    dataIndex: 'dcoSEarning',
    width: 80,
    render: dcoSEarning => {
        return getEarningRender(dcoSEarning);
    }
}, {
    title: '熊买收益',
    dataIndex: 'dpoBEarning',
    width: 80,
    render: dpoBEarning => {
        return getEarningRender(dpoBEarning);
    }
}, {
    title: '熊卖收益',
    dataIndex: 'dpoSEarning',
    width: 80,
    render: dpoSEarning => {
        return getEarningRender(dpoSEarning);
    }
}, {
    title: '机器人保证金',
    dataIndex: 'robotMargin',
    width: 100,
    render: robotMargin => {
        return formatNumber(robotMargin);
    }
}, {
    title: '机器人权利金',
    dataIndex: 'robotPremium',
    width: 100,
    render: robotPremium => {
        return formatNumber(robotPremium);
    }
}, {
    title: '机器人收益',
    dataIndex: 'robotEarning',
    width: 100,
    render: robotEarning => {
        return getTotalEarningRender(robotEarning);
    }
}, {
    title: '机器人手续费',
    dataIndex: 'robotFee',
    width: 100,
    render: robotFee => {
        return formatNumber(robotFee);
    }
}, {
    title: '机器人总收益',
    dataIndex: 'robotTotalEarning',
    width: 100,
    render: robotEarning => {
        return getTotalEarningRender(robotEarning);
    }
}, {
    title: '小老鼠权利金',
    dataIndex: 'mousePremium',
    width: 100,
    render: mousePremium => {
        return formatNumber(mousePremium);
    }
}, {
    title: '小老鼠收益',
    dataIndex: 'mouseEarning',
    width: 100,
    render: mouseEarning => {
        return getTotalEarningRender(mouseEarning);
    }
}, {
    title: '小老鼠手续费',
    dataIndex: 'mouseFee',
    width: 100,
    render: mouseFee => {
        return formatNumber(mouseFee);
    }
}, {
    title: '小老鼠总收益',
    dataIndex: 'mouseTotalEarning',
    width: 100,
    render: mouseEarning => {
        return getTotalEarningRender(mouseEarning);
    }
}, {
    title: '总收益',
    dataIndex: 'totalEarning',
    width: 80,
    render: totalEarning => {
        return getTotalEarningRender(totalEarning);
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
    render: createdTime => {
        return getFormattedDateString(createdTime);
    }
}];

export default class EarningReport extends Component {
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
        getEarningReports({
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

    footer = () => {
        let robot_total_earning = 0;
        let mouse_total_earning = 0;
        this.state.data.forEach((item) => {
            robot_total_earning += item.robotTotalEarning;
            mouse_total_earning += item.mouseTotalEarning;
        });
        return <div>
            <span>机器人合计收益: {getTotalEarningRender(robot_total_earning)}</span>&nbsp;&nbsp;
            <span>小老鼠合计收益: {getTotalEarningRender(mouse_total_earning)}</span>
        </div>;
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
                    footer={this.footer}
                />
            </div>
        );
    }
}

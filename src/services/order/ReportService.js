import http from '../common/http';
import constant from '../../data/constants';

const getReports = (params, successHandler) => {
    http.get(constant.api.getReports, params, successHandler,(error) => {})
};

const getEarningReports = (params, successHandler) => {
    http.get(constant.api.getEarningReports, params, successHandler,(error) => {})
};

const getOrderReports = (params, successHandler) => {
    http.get(constant.api.getOrderReports, params, successHandler,(error) => {})
};

export {
    getReports,
    getEarningReports,
    getOrderReports
}
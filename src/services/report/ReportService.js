import http from '../common/http';
import constant from '../../data/constants';

const getEarningReports = (params, successHandler) => {
    http.get(constant.api.getEarningReports, params, successHandler,(error) => {})
};

const getSelfEarningReports = (params, successHandler) => {
    http.get(constant.api.getSelfEarningReports, params, successHandler,(error) => {})
};

const getOrderReports = (params, successHandler) => {
    http.get(constant.api.getOrderReports, params, successHandler,(error) => {})
};

const getContractReports = (params, successHandler) => {
    http.get(constant.api.getContractReports, params, successHandler,(error) => {})
};

export {
    getEarningReports,
    getSelfEarningReports,
    getOrderReports,
    getContractReports
}
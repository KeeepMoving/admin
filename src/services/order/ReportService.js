import http from '../common/http';
import constant from '../../data/constants';

const getReports = (params, successHandler) => {
    http.get(constant.api.getReports, params, successHandler,(error) => {})
};

export {
    getReports
}
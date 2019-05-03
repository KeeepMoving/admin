import http from '../common/http';
import constant from '../../data/constants';

const getOrders = (params, successHandler) => {
    http.get(constant.api.getOrders, params, successHandler,(error) => {})
    // http.get('https://randomuser.me/api', params, successHandler,(error) => {})
};

export {
    getOrders
}
import http from '../common/http';
import constant from '../../data/constants';

const getTrades = (params, successHandler) => {
    http.get(constant.api.getTrades, params, successHandler,(error) => {})
};

export {
    getTrades
}
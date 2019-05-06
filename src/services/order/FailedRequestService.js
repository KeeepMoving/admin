import http from '../common/http';
import constant from '../../data/constants';

const getFailedRequests = (params, successHanler) => {
    http.get(constant.api.getFailedRequests, params, successHanler,(error) => {})
};

export {
    getFailedRequests
}
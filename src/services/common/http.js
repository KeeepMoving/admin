import axios from 'axios';
import {getToken} from "./sessionStorage";

//TODO enhance
const instance = axios.create();

instance.interceptors.request.use(
    config => {
        let token = getToken() || "";
        config.headers["Authorization"] = "Bearer_" + token;
        return config
    },
    error => {
        return Promise.reject(error)
    });

function get(url, data, successHandler, errorHander) {
    instance.get(url, {params: data})
        .then(function (response) {
            console.log(response);
            if(successHandler) {
                successHandler(response.data)
            }
        })
        .catch(function (error) {
            console.log(error);
            if(errorHander) {
                errorHander(error)
            }
        });
}

function post(url, data, successHandler, errorHandler) {
    instance.post(url, data)
        .then(function (response) {
            console.log(response);
            if(successHandler) {
                successHandler(response.data)
            }
        })
        .catch(function (error) {
            console.error(error);
            if(errorHandler) {
                errorHandler(error)
            }
        });
}

export default {
    get: get,
    post: post
}
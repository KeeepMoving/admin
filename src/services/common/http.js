import axios from 'axios';
import history from '../../services/common/history';
import {getToken, removeUser} from "./sessionStorage";
import {message} from "antd";

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

instance.interceptors.response.use(
    response => {
        return response
    },
    error => {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    message.error('登录过期，请重新登录！');
                    removeUser();
                    history.push("/login");
            }
        }
        return Promise.reject(error.response.data)
    });

function get(url, data, successHandler, errorHandler) {
    instance.get(url, {params: data})
        .then(function (response) {
            console.log(response);
            if(successHandler) {
                successHandler(response.data)
            }
        })
        .catch(function (error) {
            console.log(error);
            if(errorHandler) {
                errorHandler(error)
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
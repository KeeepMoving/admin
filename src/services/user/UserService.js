import http from '../common/http';
import constant from '../../data/constants';
import {message} from "antd";
import {addUser} from "../common/sessionStorage";

const loginUser = (user, callback) => {
    http.post(constant.api.loginUser, user, (response) => {
        if (!response.data.errorCode) {
            addUser(response.data.username, response.data.token);
            message.success('登录成功');
            callback(response);
        }
    }, (error) => {
        message.error('登录失败');
        console.log(error);
    })
};

export {
    loginUser
}
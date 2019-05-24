import http from '../common/http';
import constant from '../../data/constants';
import {message} from "antd";
import {addUser} from "../common/sessionStorage";

const loginUser = (user, callback) => {
    http.post(constant.api.loginUser, user, (response) => {
        if (!response.hasOwnProperty('errorCode')) {
            addUser(response.data.username, response.data.token);
            message.success('登录成功');
            callback(response);
        } else {
            if (response.errorCode == 'USERNAME_PASSWORD_NOT_MATCH') {
                message.error('密码不正确');
            }
            if (response.errorCode == 'RECORD_NOT_FOUND') {
                message.error('用户不存在');
            }
        }
    }, (error) => {
        message.error('登录失败');
        console.log(error);
    })
};

export {
    loginUser
}
import { message} from 'antd';
import http from '../common/http';
import constant from '../../data/constants';

const getSystemSettings = (successHandler) => {
    http.get(constant.api.getSystemSettings, null, successHandler,(error) => {
    })
};

const updateSystemSettings = (settings) => {
    http.post(constant.api.updateSystemSettings, settings, () => {
        message.success('更新成功');
    }, (error) => {
        message.success('更新失败');
        console.log(error);
    })
};

export {
    getSystemSettings,
    updateSystemSettings
}
import axios from 'axios';

//TODO enhance
const instance = axios.create();

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
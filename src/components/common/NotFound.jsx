import React, {Component} from 'react';

class NotFound extends Component {
    render() {
        return <div className="uk-container">
            <div className="notfound-container">
                <h2>抱歉，页面无法访问...</h2>
                <p>
                    可能原因：网址有错误 > 请检查地址是否完整或存在多余字符；网址已失效 > 可能页面已删除等
                </p>
            </div>
        </div>
    }
}

export default NotFound;
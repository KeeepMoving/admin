import React, {Component} from 'react';
import {Button, Form, Icon, Input} from 'antd';
import history from '../../services/common/history';
import {loginUser} from "../../services/user/UserService";

class Login extends Component {

    state = {
        username: "",
        password: ""
    };

    handleSubmit = e => {
        e.preventDefault();
        loginUser(this.state,() => {
            history.replace("/");
            window.location.reload();
        });
    };

    onUsernameChange = (e) => {
        this.setState({
            username: e.target.value
        })
    };

    onPasswordChange = (e) => {
        this.setState({
            password: e.target.value
        })
    };

    render() {
        return (
            <div className="login-container">
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <Form.Item>
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="用户名"
                            value={this.state.username}
                            onChange={this.onUsernameChange}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="密码"
                            value={this.state.password}
                            onChange={this.onPasswordChange}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

export default Login;


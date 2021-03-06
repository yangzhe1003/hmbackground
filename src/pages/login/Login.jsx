
import './Login.less';
import React from "react";
import { FetchPost } from '../../common.js';
import { login } from '../../apis.js';
import { Form, Icon, Input, Button, Card, message } from 'antd';
const FormItem = Form.Item;

const hasErrors = (fieldsError) => {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
};
class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            snackOpen: false,
            snackMsg: ''
        }
    }



    goNext(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                FetchPost(login, {
                    user_name: values.userName,
                    password: values.password
                }).then((res) => {
                    localStorage.setItem('user_name',res.data.user_name);
                    message.success('欢迎回来,'+res.data.user_name);
                    window.location.href = '/';
                })
            }
        });

    }


    render() {

        const { getFieldDecorator, getFieldsError } = this.props.form;

        return <div className="login">
            <div className="content animated hinge flash" >

                {/* <img src={ logoPng }/> */}

                <div className='login-box'>
                    <Card title='后台管理'>
                        <Form onSubmit={this.goNext.bind(this)}>
                            <FormItem>
                                { getFieldDecorator('userName', {
                                    rules: [{ required: true, message: '请输入用户名!' }],
                                })(
                                    <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Username" />
                                )}
                            </FormItem>
                            <FormItem>
                                { getFieldDecorator('password', {
                                    rules: [{ required: true, message: '请输入密码!' }],
                                })(
                                    <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />}
                                           type="password"
                                           placeholder="password" />
                                )}
                            </FormItem>
                            <FormItem>
                                <Button
                                    className='login-btn'
                                    type="primary"
                                    htmlType="submit"
                                    // onClick={ this.goNext.bind(this) }
                                    disabled={hasErrors(getFieldsError())}
                                >
                                    登录
                                </Button>
                            </FormItem>
                        </Form>
                    </Card>

                </div>
            </div>

        </div>
    }
}

Login = Form.create()(Login);

export default Login
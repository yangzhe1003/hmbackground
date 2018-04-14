import React from "react";
import { FetchGet, formItemLayout,tailFormItemLayout } from "../../common.js";
import { Button, Form, Input, InputNumber } from 'antd';
const Textarea = Input.TextArea;
const FormItem = Form.Item;


class AddGood extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    componentDidMount(){
        console.log("1111");
    }

    handleSubmit(e){
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);

            }
        });
    }
    render(){
        const { getFieldDecorator } = this.props.form;
        return <div>
            <h2>新增商品</h2>

            <div>
                <Form onSubmit={this.handleSubmit.bind(this)}>
                    <FormItem {...formItemLayout} label="商品名称">
                        {getFieldDecorator('name', {
                            rules: [{
                                required: true, message: '请输入商品名称!',
                            }],
                        })(
                            <Input placeholder="名称"/>
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="商品价格">
                        {getFieldDecorator('price', {
                            rules: [{
                                required: true, message: '请输入商品价格!',
                            }],
                        })(
                            <InputNumber  placeholder="价格"/>
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="商品型号">
                        {getFieldDecorator('model', {
                            rules: [{
                                required: true, message: '请输入商品型号!',
                            }],
                        })(
                            <Textarea placeholder="商品型号" rows={3}/>
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="商品描述">
                        {getFieldDecorator('detail', {
                            rules: [{
                                required: true, message: '请输入商品描述!',
                            }],
                        })(
                            <Textarea placeholder="商品描述" rows={4}/>
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="图标">
                        {getFieldDecorator('small_img', {
                            rules: [{
                                required: true, message: '请输入商品描述!',
                            }],
                        })(
                            <Input placeholder="商品描述" />
                        )}
                    </FormItem>


                    <FormItem {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">保存</Button>&nbsp;&nbsp;&nbsp;&nbsp;
                        <Button onClick={()=>{window.history.go(-1)}}>返回</Button>
                    </FormItem>
                </Form>
            </div>
        </div>
    }
}

AddGood = Form.create()(AddGood);

export default AddGood
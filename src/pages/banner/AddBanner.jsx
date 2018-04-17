import React from "react";
import { FetchGet, FetchPost, formItemLayout,tailFormItemLayout, searchToObj, IMGHeader } from "../../common.js";
import { getBannerById } from "../../apis.js";
import { Button, Form, Input, InputNumber, Select } from 'antd';
import ImgUpLoad from "../../component/ImgUpLoad.jsx";
import {editBanner, getAllGoods} from "../../apis";
const FormItem = Form.Item;
const Option = Select.Option;




class AddBanner extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            banner: {},
            goodsList: [],
            img_url: '',
            editId: ''
        }
    }

    componentDidMount(){
        if(this.props.location.search){
            this.setState({
                editId: searchToObj(this.props.location.search).editId
            },()=>{
                this.getBannerById();
            });
        }
        this.getAllGoods();
    }

    //通过id获取Banner
    getBannerById(){
        FetchGet(getBannerById,{
            id: this.state.editId
        }).then(res=>{
            this.setState({
                img_url: [{
                    uid: -1,
                    name: 'xxx.png',
                    status: 'done',
                    url: IMGHeader + res.data[0].img_url,
                }]
            });
            this.props.form.setFieldsValue({
                good_id: res.data[0].good_id,
                img_url: res.data[0].img_url
            });
        });
    }

    //获取商品列表
    getAllGoods(){
        FetchGet(getAllGoods,{}).then(res=>{

            this.setState({
                goodsList: res.data
            });
        });
    }

    handleChange(value) {
        console.log(`selected ${value}`);
    }

    handleSubmit(e){
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                FetchPost(editBanner, {
                    id: this.state.editId,
                    good_id: values.good_id,
                    img_url: values.img_url
                }).then(res=>{
                    window.history.go(-1);
                });
            }
        });
    }


    render(){
        const { editId, goodsList, img_url } = this.state;
        const { getFieldDecorator } = this.props.form;
        return <div>
            <h2>{editId? '编辑Banner' : '新增Banner'}</h2>
            <div>
                <Form onSubmit={this.handleSubmit.bind(this)}>
                    <FormItem {...formItemLayout} label="关联商品ID">
                        {getFieldDecorator('good_id', {
                            rules: [{
                                required: true, message: '请输入商品ID!',
                            }],
                        })(
                            <Select
                                showSearch
                                style={{ width: 200 }}
                                placeholder="Select a person"
                                optionFilterProp="children"
                                onChange={this.handleChange.bind(this)}
                                filterOption={(input, option) => {
                                    return option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0

                                }}
                            >
                                {

                                    goodsList.length?
                                        goodsList.map((item,index)=>{
                                            return <Option key={index} value={item.id}>{`${item.name}(${item.id})`}</Option>
                                        })
                                        : ''
                                }
                            </Select>
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="Banner">
                        {getFieldDecorator('img_url', {
                            rules: [{
                                required: true, message: '请上传Banenr!',
                            }],
                        })(
                            <ImgUpLoad onChange={(val)=>{ this.setState({img_url: ''}) }} editImg={ img_url }/>
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

AddBanner = Form.create()(AddBanner);

export default AddBanner
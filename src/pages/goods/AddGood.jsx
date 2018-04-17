import React from "react";
import { FetchGet, FetchPost, formItemLayout,tailFormItemLayout, searchToObj, IMGHeader } from "../../common.js";
import { Button, Form, Input, InputNumber, Select } from 'antd';
import ImgUpLoad from "../../component/ImgUpLoad.jsx";
import {getAllClassify, getGoodById, editGood} from "../../apis";
const Textarea = Input.TextArea;
const FormItem = Form.Item;
const Option = Select.Option;


class AddGood extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            classifyList: [],
            small_img: '',
            small_img: '',
            uploadImg1: '',
            uploadImg2: '',
            uploadImg3: '',
            detail1: '',
            detail2: '',
            detail3: ''
        }
    }

    componentDidMount(){
        if(this.props.location.search){
            this.setState({
                editId: searchToObj(this.props.location.search).editId
            },()=>{
                this.getGoodById();
            });
        }
        this.getAllClassify();
    }

    //获取商品分类
    getAllClassify(){
        FetchGet(getAllClassify,{}).then(res=>{
            this.setState({
                classifyList: res.data
            });

        });
    }

    //根据商品id获取所有信息
    getGoodById(){
        FetchGet(getGoodById,{
            id: this.state.editId
        }).then(res=>{
            console.log(res);
            const { classify_id, small_img, name, detail, model, price, img_url1, img_url2, img_url3, detail_url1, detail_url2, detail_url3 } = res.data[0];
            this.props.form.setFieldsValue({
                classify_id: classify_id,
                small_img: small_img,
                name: name,
                detail: detail,
                model: model,
                price: price,
                img_url1: img_url1,
                img_url2: img_url2,
                img_url3: img_url3,
                detail_url1: detail_url1,
                detail_url2: detail_url2,
                detail_url3: detail_url3
            });

            this.setState({
                small_img: [{
                    uid: -1,
                    name: 'xxx.png',
                    status: 'done',
                    url: IMGHeader + small_img,
                }],
                uploadImg1: [{
                    uid: -1,
                    name: 'xxx.png',
                    status: 'done',
                    url: IMGHeader + img_url1,
                }],
                uploadImg2: [{
                    uid: -1,
                    name: 'xxx.png',
                    status: 'done',
                    url: IMGHeader + img_url2,
                }],
                uploadImg3: [{
                    uid: -1,
                    name: 'xxx.png',
                    status: 'done',
                    url: IMGHeader + img_url3,
                }],
                detail1: [{
                    uid: -1,
                    name: 'xxx.png',
                    status: 'done',
                    url: IMGHeader + detail_url1,
                }],
                detail2: [{
                    uid: -1,
                    name: 'xxx.png',
                    status: 'done',
                    url: IMGHeader + detail_url2,
                }],
                detail3: [{
                    uid: -1,
                    name: 'xxx.png',
                    status: 'done',
                    url: IMGHeader + detail_url3,
                }],
            });
        })
    }

    handleSubmit(e){
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                FetchPost(editGood, {
                    id: this.state.editId,
                    classify_id: values.classify_id,
                    small_img: values.small_img,
                    name: values.name,
                    detail: values.detail,
                    model: values.model,
                    price: values.price,
                    img_url1: values.img_url1,
                    img_url2: values.img_url2,
                    img_url3: values.img_url3,
                    detail_url1: values.detail_url1,
                    detail_url2: values.detail_url2,
                    detail_url3: values.detail_url3
                }).then(res=>{
                    window.history.go(-1);
                });
            }
        });
    }

    render(){
        const { classifyList, small_img, uploadImg1, uploadImg2, uploadImg3, detail1, detail2, detail3 } = this.state;
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
                            <InputNumber style={{width: 120}}  placeholder="价格"/>
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="商品分类">
                        {getFieldDecorator('classify_id', {
                            rules: [{
                                required: true, message: '请输入商品分类!',
                            }],
                        })(
                            <Select style={{width: 120}} onChange={(val)=>{ console.log(val) }} placeholder="请选择分类">
                                {
                                    classifyList.length?
                                        classifyList.map((item,index)=>{
                                            return <Option key={index} value={item.id}>{item.name}</Option>
                                        })
                                        : ''
                                }
                            </Select>
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
                                required: true, message: '请上传图标!',
                            }],
                        })(
                            <ImgUpLoad onChange={(val)=>{ this.setState({small_img: ''}) }} editImg={ small_img }/>
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="banner1">
                        {getFieldDecorator('img_url1', {
                            rules: [{
                                required: true, message: '请上传banner!',
                            }],
                        })(
                            <ImgUpLoad onChange={(val)=>{ this.setState({uploadImg1: ''}) }} editImg={ uploadImg1 }/>
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="banner2">
                        {getFieldDecorator('img_url2', {
                            rules: [{
                                required: false, message: '请上传banner!',
                            }],
                        })(
                            <ImgUpLoad onChange={(val)=>{ this.setState({uploadImg2: ''}) }} editImg={ uploadImg2 }/>
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="banner3">
                        {getFieldDecorator('img_url3', {
                            rules: [{
                                required: false, message: '请上传banner!',
                            }],
                        })(
                            <ImgUpLoad onChange={(val)=>{ this.setState({uploadImg3: ''}) }} editImg={ uploadImg3 }/>
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="详情页1">
                        {getFieldDecorator('detail_url1', {
                            rules: [{
                                required: true, message: '请上传详情页!',
                            }],
                        })(
                            <ImgUpLoad onChange={(val)=>{ this.setState({detail1: ''}) }} editImg={ detail1 }/>
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="详情页2">
                        {getFieldDecorator('detail_url2', {
                            rules: [{
                                required: false, message: '请上传详情页!',
                            }],
                        })(
                            <ImgUpLoad onChange={(val)=>{ this.setState({detail2: ''}) }} editImg={ detail2 }/>
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="详情页3">
                        {getFieldDecorator('detail_url3', {
                            rules: [{
                                required: false, message: '请上传详情页!',
                            }],
                        })(
                            <ImgUpLoad onChange={(val)=>{ this.setState({detail3: ''}) }} editImg={ detail3 }/>
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
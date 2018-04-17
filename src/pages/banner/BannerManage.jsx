import React from "react";
import { FetchGet, IMGHeader } from "../../common.js";
import { getBanners } from "../../apis.js";
import { Button, Popconfirm, Table } from 'antd';
import {upOrDown} from "../../apis";
import { Link } from "react-router-dom";
import AddBanner from "./AddBanner";

class BannerManage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            bannerList: [],
            visible: false,
            editBanner: '',
            fileList: ''
        }
    }

    componentDidMount(){
        this.getBannerlist();
    }

    //获取banner列表
    getBannerlist(){
        FetchGet(getBanners).then(res=>{
            let arr = [];
            if(res.data.length){
                res.data.map((item,index)=>{
                    item.key = index+1;
                    arr.push(item);
                })
            }
            this.setState({
                bannerList: arr
            });
        }).catch(err=>{
            console.log(err)
        });
    }

    //banner上下架
    upOrDown(id,status){
        FetchGet(upOrDown,{
            type: 'banner',
            id: id,
            status: status === 1? 0 : 1
        }).then(res=>{
            console.log(res);
            this.getBannerlist();
        });
    }

    showModal (data){
        this.setState({
            visible: true,

        });

    }
    handleCancel (){
        const form = this.form;
        form.resetFields();
        this.setState({
            visible: false,
        });
    }
    handleCreate (){
        const form = this.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }

            console.log('Received values of form: ', values);
            form.resetFields();
            this.setState({ visible: false });
        });
    }
    saveFormRef (form){
        this.form = form;
    }

    render(){
        const { bannerList, editBanner, fileList } = this.state;
        const columns = [
            {
                title: '序号',
                dataIndex: 'key',
                key: 'key',
            }, {
                title: 'Banner',
                dataIndex: 'img_url',
                key: 'img_url',
                render: (text)=>{
                    return <div style={{width:"120px",height:"80px"}}>
                        <img src={IMGHeader + text} alt=""/>
                    </div>
                }
            }, {
                title: '关联商品ID',
                dataIndex: 'good_id',
                key: 'good_id',
            }, {
                title: '状态',
                dataIndex: 'status',
                key: 'status',
                render: (text)=>{
                    return text===1?
                        <span><span style={
                            {display: "inline-block",width:"10px",height:"10px",backgroundColor:"green",borderRadius:"50%"}
                        }></span>上架</span>
                        :
                        <span><span style={
                            {display: "inline-block",width:"10px",height:"10px",backgroundColor:"red",borderRadius:"50%"}
                        }></span>下架</span>
                }
            }, {
                title: '操作',
                key: 'action',
                render: (text, record) => {
                    return <div>
                        <Link to={`/addBanner?editId=${record.id}`}><Button type="primary">编辑</Button></Link>&nbsp;&nbsp;
                        <Popconfirm title={record.status===1?'确认下架':'确认上架'} onConfirm={this.upOrDown.bind(this,record.id,record.status)} okText="Yes" cancelText="No">
                            <Button type="primary">{record.status===1?'下架':'上架'}</Button>
                        </Popconfirm>

                    </div>
                }
            }
        ];
        return <div>
            <h2>Banner管理</h2>
            <div style={{overflow:'hidden'}}>
                <Link to={{ pathname: '/addBanner' }}><Button type="primary" style={{float:"right"}}>新增Banner</Button></Link>
            </div>
            <br/>
            <div>
                <Table columns={columns} dataSource={bannerList} />
            </div>

        </div>
    }
}


export default BannerManage
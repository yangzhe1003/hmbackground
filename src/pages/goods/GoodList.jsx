import React from 'react';
import { Table, Button, Popconfirm } from 'antd';
import { FetchGet } from '../../common.js';
import { getAllGoods, upOrDown } from '../../apis.js';
import { Link } from "react-router-dom";

class GoodList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            goodsList: []
        }
    }

    componentDidMount(){
        
        this.getAllGoods();
    }

    //获取商品列表
    getAllGoods(){
        FetchGet(getAllGoods,{}).then(res=>{
            let arr = [];
            if(res.data.length){
                res.data.map((item,index)=>{
                    item.key = index+1;
                    arr.push(item);
                })
            }
            this.setState({
                goodsList: arr
            });
        });
    }

    //商品上下架
    upOrDown(id,status){
        FetchGet(upOrDown,{
            type: 'goods',
            id: id,
            status: status === 1? 0 : 1
        }).then(res=>{
            console.log(res);
            this.getAllGoods();
        });
    }

    render(){
        const { goodsList } = this.state;
        const columns = [
            {
                title: '序号',
                dataIndex: 'key',
                key: 'key',
            }, {
                title: '商品名称',
                dataIndex: 'name',
                key: 'name',
            }, {
                title: '价格',
                dataIndex: 'price',
                key: 'price',
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
                title: '分类',
                dataIndex: 'classify_id',
                key: 'classify_id',
            }, {
                title: '操作',
                key: 'action',
                render: (text, record) => {
                    return <div>
                        <Link to={{ pathname: '/addGoods',query: record.id }}><Button type="primary">编辑</Button></Link>&nbsp;&nbsp;
                        <Popconfirm title={record.status===1?'确认下架':'确认上架'} onConfirm={this.upOrDown.bind(this,record.id,record.status)} okText="Yes" cancelText="No">
                            <Button type="primary">{record.status===1?'下架':'上架'}</Button>    
                        </Popconfirm>
                        
                    </div>
                }
            }
        ];
        return <div>
            <h2>商品列表</h2>
            <div>
                <Button type="primary">搜索</Button>
                <Link to={{ pathname: '/addGoods' }}><Button type="primary" style={{float:"right"}}>新增商品</Button></Link>
            </div><br/>
            <div>
                <Table columns={columns} dataSource={goodsList} />
            </div>
        </div>
    }
}


export default GoodList


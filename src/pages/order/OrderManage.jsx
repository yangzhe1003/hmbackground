import React from 'react';
import { FetchGet } from "../../common.js";
import { Table } from 'antd';
import { getAllOrder } from "../../apis";

class OrderManage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            orderList: []
        }
    }

    componentDidMount(){
        this.getAllOrder();
    }

    //获取订单列表
    getAllOrder(){

        FetchGet(getAllOrder).then(res => {
            let arr = [];
            if(res.data.length){
                res.data.map((item,index)=>{
                    item.key = index+1;
                    arr.push(item);
                })
            }
            this.setState({
                orderList: arr
            });
        });
    }

    render(){
        const { orderList } = this.state;
        const columns = [
            {
                title: '序号',
                dataIndex: 'key',
                key: 'key',
            }, {
                title: '用户ID',
                dataIndex: 'user_id',
                key: 'user_id',
            }, {
                title: '商品ID',
                dataIndex: 'goods_id',
                key: 'goods_id',
            }, {
                title: '价格',
                dataIndex: 'totalMoney',
                key: 'totalMoney',
            }, {
                title: '状态',
                dataIndex: 'status',
                key: 'status',
                render: (text)=>{
                    if(text === 1){
                        return <span>
                            <span style={
                                {display: "inline-block",width:"10px",height:"10px",backgroundColor:"orange",borderRadius:"50%"}
                            }></span>未发货</span>
                    }else if(text === 0){
                        return <span>
                            <span style={
                            {display: "inline-block",width:"10px",height:"10px",backgroundColor:"red",borderRadius:"50%"}
                        }></span>未付款</span>
                    }else {
                        return <span>
                            <span style={
                                {display: "inline-block",width:"10px",height:"10px",backgroundColor:"green",borderRadius:"50%"}
                            }></span>已发货</span>
                    }


                }
            },
        ];
        return <div>
            <h2>订单管理</h2>
            <div>
                <Table columns={columns} dataSource={orderList} />
            </div>
        </div>
    }
}

export default OrderManage
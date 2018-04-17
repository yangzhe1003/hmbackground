import React from "react";
import { Progress } from 'antd';
import { FetchGet } from "../../common.js";
import { getOrderCount, getGoodsCount, getUserCount } from "../../apis";

class Home extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            num: 0,
            order_count: 0,
            people_count: 0,
            goods_count: 0
        }
    }

    componentWillMount(){
        this.getDonghua();
        this.getData();
    }

    //获取首页数据
    getData(){
        FetchGet(getOrderCount).then(res => {
            this.setState({
                order_count: res.data[0].count
            });
        });
        FetchGet(getGoodsCount).then(res => {
            this.setState({
                goods_count: res.data[0].count
            });
        });
        FetchGet(getUserCount).then(res => {
            this.setState({
                people_count: res.data[0].count
            });
        });
    }

    //进场动画
    getDonghua(){
        setInterval(()=>{
            let num = this.state.num;
            if(num === 80 ){
                return ;
            }else {
                this.setState({
                    num: num+10
                });
            }

        },200)
    }

    render(){
        const { num, order_count, people_count, goods_count } = this.state;
        return <div style={{display:"flex",justifyContent:"space-around",paddingTop:"50px"}}>
            <div>
                <div>总订单</div>
                <Progress type="circle" percent={num} format={() => {
                    if(num === 80){
                        return order_count
                    }
                }}/>
            </div>
            <div>
                <div>用户量</div>
                <Progress type="circle" percent={num} format={() => {
                    if(num === 80){
                        return people_count
                    }
                }}/>
            </div>
            <div>
                <div>商品数</div>
                <Progress type="circle" percent={num} format={() => {
                    if(num === 80){
                        return goods_count
                    }
                }}/>
            </div>

        </div>
    }
}

export default Home
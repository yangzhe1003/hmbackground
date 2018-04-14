import React from "react";
import "./Layout.less";
import { Layout, Menu, Icon, Button, Popconfirm } from 'antd';
import { Link } from "react-router-dom";
import { FetchGet } from '../../common.js';
import { logout } from '../../apis.js';
const { Header, Content, Sider } = Layout;

class Mylayout extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            defaultSelectedKeys: ['1']
        }
    }

    componentWillMount(){
        switch(window.location.pathname){
            case "/":
                this.changeDefaultSelectedKeys(1);
                break;
            case "/goodList": 
                this.changeDefaultSelectedKeys(2);
                break;
            case "/classify":
                this.changeDefaultSelectedKeys(3);
                break;
            case "/addGoods":
                this.changeDefaultSelectedKeys(2);
                break;
            default:

        }
    }

    changeDefaultSelectedKeys(id){
        this.setState({
            defaultSelectedKeys: [`${id}`]
        });
    }

    exit(){
        FetchGet(logout).then(()=>{
            localStorage.removeItem('user_name');
            window.location.href = "/login"
        });
    }


    render(){
        return <div>
        <Layout>
            <Header className="header">
            <div className="logo">
                <span className="logo-img">
                    <img src={require("./heimilogo.png")} alt=""/>
                </span>
                <span className="title">
                    <h2>黑米商城后台管理系统</h2>        
                </span>           
                <span className="user">
                    <span><Icon type="user" />{localStorage.getItem('user_name')}</span>
                    <Popconfirm title="确定退出？" onConfirm={this.exit.bind(this)} okText="Yes" cancelText="No">&nbsp;&nbsp;&nbsp;
                        <Button size="small">退出<Icon type="logout" /></Button>
                    </Popconfirm>
                </span>     
            </div>
            </Header>
            <Layout>
                <Sider width={200} style={{ background: '#fff' }}>
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={this.state.defaultSelectedKeys}
                        style={{ height: '100%' }}
                    >
                        <Menu.Item key="1"><Link to={{ pathname: '/' }}><Icon type="home"/>首页</Link></Menu.Item>
                        <Menu.Item key="2"><Link to={{ pathname: '/goodList' }}><Icon type="appstore-o" />商品列表</Link></Menu.Item>
                        <Menu.Item key="3"><Link to={{ pathname: '/classify' }}><Icon type="switcher" />商品分类</Link></Menu.Item>
                
                    </Menu>
                </Sider>
                <Layout style={{ padding: '24px' }}>
                    <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
                    {
                        this.props.children
                    }
                    </Content>
                </Layout>
            </Layout>
        </Layout>    
    </div>
    }
}

export default Mylayout
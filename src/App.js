import React from 'react';
import './App.less';
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';
import { Spin } from 'antd';

//页面组件
import Home from "./pages/home/Home.jsx";
import Layout from "./component/layout/Layout.jsx";
import GoodList from "./pages/goods/GoodList.jsx";
import Login from "./pages/login/Login.jsx";
import Classify from "./pages/goods/Classify.jsx";
import AddGoods from "./pages/goods/AddGood.jsx";



class App extends React.Component {
    constructor(props){
        super(props);
        window.spinning = false;

    }


    render() {
        return <div className="app">

            <BrowserRouter>
                <Spin spinning={ window.spinning } tip="Loading...">
                    <Switch>
                        <Route path="/login" component={ Login }/>
                        <Route path="/" component={ (props)=>{
                            return <Layout>
                                <Switch>
                                    <Route exact path="/" component={ Home }/>
                                    <Route path="/goodList" component={ GoodList }/>
                                    <Route path="/classify" component={ Classify }/>
                                    <Route path="/addGoods" component={ AddGoods }/>
                                    <Redirect from="*" to="/"/>
                                </Switch>
                            </Layout>
                        } }/>
                    </Switch>
                </Spin>


            </BrowserRouter>

        </div>

    }
}

export default App;

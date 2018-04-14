import React from "react";
import { Table, Button, Popconfirm, Modal, Form, Input } from 'antd';
import { FetchGet, formItemLayout } from '../../common.js';
import { getAllClassify, editClassify, upOrDown } from '../../apis.js';
const FormItem = Form.Item;
class Classify extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            classifyList: [],
            visible: false,
            editId: ''
        }
    }

    componentDidMount(){
        this.getAllClassify();
    }

    //获取商品分类
    getAllClassify(){
        FetchGet(getAllClassify,{}).then(res=>{
            let arr = [];
            if(res.data.length){
                res.data.map((item,index)=>{
                    item.key = index+1;
                    arr.push(item);
                })
            }
            this.setState({
                
                classifyList: arr
            });
        });
    }

    //分类上下架
    upOrDown(id,status){
        FetchGet(upOrDown,{
            type: 'classify',
            id: id,
            status: status === 1? 0 : 1
        }).then(res=>{
            console.log(res);
            this.getAllClassify();
        });
    }
    showModal(data){
        this.form.setFieldsValue({
            name: data.name
        });
        this.setState({ 
            visible: true ,
            editId: data.id
        });
    }
    saveFormRef(form){
        this.form = form;
    }
    handleCancel(){
        const form = this.form;
        form.resetFields();
        this.setState({ 
            visible: false ,
            editId: ''
        });
    }
    handleCreate(){
        const form = this.form;
        form.validateFields((err, values) => {
          if (err) {
            return;
          }
    
          console.log('Received values of form: ', values);
          FetchGet(editClassify,{
              id: this.state.editId,
              name: values.name
          }).then(res=>{
              this.getAllClassify();
              this.handleCancel();
          });

        });
    }

    render(){
        const { classifyList, visible, editId } = this.state;
        const columns = [
            {
                title: '序号',
                dataIndex: 'key',
                key: 'key',
            }, {
                title: '分类名称',
                dataIndex: 'name',
                key: 'name',
            }, {
                title: '状态',
                dataIndex: 'status',
                key: 'status',
                render: (text)=>{
                    return text === 1?
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
                        <Button type="primary" onClick={this.showModal.bind(this,record)}>编辑</Button>&nbsp;&nbsp;   
                        <Popconfirm title={record.status===1?'确认下架':'确认上架'} onConfirm={this.upOrDown.bind(this,record.id,record.status)} okText="Yes" cancelText="No">
                            <Button type="primary">{record.status===1?'下架':'上架'}</Button>    
                        </Popconfirm>
                        
                    </div>
                }
            }
        ];
        return <div>
            <h2>商品分类</h2>
            <div style={{overflow:"hidden"}}>
                <Button type="primary" style={{float:"right"}} onClick={this.showModal.bind(this,'')}>新增分类</Button>
            </div><br/>
            <div>
                <Table columns={columns} dataSource={classifyList} />
                
            </div>
            <CollectionCreateForm
                ref={this.saveFormRef.bind(this)}
                visible={visible}
                onCancel={this.handleCancel.bind(this)}
                onCreate={this.handleCreate.bind(this)}
                editId={editId}
            />
        </div>
    }
}

export default Classify


const CollectionCreateForm = Form.create()(
    (props) => {
      const { visible, onCancel, onCreate, form, editId } = props;
      const { getFieldDecorator } = form;
      return (
        <Modal
          visible={visible}
          title={ editId? "编辑":"新增" }
          okText="保存"
          cancelText="取消"
          onCancel={onCancel}
          onOk={onCreate}
        >
            <Form layout="horizontal">
                <FormItem label="分类名称" {...formItemLayout}>
                {getFieldDecorator('name', {
                    rules: [{ required: true, message: '请输入分类名称!' }],
                })(
                    <Input placeholder="名称"/>
                )}
                </FormItem>
                
            </Form>
        </Modal>
      );
    }
  );
  
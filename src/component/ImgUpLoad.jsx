import "./ImgUpLoad.less";
import React from 'react';
import { Upload, Icon, message, Modal } from 'antd';

function beforeUpload(file) {
    const isJPG = (file.type && file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/webp');
    if (!isJPG) {
        message.error('请上传图片类型文件!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('图片必须小于2MB!');
    }

    return !!isJPG && isLt2M;
}

class ImgUpLoad extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            previewVisible: false,
            previewImage: '',
            fileList: [],
            // isReq: false
        };
    }

    componentDidMount(){

    }

    componentWillReceiveProps(nextProps){
        if(nextProps.editImg){
            this.setState({
                fileList: nextProps.editImg,
                // isReq: true
            });
        }
    }


    handleCancel = () => this.setState({ previewVisible: false })

    handlePreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    }

    handleChange = (info) => {
        this.setState({
            fileList: info.fileList,
        })
        if (info.file.status === 'uploading') {
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            message.success(`${info.file.name} 文件上传成功`);
            this.props.onChange(info.file.response.data);
        }else if (info.file.status === 'error') {
            message.error(`${info.file.name} 文件上传失败`);
        }

    }

    render() {
        const { previewVisible, previewImage, fileList } = this.state;
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        return (
            <div className="clearfix">
                <Upload
                    action="/file/upload"
                    name='file'
                    listType="picture-card"
                    fileList={fileList}
                    beforeUpload = {beforeUpload}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange.bind(this)}
                >
                    {fileList.length >= 1 ? null : uploadButton}
                </Upload>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel.bind(this)}>
                    <img style={{ float:'none',width: '100%' }} src={previewImage} />
                </Modal>
            </div>
        );
    }
}
export default ImgUpLoad
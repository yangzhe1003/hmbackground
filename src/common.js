
/*fetchGet，fetchPost只包装了最基础的请求，特殊需求，直接使用fetch来编码
* 参考：https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API/Using_Fetch
* */
import { message } from 'antd';

const ERROR_MSG = '请求失败';
const fetchGet = (requestApi, fetchPrm, successFun, errorFun) => {

    let thisUrl = `${requestApi}?`;
    for (let item in fetchPrm) {
        thisUrl = thisUrl + `${item}=${encodeURIComponent(fetchPrm[item])}&`;
    }

    if( thisUrl.length <= requestApi.length + 1) {
        thisUrl = requestApi;
    }

    fetch(thisUrl, {credentials: 'include',mode: 'no-cors'})
        .then((response) => {
            const { status } = response;
            if (status >= 200 && status < 300 || status === 304 || status === 302) {
                response.json().then((val) => {
                    successFun(val, thisUrl);
                });
            } else {

                errorFun && errorFun(`${ERROR_MSG}:${status}，GET:${requestApi}`, thisUrl, status + '');
            }
        }).catch((err) => {

        errorFun && errorFun(`${ERROR_MSG}:${err.message}，GET:${requestApi}`, thisUrl, err.message);
    });
};

const fetchPost = (requestApi, fetchPrm, successFun, errorFun) => {
    let prmdata = '';
    for (let item in fetchPrm) {
        prmdata = prmdata + `${item}=${encodeURIComponent(fetchPrm[item])}&`;
    }
    const url = requestApi + '**' + prmdata;
    fetch(requestApi, {
        credentials: 'include',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: prmdata
    }).then((response) => {
        const { status } = response;
        if (status >= 200 && status < 300 || status === 304) {
            response.json().then((val) => {
                successFun(val, url);
            });
        } else {
            errorFun && errorFun(`${ERROR_MSG}:${status}，POST:${requestApi},BODY:${prmdata}`, url, status);
        }
    }).catch((err) => {
        errorFun && errorFun(`${ERROR_MSG}:${err.message},POST:${requestApi},BODY:${prmdata}`, url, err.message);
    })
};



export const FetchGet = function (jrApi, fetchPrm) {

    let initPrm = {};

    for(let item in fetchPrm) {
        typeof fetchPrm[item] === 'undefined' && (fetchPrm[item] = '');
    }

    Object.assign(initPrm, fetchPrm);


    window.spinning = true;
    return new Promise(function(resolve, reject){
        fetchGet(jrApi, initPrm, function (ret) {
            window.spinning = false;
            switch (ret.code) {
                case 0:
                    resolve(ret);
                    break;
                case 90004:
                    message.info(ret.message);
                    reject(ret);
                    window.location.href = '/login';
                    break;
                default:
                    message.info(ret.message);
                    reject(ret);
            }
        },function (res) {
            window.spinning = false;
            reject(res);
            message.info(res.message);

        })
    })
};


export const FetchPost = function (jrApi, fetchPrm) {
    let initPrm = {};

    for(let item in fetchPrm) {
        typeof fetchPrm[item] === 'undefined' && (fetchPrm[item] = '');
    }

    Object.assign(initPrm, fetchPrm);
    window.spinning = true;
    return new Promise(function(resolve, reject){
        fetchPost(jrApi, initPrm, function (ret) {
            window.spinning = false;
            switch (ret.code) {
                case 0:
                    resolve(ret);
                    break;
                case 90004:
                    message.info(ret.message);
                    reject(ret);
                    window.location.href = '/login';
                    break;
                default:
                    message.info(ret.message);
                    reject(ret);
            }
        },function (res) {
            window.spinning = false;
            message.info(res.message);
            reject(res)
        })
    })
};

export const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 14 },
    },
  };
export const tailFormItemLayout = {
    wrapperCol: {
        xs: {
        span: 24,
        offset: 0,
        },
        sm: {
        span: 14,
        offset: 6,
        },
    },
};
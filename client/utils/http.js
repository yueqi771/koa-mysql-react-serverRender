import axios from 'axios';
import qs from 'qs';

let url = "";

// 创建一个新的axios实例
const instance = axios.create({
    baseURL: url,
    headers: {
        "content-type": 'application/x-www-form-urlencoded;charset=utf-8'
    },
    withCredentials: true, // 是否允许带cookie这些
})

const ajax = (url, method, data, params) => {
    return new Promise((resolve, reject) => {
        instance({
            url: url,
            method: 'post',
            data: data,
            params: params
        }).then(res => {
            resolve(res.data)
        })
        .catch(err => {
            reject(err)
        })

    })
}

const http = {
    get(url, data, params) {
        return ajax(url, 'GET', data, params)
    },
    post({url="", data = {}, params={}}) {
        return ajax(url, 'POST', qs.stringify(data), params)
    }
}

export default http;
import axios from "axios";

// 方法一 最终方案
export function request(config) {
    // 1、创建axios的实例
    const instance = axios.create({
        baseURL: 'http://152.136.185.210:8000/api/w6',
        timeout: 5000
    })
    // 2、axios的拦截器
    // 2.1请求拦截
    instance.interceptors.request.use(config => {
        // console.log(config);
        // 请求拦截可以在这做些事情如下
        // 1.比如config中的一些信息不符合服务器的要求
        // 2.比如每次发送网络请求都希望在界面中显示一个请求的图标
        // 3.某些网络请求（比如登录（希望传个的token）），必须携带一些特殊的信息
        return config//拦截之后需要还回去
    }, err => {
        console.log(err);
    })
    // 2.2响应拦截
    instance.interceptors.response.use(res => {
        // console.log(res);
        //返回结果中axios自带封装了很多信息，但是一般取出的只要data
        return res.data
    }, err => {
        console.log(err);
    })
    // 3、发送真正的网络请求
    return instance(config)//返回值就是个promise对象 所以不用自己包装了 instance()返回值就是promise
}

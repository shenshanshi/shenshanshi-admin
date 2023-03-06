import axios from "axios";
// import JSONBig from 'json-bigint'
const request = axios.create({

    // baseURL:"/api",

    timeout:5000,
    // transformResponse: [
    //     function (data) {
    //         // 对 data 进行任意转换处理
    //         try {
    //             return JSONBig.parse(data)
    //         } catch (err) {
    //             return data
    //         }
    //     }
    // ]

})



// 添加请求拦截器
request.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么，例如加入token
    var token = localStorage.getItem("TOKEN")
    config.headers.Authorization  = "Bearer " + token
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});



// 添加响应拦截器
request.interceptors.response.use(function (response) {
    // 在接收响应时做些什么，例如跳转到登录页
    return response.data;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});


//对外暴露
export default request;

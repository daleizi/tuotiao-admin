// axios请求封装

import axios from "axios";
import JSONbig from "json-bigint";
// 创建axios实例
const request = axios.create({
  baseURL: "http://api-toutiao-web.itheima.net", // 请求的基础路径
  // 定制后端返回的原始数据处理 axios 默认内部使用 JSON.parse
  transformResponse: [
    function(data) {
      try {
        return JSONbig.parse(data);
      } catch (error) {
        return data;
      }
    }
  ]
});

// 添加请求拦截器
request.interceptors.request.use(
  function(config) {
    // 获取token
    let user = JSON.parse(window.localStorage.getItem("user"));
    if (user) {
      // 设置请求头
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  function(error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
request.interceptors.response.use(
  function(response) {
    // 对响应数据做点什么
    return response;
  },
  function(error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

export default request;

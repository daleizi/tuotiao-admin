// axios请求封装

import axios from "axios";

// 创建axios实例
const request = axios.create({
  baseURL: "http://api-toutiao-web.itheima.net" // 请求的基础路径
});

// 请求拦截器

// 响应拦截器

export default request;

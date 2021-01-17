// axios请求封装

import axios from "axios";

// 创建axios实例
const request = axios.create({
  baseURL: "http://ttapi.research.itcast.cn/" // 请求的基础路径
});

// 请求拦截器

// 响应拦截器

export default request;

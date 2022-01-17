import axios from "axios";
import { message } from "antd";

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_URL, // api 的 base_url
  timeout: 5000, // 请求超时时间
});

// request拦截器
service.interceptors.request.use(
  (config) => {
    if (localStorage.getItem("Auth-Token")) {
      config.headers["Authorization"] = localStorage.getItem("Auth-Token");
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// response 拦截器
service.interceptors.response.use(
  (response) => {
    switch (response.data.code) {
      case 500:
        message.error(response.data.msg);
        break;
      case 401:
        message.warning("账号在其他地方登录,请及时确认");
        break;

      default:
        break;
    }
    return response;
  },
  (error) => {
    // console.log("axios.isCancel(error);: ", axios.isCancel(error));
    console.log("err" + error); // for debug
    return Promise.reject(error);
  }
);
export default service;

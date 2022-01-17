import request from "../utils/request";
import qs from "qs";

// 获取token
export let signIn = (params) => {
  return request({
    url: "/token/token",
    method: "post",
    data: qs.stringify(params),
  });
};

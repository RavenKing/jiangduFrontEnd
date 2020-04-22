import request from "./_request";
import constants from "./constants";

// 登录接口
function loginApi(data) {
  console.log(data);
  const newFormData={
    "username":data.act,
    "password":data.pass
  }
  return request({
    url: constants.LoginURL,
    method: 'post',
    data:newFormData
  });
}

export {
  loginApi, // 登录接口
}
import request from "./_request";
import constants from "./constants";

// 登录接口
function loginApi(data) {
  console.log(data);
  // const newFormData={
  //   "USER_NAME":data.USER_NAME,
  //   "PASSWORD":data.PASSWORD
  // }
  return request({
    url: constants.LoginURL,
    method: 'post',
    data:data
  });
}

export {
  loginApi, // 登录接口
}
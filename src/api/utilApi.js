import request from "./_request";
import constants from "./constants";
import global from "@/global/index";
import Axios from "axios";


import {
    localGet
} from "@/util/storage"; // 导入存储函数
// 登录接口
function getMapLonAndLat(data) {

    let local_auth = localGet(global.project_key, true);
    //console.log(local_auth);
    const newFormData = {
        "token": local_auth
    }

    return request({
        url: constants.baiduMapCheck+"&coords="+data.lng+","+data.lat,
        method: 'get',
        data: newFormData
    });
}
function uploadFileApi(formData)
{
      const http = Axios.create({
        baseURL: '/load', // api的base_url
        //withCredentials: true, // 开启跨域身份凭证
        method: "post",
        headers: {
            headers:{'Content-Type':'multipart/form-data'}
        },
        timeout: 500000 // request timeout
      });
    return http.post(constants.uploadUrlApi,formData);
}
function getFileOSSApi(data)
{
    const http = Axios.create({
        baseURL: '/load', // api的base_url
        //withCredentials: true, // 开启跨域身份凭证
        method: "get",
        headers: {
            headers:{'Content-Type':'multipart/form-data'}
        },
        timeout: 560000 // request timeout
      });
    return http.get(constants.getOSSURLApi+"?key="+data,{ responseType: 'blob' });
}
export {
    getMapLonAndLat,
    uploadFileApi,
    getFileOSSApi
}
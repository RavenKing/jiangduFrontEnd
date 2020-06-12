import request from "./_request";
import constants from "./constants";
import global from "@/global/index"
import {
    localGet
} from "@/util/storage"; // 导入存储函数
// 登录接口
function getMRApi() {

    let local_auth = localGet(global.project_key, true);
    //console.log(local_auth);
    const newFormData = {
        "token": local_auth
    }

    return request({
        url: constants.getMRAPI,
        method: 'post',
        data: newFormData
    });
}
function updateMRApi(data)
{
    let local_auth = localGet(global.project_key, true);
    data.token=local_auth;
    return request({
        url: constants.updateMRAPI,
        method: 'post',
        data: data
    });
}
function createMRApi(data){
    let local_auth = localGet(global.project_key, true);
  //console.log(local_auth);
    // //console.log(local_auth);
    // // const newFormData = {
    // //     "token": local_auth
    // // }
    data.token=local_auth;
    return request({
        url: constants.createMRAPI,
        method: 'post',
        data: data
    });
}
function deleteMRApi(data)
{
    let local_auth = localGet(global.project_key, true);
    data.token=local_auth;
    return request({
        url: constants.deleteMRAPI,
        method: 'post',
        data: data
    });
}
function getroombyid(data)
{
    let local_auth = localGet(global.project_key, true);
    data.token=local_auth;
    return request({
        url: constants.getRoomByIDApi,
        method: 'post',
        data: data
    });
}

export {
    getMRApi,
    createMRApi,
    updateMRApi,// MR接口
    deleteMRApi,
    getroombyid
}
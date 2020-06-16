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
function getMCApi(){
    let local_auth = localGet(global.project_key, true);
    //console.log(local_auth);
    const newFormData = {
        "token": local_auth
    }

    return request({
        url: constants.getMCAPI,
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
function createMCApi(data){
    let local_auth = localGet(global.project_key, true);
  //console.log(local_auth);
    // //console.log(local_auth);
    // // const newFormData = {
    // //     "token": local_auth
    // // }
    data.token=local_auth;
    return request({
        url: constants.createMCApi,
        method: 'post',
        data: data
    });
}
function updateMCApi(data){
    let local_auth = localGet(global.project_key, true);
  //console.log(local_auth);
    // //console.log(local_auth);
    // // const newFormData = {
    // //     "token": local_auth
    // // }
    data.token=local_auth;
    return request({
        url: constants.updateMCApi,
        method: 'post',
        data: data
    });
}

function approveMRApi(data){
    return generalRequet(data,constants.approveMRApi)
}
function generalRequet(data,apiName)
{
    let local_auth = localGet(global.project_key, true);
  //console.log(local_auth);
    // //console.log(local_auth);
    // // const newFormData = {
    // //     "token": local_auth
    // // }
    data.token=local_auth;
    return request({
        url: apiName,
        method: 'post',
        data: data
    });
}
function rejectMRApi(data)
{
  return  generalRequet(data,constants.rejectMRApi)

}
export {
    getMRApi,
    createMRApi,
    updateMRApi,// MR接口
    deleteMRApi,
    getroombyid,
    createMCApi,
    getMCApi,
    updateMCApi,
    approveMRApi,
    rejectMRApi
}
import request from "./_request";
import constants from "./constants";
import global from "@/global/index"
import {
    localGet
} from "@/util/storage"; // 导入存储函数
// 登录接口
function getRoomDataApi() {
    //console.log(data);
    //   const newFormData={
    //     "username":data.act,
    //     "password":data.pass
    //   }
    let local_auth = localGet(global.project_key, true);
    //console.log(local_auth);
    const newFormData = {
        "token": local_auth
    }

    return request({
        url: constants.roomGetAPI,
        method: 'post',
        data: newFormData
    });
}
function updateRoomApi(data)
{
    let local_auth = localGet(global.project_key, true);
    data.token=local_auth;
    return request({
        url: constants.updateRoomAPI,
        method: 'post',
        data: data
    });
}
function createRoomApi(data){
    let local_auth = localGet(global.project_key, true);
  //console.log(local_auth);
    // //console.log(local_auth);
    // // const newFormData = {
    // //     "token": local_auth
    // // }
    data.token=local_auth;
    return request({
        url: constants.roomCreateAPI,
        method: 'post',
        data: data
    });
}
function deleteRoomApi(data)
{
    let local_auth = localGet(global.project_key, true);
    data.token=local_auth;
    return request({
        url: constants.deleteRoomAPI,
        method: 'post',
        data: data
    });
}
export {
    getRoomDataApi,
    createRoomApi,
    updateRoomApi,// Room接口
    deleteRoomApi
}
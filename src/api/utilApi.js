import request from "./_request";
import constants from "./constants";
import global from "@/global/index"
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

export {
    getMapLonAndLat,
   
}
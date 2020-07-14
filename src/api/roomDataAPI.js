import request from "./_request";
import constants from "./constants";
import global from "@/global/index"
import {
    localGet
} from "@/util/storage"; // 导入存储函数
// 登录接口
function getRoomDataApi(data) {
    return generalRequet(data,constants.roomGetAPI)
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
function deleteBuildingApi(data)
{
    let local_auth = localGet(global.project_key, true);
    data.token=local_auth;
    return request({
        url: constants.deleteBuildingApi,
        method: 'post',
        data: data
    });
}
function getRentRoomDataApi(data)
{   
     return generalRequet(data,constants.rentRoomGetAPI)
}
function createRentRoomApi(data)
{
    let local_auth = localGet(global.project_key, true);
      data.token=local_auth;
      return request({
          url: constants.roomRentCreateAPI,
          method: 'post',
          data: data
      });
}
function updateRentRoomApi(data)
{
    
    let local_auth = localGet(global.project_key, true);
    data.token=local_auth;
    return request({
        url: constants.updateRentRoomAPI,
        method: 'post',
        data: data
    });


}
function deleteRentRoomApi(data)
{    
    let local_auth = localGet(global.project_key, true);
    data.token=local_auth;
    return request({
        url: constants.deleteRentRoomAPI,
        method: 'post',
        data: data
    });
}

function getUnitApi()
{
    let local_auth = localGet(global.project_key, true);
    //console.log(local_auth);
    const newFormData = {
        "token": local_auth
    }

    return request({
        url: constants.unitGetApi,
        method: 'post',
        data: newFormData
    });

}

// "curl --location --request POST 'http://118.190.204.202:9002/listunitbyid' \
// --form 'token=1234' \
// --form 'id=3'"              
function getUnitApiByid(id)
{
    let local_auth = localGet(global.project_key, true);
    //console.log(local_auth);
    const newFormData = {
        "token": local_auth,
        "id":id
    }

    return request({
        url: constants.leaderUnitByIdGetApi,
        method: 'post',
        data: newFormData
    });

}                
                
                


function getlistleaderroomApi(id)
{
    let local_auth = localGet(global.project_key, true);
    const newFormData = {
        "token": local_auth,
        "unit_id": id
    }

    return request({
        url: constants.leaderRoomGetApi,
        method: 'post',
        data: newFormData
    });

}



function createUnitApi(data)
{
    let local_auth = localGet(global.project_key, true);
      data.token=local_auth;
      data['pid'] = 4
      console.log(data)
      return request({
          url: constants.unitCreateApi,
          method: 'post',
          data: data
      });
}
function updateUnitApi(data)
{
    
    let local_auth = localGet(global.project_key, true);
    console.log('data is  ', data)
    console.log(local_auth)
    data.token=local_auth;
    
    return request({
        url: constants.updateUnitApi,
        method: 'post',
        data: data
    });


}
function deleteUnitApi(data)
{    
    let local_auth = localGet(global.project_key, true);
    data.token=local_auth;
    return request({
        url: constants.deleteUnitApi,
        method: 'post',
        data: data
    });
}

function getEmployeeApi()
{
    let local_auth = localGet(global.project_key, true);
    //console.log(local_auth);
    const newFormData = {
        "token": local_auth
    }

    return request({
        url: constants.employeeGetApi,
        method: 'post',
        data: newFormData
    });

}
function createEmployeeApi(data)
{
    let local_auth = localGet(global.project_key, true);
      data.token=local_auth;
      return request({
          url: constants.employeeCreateApi,
          method: 'post',
          data: data
      });
}
function updateEmployeeApi(data)
{
    
    let local_auth = localGet(global.project_key, true);
    data.token=local_auth;
    return request({
        url: constants.updateEmployeeApi,
        method: 'post',
        data: data
    });


}
function deleteEmployeeApi(data)
{    
    let local_auth = localGet(global.project_key, true);
    data.token=local_auth;
    return request({
        url: constants.deleteEmployeeApi,
        method: 'post',
        data: data
    });
}
function createRentContractApi(data)
{    
    let local_auth = localGet(global.project_key, true);
    data.token=local_auth;
    return request({
        url: constants.createRentContractApi,
        method: 'post',
        data: data
    });
}
function createLoanContractApi(data)
{    
    let local_auth = localGet(global.project_key, true);
    data.token=local_auth;
    return request({
        url: constants.createLoanContractApi,
        method: 'post',
        data: data
    });
}
function getRentRoomContractListApi(data)
{
    let local_auth = localGet(global.project_key, true);
    data.token=local_auth;
    return request({
        url: constants.listRentRoomContractApi,
        method: 'post',
        data: data
    });
}
function getLoanRoomContractListApi()
{
    let local_auth = localGet(global.project_key, true);
    var data={token:""};
     data.token=local_auth;
    return request({
        url: constants.listLoanRoomContractApi,
        method: 'post',
        data: data
    });
}
function createAssignmentApi(data)
{
    let local_auth = localGet(global.project_key, true);
    data.token=local_auth;
    return request({
        url: constants.createAssignmentApi,
        method: 'post',
        data: data
    });
}

function assignRentRoomApi(data)
{
    let local_auth = localGet(global.project_key, true);
    data.token=local_auth;
    return request({
        url: constants.assignRentRoomApi,
        method: 'post',
        data: data
    });
}

function getAssignRoomList(data)
{  
    
    let local_auth = localGet(global.project_key, true);
    data.token=local_auth;
    return request({
        url: constants.listRoomAssignmentApi,
        method: 'post',
        data: data
    });

}
function deleteRentContractApi(data)
{
    let local_auth = localGet(global.project_key, true);
    data.token=local_auth;
    return request({
        url: constants.deleteRentContractApi,
        method: 'post',
        data: data
    });
}
function deleteLoanContractApi(data)
{
    let local_auth = localGet(global.project_key, true);
    data.token=local_auth;
    return request({
        url: constants.deleteLoanContractApi,
        method: 'post',
        data: data
    });
}
function createBuildingApi(data)
{
    let local_auth = localGet(global.project_key, true);
    data.token=local_auth;
    return request({
        url: constants.createBuildingApi,
        method: 'post',
        data: data
    });
}
function getBuildingListApi(data){
    let local_auth = localGet(global.project_key, true);
    data.token=local_auth;
    return request({
        url: constants.listBuildingApi,
        method: 'post',
        data: data
    });
}
function getBuildingFloorApi(data){
    let local_auth = localGet(global.project_key, true);
    data.token=local_auth;
    return request({
        url: constants.listBuildingFloorApi,
        method: 'post',
        data: data
    });
}
function createBuildingFloorApi(data)
{
    let local_auth = localGet(global.project_key, true);
    data.token=local_auth;
    return request({
        url: constants.createBuildingFloorApi,
        method: 'post',
        data: data
    });
}
function updateFloorApi(data)
{
    let local_auth = localGet(global.project_key, true);
    data.token=local_auth;
    return request({
        url: constants.updateFloorApi,
        method: 'post',
        data: data
    });
}
function deleteBuildingFloorAssignmentApi(data)
{
    let local_auth = localGet(global.project_key, true);
    data.token=local_auth;
    return request({
        url: constants.deleteBuildingFloorAssignmentApi,
        method: 'post',
        data: data
    });
}

function delleaderroomApi(data)
{
    let local_auth = localGet(global.project_key, true);
    data.token=local_auth;
    return request({
        url: constants.delleaderroomApi,
        method: 'post',
        data: data
    });
}

function assignRentAssignmentApi(data)
{
    return generalRequet(data,constants.createAssignmentRentApi)
}
function listRentRoomAssignmentApi(data)
{
    return generalRequet(data,constants.listRentRoomAssignmentApi)
}
function deleteRentRoomAssignmentApi(data)
{
    return generalRequet(data,constants.deleteRentRoomAssignmentApi)
}


function generalRequet(data,apiName)
{
    let local_auth = localGet(global.project_key, true);
    data.token=local_auth;
    return request({
        url: apiName,
        method: 'post',
        data: data
    });
}
function createLeaderAssignApi(data)
{
    return generalRequet(data,constants.createLeaderAssignApi)

}

function editRentContractDetailApi(data)
{
    return generalRequet(data,constants.editRentContractDetailApi)
}

export {
    getRoomDataApi,
    createRoomApi,
    updateRoomApi,// Room接口
    deleteRoomApi,
    getRentRoomDataApi,
    createRentRoomApi,
    updateRentRoomApi,
    deleteRentRoomApi,    
    getUnitApi,
    getlistleaderroomApi,
    createUnitApi,
    updateUnitApi,
    deleteUnitApi,
    getEmployeeApi,
    createEmployeeApi,
    updateEmployeeApi,
    deleteEmployeeApi,
    createRentContractApi,
    createLoanContractApi,
    getRentRoomContractListApi,
    getLoanRoomContractListApi,
    createAssignmentApi,
    getAssignRoomList,
    deleteRentContractApi,
    deleteLoanContractApi,
    createBuildingApi,
    getBuildingListApi,
    deleteBuildingApi,
    createBuildingFloorApi,
    getBuildingFloorApi,
    updateFloorApi,
    deleteBuildingFloorAssignmentApi,
    getUnitApiByid,
    delleaderroomApi,
    assignRentAssignmentApi,
    listRentRoomAssignmentApi,
    deleteRentRoomAssignmentApi,
    assignRentRoomApi,
    createLeaderAssignApi,
    editRentContractDetailApi
}
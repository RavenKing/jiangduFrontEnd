import request from "./_request";
import constants from "./constants";
import global from "@/global/index";
import { localGet } from "@/util/storage"; // 导入存储函数
// 登录接口
function registerUserApi(data) {
  data = {
    data: data,
  };
  return generalRequet(data, constants.userApi);
}
function getTagsApi() {
  return generalGetRequest(constants.tagsApi);
}

function getCompanysApi() {
  return generalGetRequest(constants.getCompanysApi);
}
function updateTagsApi(data) {
  data = {
    data: data,
  };
  return generalPutRequest(data, constants.tagsApi);
}
function deleteTagsApi(data) {
  data = {
    data: data,
  };
  return generalDeleteRequest(data, constants.tagsApi);
}
function postTagsApi(data) {
  data = {
    data: data,
  };
  return generalRequet(data, constants.tagsApi);
}
function postRecommendListApi(data) {
  data = {
    data: data,
  };
  return generalRequet(data, constants.postRecommendList);
}

function queryTagsApi(type) {
  return queryGetRequest(type, constants.tagsApi);
}

function getPolicysApi(data) {
  return generalRequet(data,constants.policyApi);
}
function updatePolicyApi(data) {
  data = {
    data: data,
  };
  return generalPutRequest(data, constants.policyApi);
}
function deletePolicyApi(data) {
  data = {
    data: data,
  };
  return generalDeleteRequest(data, constants.policyApi);
}
function postPolicyApi(data) {
  data = {
    data: data,
  };
  return generalRequet(data, constants.policyApi);
}
function addPolicyTagApi(data)
{
    data = {
        data: data,
      };
      return generalRequet(data, constants.addTageApi);
}
function deletePolicyTagApi(data)
{
    data = {
        data: data,
      };
      return generalRequet(data, constants.deletePolicyTageApi);
}

function getRecommendCompanysApi(data)
{
      return generalGetRequest(constants.recommendPolicyApi+"/"+data.POLICY_ID);
}
function getRoomDataApi(data) {
  return generalRequet(data, constants.roomGetAPI);
}
function updateRoomApi(data) {
  let local_auth = localGet(global.project_key, true);
  data.token = local_auth;
  return request({
    url: constants.updateRoomAPI,
    method: "post",
    data: data,
  });
}
function createRoomApi(data) {
  let local_auth = localGet(global.project_key, true);
  //console.log(local_auth);

  // //console.log(local_auth);
  // // const newFormData = {
  // //     "token": local_auth
  // // }
  data.token = local_auth;
  return request({
    url: constants.roomCreateAPI,
    method: "post",
    data: data,
  });
}
function deleteRoomApi(data) {
  let local_auth = localGet(global.project_key, true);
  data.token = local_auth;
  return request({
    url: constants.deleteRoomAPI,
    method: "post",
    data: data,
  });
}
function deleteBuildingApi(data) {
  let local_auth = localGet(global.project_key, true);
  data.token = local_auth;
  return request({
    url: constants.deleteBuildingApi,
    method: "post",
    data: data,
  });
}
function getRentRoomDataApi(data) {
  return generalRequet(data, constants.rentRoomGetAPI);
}
function createRentRoomApi(data) {
  let local_auth = localGet(global.project_key, true);
  data.token = local_auth;
  return request({
    url: constants.roomRentCreateAPI,
    method: "post",
    data: data,
  });
}
function updateRentRoomApi(data) {
  let local_auth = localGet(global.project_key, true);
  data.token = local_auth;
  return request({
    url: constants.updateRentRoomAPI,
    method: "post",
    data: data,
  });
}
function deleteRentRoomApi(data) {
  let local_auth = localGet(global.project_key, true);
  data.token = local_auth;
  return request({
    url: constants.deleteRentRoomAPI,
    method: "post",
    data: data,
  });
}
function getUnitApi(data) {
  if (data == null || data == undefined) {
    data = {};
  }
  let local_auth = localGet(global.project_key, true);
  //console.log(local_auth);
  data.token = local_auth;

  return request({
    url: constants.unitGetApi,
    method: "post",
    data: data,
  });
}
// "curl --location --request POST 'http://118.190.204.202:9002/listunitbyid' \
// --form 'token=1234' \
// --form 'id=3'"
function getUnitApiByid(id) {
  let local_auth = localGet(global.project_key, true);
  //console.log(local_auth);
  const newFormData = {
    token: local_auth,
    id: id,
  };

  return request({
    url: constants.leaderUnitByIdGetApi,
    method: "post",
    data: newFormData,
  });
}

function getlistleaderroomApi(id) {
  let local_auth = localGet(global.project_key, true);
  const newFormData = {
    token: local_auth,
    unit_id: id,
  };

  return request({
    url: constants.leaderRoomGetApi,
    method: "post",
    data: newFormData,
  });
}

function createUnitApi(data) {
  let local_auth = localGet(global.project_key, true);
  data.token = local_auth;
  data["pid"] = 4;
  console.log(data);
  return request({
    url: constants.unitCreateApi,
    method: "post",
    data: data,
  });
}
function updateUnitApi(data) {
  let local_auth = localGet(global.project_key, true);
  console.log("data is  ", data);
  data.token = local_auth;

  return request({
    url: constants.updateUnitApi,
    method: "post",
    data: data,
  });
}

function getleaderroombyunitApi(data) {
  let local_auth = localGet(global.project_key, true);
  data.token = local_auth;

  return request({
    url: constants.getleaderroombyunitApi,
    method: "post",
    data: data,
  });
}

function deleteUnitApi(data) {
  let local_auth = localGet(global.project_key, true);
  data.token = local_auth;
  return request({
    url: constants.deleteUnitApi,
    method: "post",
    data: data,
  });
}

function getEmployeeApi() {
  let local_auth = localGet(global.project_key, true);
  //console.log(local_auth);
  const newFormData = {
    token: local_auth,
  };

  return request({
    url: constants.employeeGetApi,
    method: "post",
    data: newFormData,
  });
}
function createEmployeeApi(data) {
  let local_auth = localGet(global.project_key, true);
  data.token = local_auth;
  return request({
    url: constants.employeeCreateApi,
    method: "post",
    data: data,
  });
}
function updateEmployeeApi(data) {
  let local_auth = localGet(global.project_key, true);
  data.token = local_auth;
  return request({
    url: constants.updateEmployeeApi,
    method: "post",
    data: data,
  });
}
function deleteEmployeeApi(data) {
  let local_auth = localGet(global.project_key, true);
  data.token = local_auth;
  return request({
    url: constants.deleteEmployeeApi,
    method: "post",
    data: data,
  });
}
function createRentContractApi(data) {
  let local_auth = localGet(global.project_key, true);
  data.token = local_auth;
  return request({
    url: constants.createRentContractApi,
    method: "post",
    data: data,
  });
}
function createLoanContractApi(data) {
  let local_auth = localGet(global.project_key, true);
  data.token = local_auth;
  return request({
    url: constants.createLoanContractApi,
    method: "post",
    data: data,
  });
}
function getRentRoomContractListApi(data) {
  let local_auth = localGet(global.project_key, true);
  data.token = local_auth;
  return request({
    url: constants.listRentRoomContractApi,
    method: "post",
    data: data,
  });
}
function getLoanRoomContractListApi() {
  let local_auth = localGet(global.project_key, true);
  var data = { token: "" };
  data.token = local_auth;
  return request({
    url: constants.listLoanRoomContractApi,
    method: "post",
    data: data,
  });
}
function createAssignmentApi(data) {
  let local_auth = localGet(global.project_key, true);
  data.token = local_auth;
  return request({
    url: constants.createAssignmentApi,
    method: "post",
    data: data,
  });
}

function assignroomApi(data) {
  let local_auth = localGet(global.project_key, true);
  data.token = local_auth;
  return request({
    url: constants.assignroomApi,
    method: "post",
    data: data,
  });
}

function assignRentRoomApi(data) {
  let local_auth = localGet(global.project_key, true);
  data.token = local_auth;
  return request({
    url: constants.assignRentRoomApi,
    method: "post",
    data: data,
  });
}

function getAssignRoomList(data) {
  let local_auth = localGet(global.project_key, true);
  data.token = local_auth;
  return request({
    url: constants.listRoomAssignmentApi,
    method: "post",
    data: data,
  });
}
function deleteRentContractApi(data) {
  let local_auth = localGet(global.project_key, true);
  data.token = local_auth;
  return request({
    url: constants.deleteRentContractApi,
    method: "post",
    data: data,
  });
}
function deleteLoanContractApi(data) {
  let local_auth = localGet(global.project_key, true);
  data.token = local_auth;
  return request({
    url: constants.deleteLoanContractApi,
    method: "post",
    data: data,
  });
}
function createBuildingApi(data) {
  let local_auth = localGet(global.project_key, true);
  data.token = local_auth;
  return request({
    url: constants.createBuildingApi,
    method: "post",
    data: data,
  });
}
function getBuildingListApi(data) {
  let local_auth = localGet(global.project_key, true);
  data.token = local_auth;
  return request({
    url: constants.listBuildingApi,
    method: "post",
    data: data,
  });
}
function getBuildingFloorApi(data) {
  let local_auth = localGet(global.project_key, true);
  data.token = local_auth;
  data.showall = 1;
  return request({
    url: constants.listBuildingFloorApi,
    method: "post",
    data: data,
  });
}
function createBuildingFloorApi(data) {
  let local_auth = localGet(global.project_key, true);
  data.token = local_auth;
  return request({
    url: constants.createBuildingFloorApi,
    method: "post",
    data: data,
  });
}
function updateFloorApi(data) {
  let local_auth = localGet(global.project_key, true);
  data.token = local_auth;
  return request({
    url: constants.updateFloorApi,
    method: "post",
    data: data,
  });
}
function deleteBuildingFloorAssignmentApi(data) {
  let local_auth = localGet(global.project_key, true);
  data.token = local_auth;
  return request({
    url: constants.deleteBuildingFloorAssignmentApi,
    method: "post",
    data: data,
  });
}

function deleteRentRoomAssignmentApi(data) {
  let local_auth = localGet(global.project_key, true);
  data.token = local_auth;
  return request({
    url: constants.deleteRentRoomAssignmentApi,
    method: "post",
    data: data,
  });
}

function delleaderroomApi(data) {
  let local_auth = localGet(global.project_key, true);
  data.token = local_auth;
  return request({
    url: constants.delleaderroomApi,
    method: "post",
    data: data,
  });
}

function assignRentAssignmentApi(data) {
  return generalRequet(data, constants.createAssignmentRentApi);
}
function listRentRoomAssignmentApi(data) {
  return generalRequet(data, constants.listRentRoomAssignmentApi);
}

// function deleteRentRoomAssignmentApi(data)
// {
//     return generalRequet(data,constants.deleteRentRoomAssignmentApi)
// }
function listLoanAssignmentApi(data) {
  return generalRequet(data, constants.listLoanAssignmentApi);
}
function deleteLoanAssignmentApi(data) {
  return generalRequet(data, constants.deleteLoanAssignmentApi);
}
function createLoanAssignmentApi(data) {
  return generalRequet(data, constants.createLoanAssignmentApi);
}
function editLoanAssignmentApi(data) {
  return generalRequet(data, constants.editLoanAssignmentApi);
}

function changeRoomTypeApi(data) {
  return generalRequet(data, constants.changeRoomTypeApi);
}
function generalRequet(data, apiName) {
  let local_auth = localGet(global.project_key, true);
  data.token = local_auth;
  return request({
    url: apiName,
    method: "post",
    data: data,
  });
}
// function generalPostRequest(data,apiName)
// {
//     let local_auth = localGet(global.project_key, true);
//     data.token=local_auth;
//     return request({
//         url: apiName,
//         method: 'post',
//         data: data
//     });
// }

function queryGetRequest(query, apiName) {
  var queryString = "?";
  for (var j = 0; j < query.length; j++) {
    queryString = queryString + query[j] + "&";
  }
  return request({
    url: apiName + queryString,
    method: "get",
  });
}

function generalGetRequest(apiName) {
  //   let local_auth = localGet(global.project_key, true);
  return request({
    url: apiName,
    method: "get",
  });
}

function generalPutRequest(data, apiName) {
  //   let local_auth = localGet(global.project_key, true);
  return request({
    url: apiName,
    method: "put",
    data: data,
  });
}
function generalDeleteRequest(data, apiName) {
  //   let local_auth = localGet(global.project_key, true);
  return request({
    url: apiName,
    method: "delete",
    data: data,
  });
}
function createLeaderAssignApi(data) {
  return generalRequet(data, constants.createLeaderAssignApi);
}

function editRentContractDetailApi(data) {
  return generalRequet(data, constants.editRentContractDetailApi);
}
function editRentContractApi(data) {
  return generalRequet(data, constants.editRentContractApi);
}
function listPatrolApi(data) {
  return generalRequet(data, constants.listPatrolApi);
}

function createPatrolApi(data) {
  return generalRequet(data, constants.createPatrolApi);
}

function editPatrolApi(data) {
  return generalRequet(data, constants.editPatrolApi);
}

function deletePatrolApi(data) {
  return generalRequet(data, constants.deletePatrolApi);
}

/*20200801*/
function getroomnumApi(data) {
  let local_auth = localGet(global.project_key, true);
  data.token = local_auth;
  return request({
    url: constants.getroomnumApi,
    method: "post",
    data: data,
  });
}

function getroomspaceApi(data) {
  let local_auth = localGet(global.project_key, true);
  data.token = local_auth;
  return request({
    url: constants.getroomspaceApi,
    method: "post",
    data: data,
  });
}

function getunitnumApi(data) {
  let local_auth = localGet(global.project_key, true);
  data.token = local_auth;
  return request({
    url: constants.getunitnumApi,
    method: "post",
    data: data,
  });
}

function getmrnumApi(data) {
  let local_auth = localGet(global.project_key, true);
  data.token = local_auth;
  return request({
    url: constants.getmrnumApi,
    method: "post",
    data: data,
  });
}

function roomusagerate1Api(data) {
  let local_auth = localGet(global.project_key, true);
  data.token = local_auth;
  return request({
    url: constants.roomusagerate1Api,
    method: "post",
    data: data,
  });
}

function roomusagerate2Api(data) {
  let local_auth = localGet(global.project_key, true);
  data.token = local_auth;
  return request({
    url: constants.roomusagerate2Api,
    method: "post",
    data: data,
  });
}

function loanamtApi(data) {
  let local_auth = localGet(global.project_key, true);
  data.token = local_auth;
  return request({
    url: constants.loanamtApi,
    method: "post",
    data: data,
  });
}

function roomspagcerate1Api(data) {
  let local_auth = localGet(global.project_key, true);
  data.token = local_auth;
  return request({
    url: constants.roomspagcerate1Api,
    method: "post",
    data: data,
  });
}

function roomspagcerate2Api(data) {
  let local_auth = localGet(global.project_key, true);
  data.token = local_auth;
  return request({
    url: constants.roomspagcerate2Api,
    method: "post",
    data: data,
  });
}

function showgeolistApi(data) {
  let local_auth = localGet(global.project_key, true);
  data.token = local_auth;
  return request({
    url: constants.showgeolistApi,
    method: "post",
    data: data,
  });
}

function showunitbyroomidApi(data) {
  let local_auth = localGet(global.project_key, true);
  data.token = local_auth;
  return request({
    url: constants.showunitbyroomidApi,
    method: "post",
    data: data,
  });
}

function showunitroominfo(data) {
  let local_auth = localGet(global.project_key, true);
  data.token = local_auth;
  return request({
    url: constants.showunitroominfo,
    method: "post",
    data: data,
  });
}

function exportroomApi() {
  let local_auth = localGet(global.project_key, true);
  return request({
    url: constants.exportroomApi + "?token=" + local_auth,
    method: "get",
  });
}

function listloanassignmentbyidr(data) {
  return generalRequet(data, constants.listloanassignmentbyidr);
}
function getFloorById(data) {
  return generalRequet(data, constants.getFloorByIdApi);
}
function assignRoomDetailApi(data) {
  return generalRequet(data, constants.assignRoomDetail);
}
function getRoomStatApi(data) {
  return generalRequet(data, constants.getRoomStatApi);
}
function getCurrentAssignApi(data) {
  return generalRequet(data, constants.getCurrentAssignApi);
}
function deleteFloorApi(data) {
  return generalRequet(data, constants.deleteFloorApi);
}
function getroomunitinfo(data) {
  return generalRequet(data, constants.getroomunitinfo);
}
function renamefloorApi(data) {
  return generalRequet(data, constants.renameFloorApi);
}
function searchunitApi(data) {
  return generalRequet(data, constants.searchunit);
}
function renameBuildingApi(data) {
  return generalRequet(data, "/renamebuilding");
}

export {
  deleteFloorApi,
  getCurrentAssignApi,
  assignRoomDetailApi,
  editRentContractApi,
  getRoomDataApi,
  createRoomApi,
  updateRoomApi, // Room接口
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
  editRentContractDetailApi,
  listLoanAssignmentApi,
  deleteLoanAssignmentApi,
  createLoanAssignmentApi,
  editLoanAssignmentApi,
  getFloorById,
  assignroomApi,
  getleaderroombyunitApi,
  getroomnumApi,
  getroomspaceApi,
  getunitnumApi,
  getmrnumApi,
  roomusagerate1Api,
  roomusagerate2Api,
  loanamtApi,
  roomspagcerate1Api,
  roomspagcerate2Api,
  exportroomApi,
  showgeolistApi,
  showunitbyroomidApi,
  showunitroominfo,
  listPatrolApi,
  createPatrolApi,
  editPatrolApi,
  deletePatrolApi,
  listloanassignmentbyidr,
  getRoomStatApi,
  getroomunitinfo,
  renamefloorApi,
  renameBuildingApi,
  searchunitApi,
  changeRoomTypeApi,
  //jiangdu
  queryTagsApi,
  getPolicysApi,
  postPolicyApi,
  updatePolicyApi,
  deletePolicyApi,
  getTagsApi,
  postTagsApi,
  updateTagsApi,
  deleteTagsApi,
  registerUserApi,
  deletePolicyTagApi,
  addPolicyTagApi,
  getRecommendCompanysApi,
  getCompanysApi,
  postRecommendListApi
};

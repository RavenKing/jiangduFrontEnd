import request from "./_request";
import constants from "./constants";
import global from "@/global/index";
import { localGet } from "@/util/storage"; // 导入存储函数
// 登录接口
function registerUserApi(data) {
  data = {
    data: data,
  };
  return generalRequest(data, constants.userApi);
}

function getHistoricalApi() {
  var data = {};
  return generalRequest(data, constants.historicalPolicyCompanyApi);
}
function getUserApi() {
  return generalGetRequest(constants.userApi);
}
function updateBlackListApi(data) {
  data = {
    data: data,
  };
  return generalPutRequest(data, constants.blacklistApi);
}
function getTagsApi() {
  return generalGetRequest(constants.tagsApi);
}

function getCompanysApi() {
  return generalGetRequest(constants.getCompanysApi);
}

function getTalentsApi() {
  return generalGetRequest(constants.talentsApi);
}
function getTalentTagsApi(data) {
  data = {
    data: data,
  };
  return generalRequest(data, constants.talentTagsApi);
}
function addTalentTagsApi(data) {
  data = {
    data: data,
  };
  return generalRequest(data, constants.addTalentTagApi);
}
function deleteTalentTagsApi(data) {
  data = {
    data: data,
  };
  return generalRequest(data, constants.deleteTalentTagApi);
}
function updateTalentApi(data) {
  data = {
    data: data,
  };
  return generalPutRequest(data, constants.talentsApi);
}
function deleteTalentApi(data) {
  data = {
    data: data,
  };
  return generalDeleteRequest(data, constants.talentsApi);
}
function postTalentApi(data) {
  data = {
    data: data,
  };
  return generalRequest(data, constants.talentsApi);
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
  return generalRequest(data, constants.tagsApi);
}

function getFinApi(data) {
  data = {
    data: data,
  };
  return generalRequest(data, constants.finApi);
}

function postFinApi(data) {
  data = {
    data: data,
  };
  return generalRequest(data, constants.postFinApi);
}

function updateFinApi(data) {
  data = {
    data: data,
  };
  return generalPutRequest(data, constants.finApi);
}
function deleteFinApi(data) {
  data = {
    data: data,
  };
  return generalDeleteRequest(data, constants.finApi);
}

function deleteFinTagApi(data) {
  data = {
    data: data,
  };
  return generalRequest(data, constants.deleteFinTagApi);
}
function addFinTagApi(data) {
  data = {
    data: data,
  };
  return generalRequest(data, constants.addFinTagApi);
}
function getFinTagApi(data) {
  data = {
    data: data,
  };
  return generalRequest(data, constants.getFinTagApi);
}
/***
 * asset
 *
 */

function getAssetApi(data) {
  data = {
    data: data,
  };
  return generalRequest(data, constants.assetApi);
}

function postAssetApi(data) {
  data = {
    data: data,
  };
  return generalRequest(data, constants.postAssetApi);
}

function updateAssetApi(data) {
  data = {
    data: data,
  };
  return generalPutRequest(data, constants.assetApi);
}
function deleteAssetApi(data) {
  data = {
    data: data,
  };
  return generalDeleteRequest(data, constants.assetApi);
}

function deleteAssetTagApi(data) {
  data = {
    data: data,
  };
  return generalRequest(data, constants.deleteAssetTagApi);
}
function addAssetTagApi(data) {
  data = {
    data: data,
  };
  return generalRequest(data, constants.addAssetTagApi);
}
function getAssetTagApi(data) {
  data = {
    data: data,
  };
  return generalRequest(data, constants.getAssetTagApi);
}

/** recommend list
 *
 */
function postRecommendListApi(data) {
  data = {
    data: data,
  };
  return generalRequest(data, constants.postRecommendList);
}

function queryTagsApi(type) {
  return queryGetRequest(type, constants.tagsApi);
}

function getPolicysApi(data) {
  data = {
    data: data,
  };
  return generalRequest(data, constants.policyApi);
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
  return generalRequest(data, constants.addPolicyApi);
}
function getPolicyTagsApi(data) {
  data = {
    data: data,
  };
  return generalRequest(data, constants.policyTagsApi);
}
function addPolicyTagApi(data) {
  data = {
    data: data,
  };
  return generalRequest(data, constants.addTageApi);
}
function deletePolicyTagApi(data) {
  data = {
    data: data,
  };
  return generalRequest(data, constants.deletePolicyTageApi);
}

function getRecommendCompanysApi(data) {
  return generalGetRequest(constants.recommendPolicyApi + "/" + data.POLICY_ID);
}
function getRoomDataApi(data) {
  return generalRequest(data, constants.roomGetAPI);
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
  return generalRequest(data, constants.rentRoomGetAPI);
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
  return generalRequest(data, constants.createAssignmentRentApi);
}
function listRentRoomAssignmentApi(data) {
  return generalRequest(data, constants.listRentRoomAssignmentApi);
}

// function deleteRentRoomAssignmentApi(data)
// {
//     return generalRequest(data,constants.deleteRentRoomAssignmentApi)
// }
function listLoanAssignmentApi(data) {
  return generalRequest(data, constants.listLoanAssignmentApi);
}
function deleteLoanAssignmentApi(data) {
  return generalRequest(data, constants.deleteLoanAssignmentApi);
}
function createLoanAssignmentApi(data) {
  return generalRequest(data, constants.createLoanAssignmentApi);
}
function editLoanAssignmentApi(data) {
  return generalRequest(data, constants.editLoanAssignmentApi);
}

function changeRoomTypeApi(data) {
  return generalRequest(data, constants.changeRoomTypeApi);
}
function generalRequest(data, apiName) {
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
  return generalRequest(data, constants.createLeaderAssignApi);
}

function editRentContractDetailApi(data) {
  return generalRequest(data, constants.editRentContractDetailApi);
}
function editRentContractApi(data) {
  return generalRequest(data, constants.editRentContractApi);
}
function listPatrolApi(data) {
  return generalRequest(data, constants.listPatrolApi);
}

function createPatrolApi(data) {
  return generalRequest(data, constants.createPatrolApi);
}

function editPatrolApi(data) {
  return generalRequest(data, constants.editPatrolApi);
}

function deletePatrolApi(data) {
  return generalRequest(data, constants.deletePatrolApi);
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
  return generalRequest(data, constants.listloanassignmentbyidr);
}
function getFloorById(data) {
  return generalRequest(data, constants.getFloorByIdApi);
}
function assignRoomDetailApi(data) {
  return generalRequest(data, constants.assignRoomDetail);
}
function getRoomStatApi(data) {
  return generalRequest(data, constants.getRoomStatApi);
}
function getCurrentAssignApi(data) {
  return generalRequest(data, constants.getCurrentAssignApi);
}
function deleteFloorApi(data) {
  return generalRequest(data, constants.deleteFloorApi);
}
function getroomunitinfo(data) {
  return generalRequest(data, constants.getroomunitinfo);
}
function renamefloorApi(data) {
  return generalRequest(data, constants.renameFloorApi);
}
function searchunitApi(data) {
  return generalRequest(data, constants.searchunit);
}
function renameBuildingApi(data) {
  return generalRequest(data, "/renamebuilding");
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
  getPolicyTagsApi,
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
  postRecommendListApi,
  getHistoricalApi,
  getTalentsApi,
  getUserApi,
  updateBlackListApi,
  getFinApi,
  postFinApi,
  updateFinApi,
  deleteFinApi,
  deleteFinTagApi,
  addFinTagApi,
  getFinTagApi,
  getAssetApi,
  postAssetApi,
  updateAssetApi,
  deleteAssetApi,
  deleteAssetTagApi,
  addAssetTagApi,
  getAssetTagApi,
  getTalentTagsApi,
  addTalentTagsApi,
  deleteTalentTagsApi,
  postTalentApi,
  updateTalentApi,
  deleteTalentApi,
};

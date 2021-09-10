import constants from "./constants";
import {
  generalGetRequest
} from "./utilApi"; // 导入存储函数
// 登录接口

//policy
function getRecommendCompanysApi(data) {
  return generalGetRequest(constants.recommendPolicyApi + "/" + data.POLICY_ID);
}
//fi
function getRecommendFiCompanysApi(data) {
  return generalGetRequest(constants.recommendFinApi + "/" + data.FIN_ID);
}

function getRecommendASCompanysApi(data) {
  return generalGetRequest(constants.recommendASApi + "/" + data.ASSET_ID);

}

function getRecommendTECHCompanysApi(data) {
  return generalGetRequest(constants.recommendTECHApi + "/" + data.TECH_ID);

}
export {
  getRecommendCompanysApi,
  getRecommendFiCompanysApi,
  getRecommendASCompanysApi,
  getRecommendTECHCompanysApi
};
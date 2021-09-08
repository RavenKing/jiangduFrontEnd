import constants from "./constants";
import { generalGetRequest} from "./utilApi"; // 导入存储函数
// 登录接口

//policy
function getRecommendCompanysApi(data) {
    return generalGetRequest(constants.recommendPolicyApi + "/" + data.POLICY_ID);
  }
//fi
  function getRecommendFiCompanysApi(data) {
    return generalGetRequest(constants.recommendFinApi + "/" + data.FIN_ID);
  }
export {
    getRecommendCompanysApi,
    getRecommendFiCompanysApi
};

import constants from "./constants";
import { generalRequest,generalPutRequest,generalDeleteRequest} from "./utilApi"; // 导入存储函数
// 登录接口
function getTechApi(data) {
    data = {
      data: data,
    };
    return generalRequest(data, constants.techApi);
  }
  
  function postTechApi(data) {
    data = {
      data: data,
    };
    return generalRequest(data, constants.postTechApi);
  }
  
  function updateTechApi(data) {
    data = {
      data: data,
    };
    return generalPutRequest(data, constants.techApi);
  }
  function deleteTechApi(data) {
    data = {
      data: data,
    };
    return generalDeleteRequest(data, constants.techApi);
  }
  
  function deleteTechTagApi(data) {
    data = {
      data: data,
    };
    return generalRequest(data, constants.deleteTechTagApi);
  }
  function addTechTagApi(data) {
    data = {
      data: data,
    };
    return generalRequest(data, constants.addTechTagApi);
  }
  function getTechTagApi(data) {
    data = {
      data: data,
    };
    return generalRequest(data, constants.getTechTagApi);
  }

export {
    getTechApi,
    getTechTagApi,
    addTechTagApi,
    deleteTechTagApi,
    deleteTechApi,
    updateTechApi,
    postTechApi
};

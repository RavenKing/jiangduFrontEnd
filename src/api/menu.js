import request from "./_request";

// 1获取菜单数据接口
function getMenuDataApi(data) {
  return request({
    url: "/Api/GetMenusByUserId",
    method: 'post',
    data
  });
}
function getSelectDataApi(data)
{
  return request({
    url: "/Api/GetSelectData",
    method: 'post',
    data
  });
}

export {
  getMenuDataApi,
  getSelectDataApi // 1获取菜单数据接口
}
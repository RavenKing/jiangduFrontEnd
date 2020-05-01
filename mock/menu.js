const menus = [{
    id: "3",
    title: '系统功能',
    icon: "el-icon-monitor",
    children: [
      {
        id: "3-2",
        title: "资产管理",
        name: "资产管理",
        url: "/ui/asset",
        icon:"el-icon-edit"
      },
      {
        id: "3-8",
        title: "租赁房屋",
        name: "租赁房屋",
        url: "/ui/rentroom",
        icon:"el-icon-star-on"
      },
      {
        id: "3-3",
        title: "BIM三维模型",
        name: "BIM三维模型",
        url: "/ui/bim"
      },
      {
        id: "3-4",
        title: "合同管理",
        name: "合同管理",
        url: "/ui/contract",
        icon:"el-icon-star-on"
      },
      /* {
        id: "3-5",
        title: "树形表格",
        url: "/ui/table"
      }, */
      {
        id: "3-6",
        title: "单位管理",
        url: "/ui/unit",
        icon:"el-icon-star-on"
      },
      {
        id: "3-7",
        title: "员工管理",
        url: "/ui/employee",
        icon:"el-icon-star-on"
      }, {
        id: "3-28",
        title: "baidu地图",
        url: "/map",
        icon:"el-icon-star-on"
      },
    ]
  },
  // {
  //   id: "1",
  //   title: "旅行计划",
  //   icon: "el-icon-video-camera",
  //   module: "tour",
  //   children: [{
  //       id: "1-1",
  //       title: "云台之间",
  //       url: "/tour/cloud"
  //     },
  //     {
  //       id: "1-2",
  //       title: "天空之镜",
  //       url: "/tour/sky"
  //     },
  //     {
  //       id: "1-3",
  //       title: "蓬莱之岛",
  //       url: "/tour/penle"
  //     },
  //     {
  //       id: "1-4",
  //       title: "西塘之仙",
  //       url: "/tour/muslin"
  //     },
  //   ] // 菜单数据
  // },
  // {
  //   id: "2",
  //   title: "人生阶梯",
  //   icon: "el-icon-guide",
  //   module: "ladder",
  //   children: [{
  //       id: "2-1",
  //       title: "毛头少年",
  //       url: "/ladder/juvenile"
  //     },
  //     {
  //       id: "2-2",
  //       title: "热烈青春",
  //       url: "/ladder/may"
  //     },
  //   ]
  // }
]

const selects = [{
    id: 1,
    name: "上海"
  },

  {
    id: 2,
    name: "北京"
  },
  {
    id: 3,
    name: "金山"
  },
  {
    id: 4,
    name: "石化"
  },

]
export default [{
    url: '/Api/GetMenusByUserId',
    type: 'post',
    response: () => {
      return {
        code: 200,
        data: menus
      }
    }
  },
  {
    url: '/Api/GetSelectData',
    type: 'post',
    response: () => {
      return {
        code: 200,
        data: selects
      }
    }

  }
]
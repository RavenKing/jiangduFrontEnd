const menus = [{
    id: "3",
    title: '',
    children: [{
      id: "3-6",
      title: "企业管理",
      url: "/ui/unit",
      icon:"home icon"
    },
    {
      id: "3-2",
      title: "政策管理",
      name: "政策管理",
      url: "/ui/asset",
      icon:"keyboard icon",
      params:{kind:1}
    },{
      id: "4-2",
      title: "科技管理",
      name: "科技管理",
      url: "/ui/asset2",
      icon:"keyboard icon",
      params:{kind:2}
    },
      {
        id: "3-8",
        title: "人才管理",
        name: "人才管理",
        url: "/ui/rentroom",
        icon:"building icon"
      },
      {
        id: "3-9",
        title: "金融慧企管理",
        name: "金融慧企管理",
        url: "/ui/rentAssign",
        icon:"building icon"
      },
      // {
      //   id: "3-10",
      //   title: "可视化试图",
      //   name: "可视化试图",
      //   url: "/ui/visualization",
      //   icon:"chart bar icon"
      // },
      {
        id: "3-11",
        title: "标签管理",
        name: "标签管理",
        url: "/ui/tags",
        icon:"globe icon"
      },
      {
        id: "3-12",
        title: "黑白名单",
        name: "黑白名单管理",
        url: "/ui/blacklists",
        icon:"globe icon"
      },
      // {
      //   id: "3-3",
      //   title: "BIM三维模型",
      //   name: "BIM三维模型",
      //   url: "/ui/bim"
      // },
      // {
      //   id: "3-4",
      //   title: "出租合同",
      //   name: "出租合同",
      //   url: "/ui/contract"
      // },
      // {
      //   id: "3-5",
      //   title: "租赁合同",
      //   name: "租赁合同",
      //   url: "/ui/loancontract"
      // },
      // /* {
      //   id: "3-5",
      //   title: "树形表格",
      //   url: "/ui/table"
      // }, */

      // {
      //   id: "3-7",
      //   title: "员工管理",
      //   url: "/ui/employee"
      // }
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
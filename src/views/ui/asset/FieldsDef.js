import VuetableFieldSwitch from './VuetableFieldSwitch.vue'

export default [
  {
    name: VuetableFieldSwitch,
    title: '档案号',
    titleClass: 'center aligned',
    dataClass: 'left aligned',
    switch: {
      // label: 'Male?',
      label: (data) => data.name,
      field: (data) => data.gender === 'M',
    }
  },
  {
    name: "usage1",
    title: '<i class="white user outline icon"></i>家地编号',
    width: "20%",
    sortField: "usage1"
  },
  {
    name: "email",
    title: '<i class="address card icon"></i>地籍编号',
    width: "20%",
    sortField: "email"
  },
  {
    name: "address",
    sortField: "group_id",
    title: '<i class="white sitemap icon"></i>省/自治区',
    width: "15%"
  },
  {
    name: "address",
    sortField: "group_id",
    title: '<i class="grey sitemap icon"></i>盟市',
    width: "15%"
  },
  {
    name: "group.description",
    sortField: "group_id",
    title: '<i class="grey sitemap icon"></i>旗县区',
    width: "15%"
  },
  {
    name: "group.description",
    sortField: "group_id",
    title: '<i class="grey sitemap icon"></i>街道地址',
    width: "15%"
  },
  {
    name: "group.description",
    sortField: "group_id",
    title: '<i class="grey sitemap icon"></i>面积',
    width: "15%"
  },
  {
    name: "group.description",
    sortField: "group_id",
    title: '<i class="grey sitemap icon"></i>实际用途',
    width: "15%"
  },
  {
    name: "action",
    title: '<i class="grey heterosexual icon"></i>操作',
    titleClass: "center aligned",
    dataClass: "center aligned",
    width: "15%"
  },
];

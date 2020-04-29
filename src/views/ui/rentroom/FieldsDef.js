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
    name: "room_id",
    title: '<i class="white user outline icon"></i>房屋id',
    width: "20%",
    sortField: "usage1"
  },
  {
    name: "cert_id",
    title: '<i class="address card icon"></i>权证号',
    width: "20%",
    sortField: "cert_id"
  },
  {
    name: "owner",
    sortField: "owner",
    title: '<i class="white sitemap icon"></i>权证人',
    width: "15%"
  },
  {
    name: "address",
    sortField: "address",
    title: '<i class="white sitemap icon"></i>房屋地址',
    width: "15%"
  },
  {
    name: "usage",
    sortField: "usage",
    title: '<i class="white sitemap icon"></i>房屋用途',
    width: "15%"
  },
  {
    name: "age",
    sortField: "age",
    title: '<i class="white sitemap icon"></i>建造年代',
    width: "15%"
  },
  {
    name: "space",
    sortField: "space",
    title: '<i class="white sitemap icon"></i>建筑面积',
    width: "15%"
  },
  {
    name: "action",
    title: '<i class="white heterosexual icon"></i>操作',
    titleClass: "center aligned",
    dataClass: "center aligned",
    width: "20%"
  },
];

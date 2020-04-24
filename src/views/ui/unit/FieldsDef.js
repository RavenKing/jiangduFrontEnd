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
    name: "name",
    title: '<i class="white user outline icon"></i>name',
    width: "20%",
    sortField: "name"
  },
  {
    name: "level_num",
    title: '<i class="address card icon"></i>level_num',
    width: "20%",
    sortField: "cert_id"
  },
  {
    name: "enumber",
    sortField: "enumber",
    title: '<i class="white sitemap icon"></i>enumber',
    width: "15%"
  },
  {
    name: "level",
    sortField: "level",
    title: '<i class="white sitemap icon"></i>level',
    width: "15%"
  },
  {
    name: "created_on",
    sortField: "created_on",
    title: '<i class="grey sitemap icon"></i>created_on',
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

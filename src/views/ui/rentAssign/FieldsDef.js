import moment from 'moment'

export default [
  {
    name: "roomname",
    title: '房屋名称',
    width: "15%"
  },
  {
    name: "address",
    title: '房屋地址',
    width: "20%",
  },
  {
    name: "appdate",
    title: '申报时间',
    width: "15%",
    formatter (value) {
      return moment(value).format("YYYY-MM-DD");
    }
  },  {
    name: "unit_name",
    title: '单位',
    width: "15%"
  },  {
    name: "contract",
    title: '单位联系人',
    width: "15%"
  },  {
    name: "tel",
    title: '电话',
    width: "15%"
  },
  {
    name: "statusText",
    title: '状态',
    width: "15%"
  },
  {
    name: "action",
    title: '操作',
    width: "15%"
  },
];

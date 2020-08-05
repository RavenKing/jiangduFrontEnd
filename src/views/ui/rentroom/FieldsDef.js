
export default [

  {
    name: "address",
    title: '租借地址',
    width: "15%"
  },
  {
    name: "space",
    title: '借用房屋面积(m2)',
    width: "15%"
  },
  {
    name: "contract_info.rent_amt",
    title: '借用年租金(万元)',
    width: "15%"
  },
  {
    name: "contract_info.rent_amt",
    title: '日租金(元/m2)',
    width: "15%",
    formatter (value) {
      if(value==null||value==undefined)
      {
        return ""
      }
      return parseInt(value/365).toString();
    }
  },
  {
    name: "qishinianxian",
    title: '租赁起始年限',
    width: "15%",
  },
  {
    name: "contract_info.rentowner",
    title: '业主名称',
    width: "15%"
  },
  {
    name: "contract_info.rentunit",
    title: '租借单位',
    width: "15%"
  },
  {
    name: "action",
    title: '操作',
    width: "15%"
  },
];

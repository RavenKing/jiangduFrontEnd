
export default [
  {
    name: "status",
    title: '状态',
    width: "15%",
    formatter (value) {
      if(value=="normal")
      {

        return "<div class=\"normalIcon\"></div>"
      }else(value=="warning")
      {
        return "<div class=\"alertIcon\"></div>";
      }
    }
  },
  {
    name: "address",
    title: '租借地址',
    width: "15%"
  },
  {
    name: "space",
    title: '借用房屋面积(m²)',
    width: "15%"
  },
  {
    name: "ori_space",
    title: '可分配面积(m²)',
    width: "15%"
  },
  {
    name: "contract_info.rent_amt",
    title: '借用年租金(元)',
    width: "15%"
  },
  {
    name: "contract_info.rent_amt",
    title: '日租金(元/m²)',
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
    title: '租赁时间',
    width: "15%",
  },
  {
    name: "contract_info.rentowner",
    title: '业主名称',
    width: "15%"
  },
  {
    name: "action",
    title: '操作',
    width: "15%"
  },
];

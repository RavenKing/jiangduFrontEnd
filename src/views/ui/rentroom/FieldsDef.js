
export default [
  // {
  //   name: "status",
  //   title: '名称',
  //   width: "15%",
  //   formatter (value) {
  //     if(value=="normal")
  //     {

  //       return "<div class=\"normalIcon\"></div>"
  //     }else(value=="warning")
  //     {
  //       return "<div class=\"alertIcon\"></div>";
  //     }
  //   }
  // },
  {
    name: "roomname",
    title: '房屋名称',
    width: "35%"
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
    name: "contract_info.rent_amt",
    title: '借用年租金(元)',
    width: "15%"
  },
  {
    name: "wuyefei",
    title: '物业费(元)',
    width: "15%"
  },
  {
    name: "rizujin",
    title: '日租金(元/m²)',
    width: "15%",
    formatter (value) {
      return value.toFixed(2);
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
    width: "150px"
  },
];

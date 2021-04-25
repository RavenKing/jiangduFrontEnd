
export default [

  {
    name: "address",
    title: '房屋地址',
    width: "25%"
  },
  {
    name: "zhuguandanwei",
    title: '主管单位',
    width: "20%",
  },
  {
    name: "inaccount",
    title: '有无产证',
    width: "20%",
  },
  {
    name: "renter",
    title: '承租方',
    width: "20%",
  },
  {
    name: "contract_space",
    title: '合同面积(m²)',
    width: "20%",
  },
  {
    name: "rent_time",
    title: '合同时间',
    width: "20%",
  },
  {
    name: "rent_amt",
    title: '应收租金(元/m²)',
    width: "15%",
  },
  {
    name: "tax_info",
    title: '税费',
    width: "15%"
  },
  {
    name: "rent_info",
    title: '上缴金额',
    width: "15%"
  },
  {
    name: "baozheng_amt",
    title: '保证金',
    width: "15%"
  },
  {
    name: "is_borrow",
    title: '出借/出租',
    width: "15%",
    formatter (value) {
      if(value==1||value=='1')
      {
        return "出借";
      }
      else{return "出租";}
    }
  },  {
    name: "nextTimeStatus",
    title: '收缴状态',
    width: "25%",formatter(value){
      if(value=="normal")
      {return "<button role=\"button\" class=\"el-tag el-tag--success el-tag--light\">正常</button>";
    }else if(value=="error"){
      return "<button role=\"button\" class=\"el-tag el-tag--danger el-tag--light\">逾期</button>";
    }
    }
  },
  {
    name: "action",
    title: '操作',
    width: "150px"
  },
];

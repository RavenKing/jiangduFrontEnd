
export default [
    {
      name: "enter_date",
      title: '收缴时间',
      width: "15%"
    },
    {
      name: "fromtime",
      title: '起始时间',
      width: "15%"
    },
    {
      name: "totime",
      title: '结束时间',
      width: "15%"
    },
    {
      name: "amt",
      title: '金额(元)',
      width: "10%"
    },
    {
      name: "billing_status",
      title: '开票状态',
      width: "10%",
      formatter (value) {
        if(value==0||value=='0')
        {
          return "未开票";
        }
        else{return "已开票";}
      }
    },
    {
      name: "tax_amt",
      title: '税费(元)',
      width: "10%"
    },
    {
      name: "action",
      title: '操作',
      width: "100px"
    },
  ];
  
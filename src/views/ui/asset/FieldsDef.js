
export default [
  {
    name: "roomname",
    title: '房屋名称',
    width: "25%",
    titleClass: 'left aligned',
    dataClass: 'left aligned',
  },
  {
    name: "address",
    title: '地址',
    width: "25%",
    titleClass: 'left aligned',
    dataClass: 'left aligned',
    formatter (value) {
      return value
    }
  },
 
  {
    name: "kindText",
    title: '房屋性质',
    width: "15%",
    titleClass: 'left aligned',
    dataClass: 'left aligned',
  },
  {
    name: "rawspace",
    title: '土地面积(m²)',
    width: "15%",
    titleClass: 'v aligned',
    dataClass: 'left aligned',
    formatter (value) {
      return parseFloat(value).toFixed(2)
    }
  },
  {
    name: "space",
    title: '建筑面积(m²)',
    width: "15%",
    titleClass: 'v aligned',
    dataClass: 'left aligned',
    formatter (value) {
      return parseFloat(value).toFixed(2)
    }
  },
  {
    name: "tudispace",
    title: '土地面积(m²)',
    width: "15%",
    titleClass: 'v aligned',
    dataClass: 'left aligned',
    formatter (value) {
      return parseFloat(value).toFixed(2)
    }
  },
  {
    name: "jianzhuspace",
    title: '建筑面积(m²)',
    width: "15%",
    titleClass: 'v aligned',
    dataClass: 'left aligned',
    formatter (value) {
      return parseFloat(value).toFixed(2)
    }
  },
  {
    name: "wuchanTudiMianji",
    title: '土地面积(m²)',
    width: "15%",
    titleClass: 'v aligned',
    dataClass: 'left aligned',
    formatter (value) {
      return parseFloat(value).toFixed(2)
    }
  },
  {
    name: "wuchanJianZhuMianji",
    title: '建筑面积(m²)',
    width: "15%",
    titleClass: 'v aligned',
    dataClass: 'left aligned',
    formatter (value) {
      console.log(value);
      return parseFloat(value).toFixed(2)
    }
  },
  {
    name: "space6",
    title: '办公室面积(m²)',
    width: "15%",
    titleClass: 'v aligned',
    dataClass: 'left aligned',
    formatter (value) {
      return parseFloat(value).toFixed(2)
    }
  },
  {
    name: "space2",
    title: '服务用房面积(m²)',
    width: "15%",
    titleClass: 'v aligned',
    dataClass: 'left aligned',
    formatter (value) {
      return parseFloat(value).toFixed(2)
    }
  },
  {
    name: "space28",
    title: '设备用房面积(m²)',
    width: "15%",
    titleClass: 'v aligned',
    dataClass: 'left aligned',
    formatter (value) {
      return parseFloat(value).toFixed(2)
    }
  },
  {
    name: "space39",
    title: '附属用房面积(m²)',
    width: "15%",
    titleClass: 'v aligned',
    dataClass: 'left aligned',
    formatter (value) {
      return parseFloat(value).toFixed(2)
    }
  },
  {
    name: "space25",
    title: '业务用房面积(m²)',
    width: "15%",
    titleClass: 'v aligned',
    dataClass: 'left aligned',
    formatter (value) {
      return parseFloat(value).toFixed(2)
    }
  },
  {
    name: "space24",
    title: '业务用房用途',
    width: "15%",
    titleClass: 'v aligned',
    dataClass: 'left aligned',
  },
  {
    name: "action",
    title: '',
    titleClass: "left aligned",
    dataClass: "left aligned",
    width: "20%",
  },
];

export default [
  {
    name: "name",
    title: '单位名称',
    width: "10%",
    height:"100px",
    titleClass: "center aligned",
    dataClass: "aligned",
  },
  {
    name: "roomNumber",
    title: '房间号',
    width: "10%",
    titleClass: "center aligned",
    dataClass: "center aligned",
  },
  {
    name: "roomName",
    title: '房间名',
    width: "10%",
    titleClass: "center aligned",
    dataClass: "center aligned",
  },
  {
    name: "juji",
    title: '局级',
    width: "40px",
    titleClass: "center aligned",
    dataClass: "center aligned",
    formatter (value) {
      if(value==0||value=='0')
      {
        return "";
      }
      else{return value;}
    }
  },
  {
    name: "fujuji",
    title: '副局级',
    width: "40px",
    titleClass: "center aligned",
    dataClass: "center aligned",  formatter (value) {
      if(value==0||value=='0')
      {
        return "";
      }
      else{return value;}
    }
  },
  {
    name: "chuji",
    title: '处级',
    width: "40px",
    titleClass: "center aligned",
    dataClass: "center aligned",  formatter (value) {
      if(value==0||value=='0')
      {
        return "";
      }
      else{return value;}
    }
  },
  {
    name: "fuchuji",
    title: '副处级',
    width: "40px",
    titleClass: "center aligned",
    dataClass: "center aligned",  formatter (value) {
      if(value==0||value=='0')
      {
        return "";
      }
      else{return value;}
    }
  },
  {
    name: "keji",
    title: '科级',
    width: "40px",
    titleClass: "center aligned",
    dataClass: "center aligned",  formatter (value) {
      if(value==0||value=='0')
      {
        return "";
      }
      else{return value;}
    }
  },
  {
    name: "fukeji",
    title: '副科级',
    width: "40px",
    titleClass: "center aligned",
    dataClass: "center aligned",  formatter (value) {
      if(value==0||value=='0')
      {
        return "";
      }
      else{return value;}
    }
  },
  {
    name: "keyuan",
    title: '科员',
    width: "40px",
    titleClass: "center aligned",
    dataClass: "center aligned",  formatter (value) {
      if(value==0||value=='0')
      {
        return "";
      }
      else{return value;}
    }
  },
  {
    name: "qita",
    title: '其他',
    width: "40px",
    titleClass: "center aligned",
    dataClass: "center aligned",  formatter (value) {
      if(value==0||value=='0')
      {
        return "";
      }
      else{return value;}
    }
  },
  {
    name: "space",
    title: '面积(m²)',
    width: "60px",
    titleClass: "center aligned",
    dataClass: "center aligned",
  }
];

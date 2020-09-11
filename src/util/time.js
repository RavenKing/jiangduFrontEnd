import moment from "moment"

/**
 * 1时间格式化函数
 * @param {*} date 要格式化的时间
 * @param {*} format 格式
 */
function format(date, format = "YYYY-MM-DD") {
  return moment(date).format(format);
}

/**
 * 2date1是否在date2之后
 * @param {*} date1 
 * @param {*} date2 
 * @param {*} unit 比较的单位
 */
function isAfter(date1, date2, unit = "second") {
  return moment(date1).isAfter(date2, unit); // false
}
function fromShitFormat(stringshit){
  if(stringshit==null||stringshit=="")
  {
    return null;
  }
  var correctDate = stringshit.substring(0, 4) + "-" + stringshit.substring(4, 6) + "-" + stringshit.substring(6, 8);
  return correctDate;

}

function toShitFormat(shitDate){
   shitDate=new Date(shitDate);
  var shitTimeformat = shitDate.getFullYear();
  var monthDate=shitDate.getMonth()+1;
  if (monthDate< 10) {
      shitTimeformat = shitTimeformat + "0"
  }
  shitTimeformat = shitTimeformat.toString() + monthDate.toString();
  if (shitDate.getDate() < 10) {
      shitTimeformat = shitTimeformat + "0";
  }
  shitTimeformat = shitTimeformat.toString() + shitDate.getDate().toString();
  return shitTimeformat;
}
export {
  format, // 1时间格式化函数
  isAfter, // 2date1是否在date2之后,
  fromShitFormat,
  toShitFormat

}
export let formatState = (param) => {
   if (param == "0") {
      return "支付失败"
   } else if (param == "1") {
      return "支付成功"
   } else if (param == "2") {
      return "待支付"
   }
};


//时间格式化
export function formatTime(date) {
   var year = date.getFullYear()
   var month = date.getMonth() + 1
   var day = date.getDate()

   var hour = date.getHours()
   var minute = date.getMinutes()
   var second = date.getSeconds()

   function formatNumber(n) {
      n = n.toString()
      return n[1] ? n : '0' + n
   }

   return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

//时间格式化
export function formattime(date) {
   return date.substring(0, 4) + '/' + date.substring(4, 6) + '/' + date.substring(6, 8) + " " + date.substring(8, 10) + ":" + date.substring(10, 12) + ":" + date.substring(12);
}

export function timeNeeds() {
  var Year = new Date().getFullYear();
  var Month = new Date().getMonth() + 1;
  
  Month = Month < 10 ? ("0" + Month) : Month;
  return Year + '' + Month;
}


export function filterTime(time) {
  return time.substring(0, 4) + time.substring(5, 7) + time.substring(8, 10);
}

export function chartTime(time) {
  var str = time.substr(time.length - 4);
  return str.substr(0, 2) + "/" + str.substr(2, 5)
}

//随机32位字符串
export function randomString(len) {
   len = len || 32;
   var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    //****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****//
   var maxPos = $chars.length;
   var pwd = '';
   for (var i = 0; i < len; i++) {
      pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
   }
   return pwd;
}

export function percentNum(num, num2) {
  return (Math.round((num-0) / (num2-0) * 10000) / 100.00 + "%"); //小数点后两位百分比
}

//totalStatic页 重构返回数据

export function normalizeStoreList(obj, storeidList) {
  var arr = []; 
  storeidList.forEach((item) => {
    var o = {};
    var storeid = item.storeid;
    var storeidname = item.storeid + 'name';
    o.id = item.storeid;
    o.data = JSON.parse(obj[storeid]);
    o.name = obj[storeidname].storeName
    arr.push(o)
  })
  return arr;
}

export function NowTime() {
  var date = new Date();
  var Year = date.getFullYear();
  var Month = date.getMonth() + 1;
  var day = date.getDate();

  Month = Month < 10 ? ("0" + Month) : Month;
  day = day < 10 ? ("0" + day) : day;
  return Year + '-' + Month + '-'+day;
}




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




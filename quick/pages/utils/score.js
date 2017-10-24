import fetch from '../utils/fetch.js';
const ccId = "6574714a89d14f50448ba41ca3db17029523be445bacdbcf3b5d1ee3abe19a5e";

//区块链积分查询
export function query(refereeid) {
   fetch({
      url: "/app/query",
      // baseUrl: "http://192.168.50.157:9999",
      baseUrl: "https://store.lianlianchains.com",
      data: {
         acc: refereeid, //openid
         amt: "",
         reacc: "",//对方的openid 转移积分时这个字段才有否则为空
         ccId: ccId,
         func: "query",//查询积分
      },
      noLoading: true,
      method: "GET",
      header: { 'content-type': 'application/x-www-form-urlencoded' }
      // header: { 'content-type': 'application/json' }
   }).then(result => {
      console.log(result);
      console.log('查询成功')
   }).catch(err => {
      console.log("出错了")
      console.log(err)
   });
}

//区块链积分充值
export function recharge(refereeid, amt) {
   fetch({
      url: "/app/invoke",
      // baseUrl: "http://192.168.50.157:9999",
      baseUrl: "https://store.lianlianchains.com",
      data: {
         acc: refereeid, //openid
         // acc:"qqq",
         amt: amt,
         reacc: "",//对方的openid 转移积分时这个字段才有否则为空
         ccId: ccId,
         func: "recharge",//增加积分
         // func:"transfer",//转移积分
         // func: "takeCash",//减少积分
      },
      noLoading: true,
      method: "GET",
      header: { 'content-type': 'application/x-www-form-urlencoded' }
      // header: { 'content-type': 'application/json' }
   }).then(result => {
      console.log(result);
      console.log("充值成功");
   }).catch(err => {
      console.log("出错了")
      console.log(err)
   });
}

//区块链积分减少
export function takeCash(refereeid, amt) {
   fetch({
      url: "/app/invoke",
      // baseUrl: "http://192.168.50.157:9999",
      baseUrl: "https://store.lianlianchains.com",
      data: {
         acc: refereeid, //openid
         // acc:"qqq",
         amt: amt,
         reacc: "",//对方的openid 转移积分时这个字段才有否则为空
         ccId: ccId,
         // func: "recharge",//增加积分
         // func:"transfer",//转移积分
         func: "takeCash",//减少积分
      },
      noLoading: true,
      method: "GET",
      header: { 'content-type': 'application/x-www-form-urlencoded' }
      // header: { 'content-type': 'application/json' }
   }).then(result => {
      console.log(result);
      console.log("交易成功");
   }).catch(err => {
      console.log("出错了")
      console.log(err)
   });
}

//区块链积分转移
export function transfer(refereeid1, refereeid2, amt) {
   fetch({
      url: "/app/invoke",
      // baseUrl: "http://192.168.50.157:9999",
      baseUrl: "https://store.lianlianchains.com",
      data: {
         acc: refereeid1, //openid
         // acc:"qqq",
         amt: amt,
         reacc: refereeid2,//对方的openid 转移积分时这个字段才有否则为空
         ccId: ccId,
         // func: "recharge",//增加积分
         func: "transfer",//转移积分
         // func: "takeCash",//减少积分
      },
      noLoading: true,
      method: "GET",
      header: { 'content-type': 'application/x-www-form-urlencoded' }
      // header: { 'content-type': 'application/json' }
   }).then(result => {
      console.log(result);
      console.log("交易成功");
   }).catch(err => {
      console.log("出错了")
      console.log(err)
   });
}
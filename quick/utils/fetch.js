//request请求封装
// var ENV = "test";
export default function (param) {
  // if (ENV && ENV == "test") {
  //   param.baseUrl = "http://192.168.50.238:9888";
  // }

  // if(/^\/td/.test(param.url)) {
  //   param.baseUrl = "www.lianlianchains.com";
  // }

  return new Promise((resolve, reject) => {
    wx.request({
      url: param.baseUrl + param.url,
      data: param.data,
      header: param.header || { 'content-type': 'application/json' },
      method: param.method || "GET",// OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      success: function (res) {
        // wx.hideNavigationBarLoading()
        wx.hideToast();
        resolve(res.data)
      },
      fail: function (msg) {
        console.log('reqest error', msg)
        // wx.hideNavigationBarLoading()
        // wx.hideToast();
        reject('fail')
      }
    })
  })
}
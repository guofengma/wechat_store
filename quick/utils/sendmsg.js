export function sendmsg(mobile) {
  // 发送验证码
  return new Promise((resolve, reject) => {
    wx.request({
      url: 'https://store.lianlianchains.com/sms/send',
      data: {
        mobile: mobile
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        resolve(res.data)
      }
    })
  })
}
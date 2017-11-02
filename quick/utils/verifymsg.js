export function verifymsg(mobile, code) {
  // 验证验证码
  return new Promise((resolve, reject) => {
    wx.request({
      url: 'https://store.lianlianchains.com/sms/verify',
      data: {
        mobile: mobile,
        code: code
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
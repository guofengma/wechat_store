// pages/auth/auth.js
import fetch from '../../utils/fetch'

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  setPw(e) {
    this.setData({
      pw: e.detail.value
    })
  },
  setMobile(e) {
    this.setData({
      mobile: e.detail.value
    })
  },
  previewImage() {

    var img = 'https://store.lianlianchains.com/images/' + 
      this.data.id + '.png'
    // console.log(img)
    wx.previewImage({
      urls: [img],
    })
  },
  formSubmit(e) {

    fetch({
      url: "/CVS/apply/authorize",
      //   baseUrl: "http://192.168.50.57:9888", 
      baseUrl: "https://store.lianlianchains.com",
      data: {
        storeid: this.data.id,
        phoneno: this.data.mobile,
        password: this.data.pw
      },
      noLoading: false,
      method: "GET",
      header: { 'content-type': 'application/x-www-form-urlencoded' }
      //  header: { 'content-type': 'application/json' }
    }).then(result => {
      console.log(result)
      // ...

      if (result.ec == '000000') {

        wx.navigateTo({
          url: '../submit/submit',
        })
      } else {

        wx.showToast({
          title: result.em
        })
      }

    }).catch(err => {

      console.log("出错了")
      wx.showToast({
        title: '网络繁忙'
      })
      console.log(err)
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    console.log(options.id)

    this.setData({
      id: options.id,
      qr: 'https://store.lianlianchains.com/images/' + options.id + '.png'
    })

    // 查询店铺
    fetch({
      url: "/CVS/apply/getshop",
      //   baseUrl: "http://192.168.50.57:9888", 
      baseUrl: "https://store.lianlianchains.com",
      data: {
        storeid: this.data.id
      },
      noLoading: false,
      method: "GET",
      header: { 'content-type': 'application/x-www-form-urlencoded' }
      //  header: { 'content-type': 'application/json' }
    }).then(result => {
      console.log(result)
      // ...
      this.setData({

        storename: result.data.storeName,
        storeaddress: result.data.address
      })

    }).catch(err => {

      console.log("出错了")
      wx.showToast({
        title: '网络繁忙'
      })
      console.log(err)
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
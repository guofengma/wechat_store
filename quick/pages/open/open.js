// pages/open/open.js
import fetch from '../../utils/fetch';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showqr: false,
    showbtn: true
  },
  setPw(e) {
    this.setData({
      pw: e.detail.value
    })
  },
  setStorename(e) {
    this.setData({
      storename: e.detail.value
    })
  },
  goback(){
    wx.redirectTo({
      url: '../apply/apply'
    })
  },
  formSubmit(e) {

    fetch({
      url: "/CVS/apply/register",
      //   baseUrl: "http://192.168.50.57:9888", 
      baseUrl: "https://store.lianlianchains.com",
      data: {
        id: this.data.id,
        password: this.data.pw,
        storename: this.data.storename
      },
      noLoading: false,
      method: "GET",
      header: { 'content-type': 'application/x-www-form-urlencoded' }
      //  header: { 'content-type': 'application/json' }
    }).then(result => {

      console.log(result)

      if (result.ec == '000000') {

        this.setData({
          showqr: true,
          showbtn: false,
          qr: 'https://store.lianlianchains.com/images/' + this.data.id + '.png'
        })

        fetch({
          url: "/CVS/apply/updatename",
          //   baseUrl: "http://192.168.50.57:9888", 
          baseUrl: "https://store.lianlianchains.com",
          data: {
            id: this.data.id,
            storename: this.data.storename
          },
          noLoading: false,
          method: "GET",
          header: { 'content-type': 'application/x-www-form-urlencoded' }
          //  header: { 'content-type': 'application/json' }
        }).then(result => {

        }).catch(err => {

          console.log("出错了")
          wx.showToast({
            title: '网络繁忙'
          })
          console.log(err)
        })

      } else {

        console.log("出错了")
        wx.showToast({
          title: result.em
        })
        console.log(result)
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

    console.log(options)

    this.setData({
      mobile: options.mobile,
      id: options.id
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
// pages/scorelist/scorelist.js
import fetch from '../../utils/fetch';

let start = 1

Page({

  /**
   * 页面的初始数据
   */
  data: {
    start: 1
  },
  querystorelist() {

    fetch({
      url: "/CVS/score/querydetail",
      baseUrl: "http://192.168.50.239:9888",
      // baseUrl: "https://store.lianlianchains.com",
      data: {
        'start': start,
        'pagenum': 5,
        'unionId': wx.getStorageSync('unionId')
      },
      method: "GET",
      noLoading: true,
      header: { 'content-type': 'application/x-www-form-urlencoded' }
    }).then(res => {

      console.log(res)
      this.setData({

      })

    }).catch(err => {

      wx.showToast({
        title: '出错了',
      })
      console.log(err)

    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.querystorelist()
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
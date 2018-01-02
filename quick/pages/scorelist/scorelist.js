// pages/scorelist/scorelist.js
import fetch from '../../utils/fetch';

let start = 1

let storeList = []
let page = 0
let totalpage = 0

Page({

  /**
   * 页面的初始数据
   */
  data: {
    start: 1,
    noorder: false,
    storeList: [],
  },
  toDate(stime) {

    var n = stime;
    var date = new Date(n);
    var Y = date.getFullYear() + '/';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) :
      date.getMonth() + 1) + '/';
    var D = date.getDate() < 10 ? '0' +
      date.getDate() : date.getDate();
    var h = date.getHours() < 10 ? '0' +
      date.getHours() : date.getHours() + ':';
    var m = date.getMinutes() < 10 ? '0' +
      date.getMinutes() : date.getMinutes() + ':';
    var s = date.getSeconds() < 10 ? '0' +
      date.getSeconds() : date.getSeconds();

    return (Y + M + D + ' ' + h + m + s)
  },
  querystorelist() {

    wx.showLoading({
      title: '加载中',
    })

    fetch({
      url: "/CVS/score/querydetail",
      // baseUrl: "http://192.168.50.239:9888",
      baseUrl: "https://store.lianlianchains.com",
      data: {
        'start': start,
        'pagenum': 7,
        'unionId': wx.getStorageSync('unionId')
      },
      method: "GET",
      noLoading: true,
      header: { 'content-type': 'application/x-www-form-urlencoded' }
    }).then(res => {

      console.log(res)
      console.log('...')

      // var data = JSON.parse(res.data)

      var data = JSON.parse(res.data).records
      start = JSON.parse(res.data).nextser

      if (data.length != 0) {
        setTimeout(() => {

          console.log(data.length)

          for (var i = 0; i < data.length; i++) {
            data[i].time = this.toDate(data[i].time)
          }

          // start = data[data.length - 1].ser + 1

          this.setData({
            storeList: this.data.storeList.concat(data)
          })

        }, 500);
      } else {

        this.setData({
          noorder: true
        })
      }

      setTimeout(function () {
        wx.hideLoading()
      }, 500)

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
    start = 1
    this.querystorelist()
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
    this.querystorelist()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
// pages/score/score.js
import fetch from '../../utils/fetch';

let start = 1

let storeListUser = []
let pageUse = 0
let totalpageUser = 0

let storeList = []
let page = 0
let totalpage = 0

Page({

  /**
   * 页面的初始数据
   */
  data: {
    score: 0,
    storeListUser: [],
    storeList: [],
  },
  detail() {
    wx.navigateTo({
      url: '../scorelist/scorelist',
    })
  },
  invest() {
    wx.navigateTo({
      url: '../scoreinvest/scoreinvest',
    })
  }, 
  queryscore() {

    fetch({
      url: "/CVS/score/query",
        baseUrl: "http://192.168.50.239:9888",
      // baseUrl: "https://store.lianlianchains.com",
      data: {
        'unionId': wx.getStorageSync('unionId')
      },
      method: "GET",
      noLoading: true,
      header: { 'content-type': 'application/x-www-form-urlencoded' }
    }).then(res => {

      console.log(res)
      this.setData({
        score: (res.data / 100).toFixed(2)
      })

    }).catch(err => {

      wx.showToast({
        title: '出错了',
      })
      console.log(err)

    })
  },
  querystore(){

    fetch({
      url: "/wxpay/increaseall",
      baseUrl: "http://192.168.50.239:9888",
      // baseUrl: "https://store.lianlianchains.com",
      data: {
        'page': page,
        'pagenum': 10
      },
      method: "GET",
      noLoading: true,
      header: { 'content-type': 'application/x-www-form-urlencoded' }
    }).then(res => {

      console.log(res)

      if (res != '') {
        setTimeout(() => {

          totalpage = res.data.totalpage
          this.setData({
            storeList: this.data.storeList.concat(res.data.withDrawDay)
          })

        }, 500);
      } 

    }).catch(err => {

      wx.showToast({
        title: '出错了',
      })
      console.log(err)

    })

  },
  querystoreuser() {

    fetch({
      url: "/wxpay/increaseuser",
      baseUrl: "http://192.168.50.239:9888",
      // baseUrl: "https://store.lianlianchains.com",
      data: {
        'page': page,
        'pagenum': 10,
        'openid': wx.getStorageSync("user").openid
      },
      method: "GET",
      noLoading: true,
      header: { 'content-type': 'application/x-www-form-urlencoded' }
    }).then(res => {

      console.log(res)

      if (res != '') {
        setTimeout(() => {

          totalpageUser = res.data.totalpage
          this.setData({
            storeListUser: this.data.storeListUser.concat(res.data.withDrawDay)
          })

        }, 500);
      } 

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

    this.queryscore()
    this.querystoreuser()
    this.querystore()
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
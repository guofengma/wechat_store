// pages/scoreinvest/scoreinvest.js
import fetch from '../../utils/fetch';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    scoresum: 0,
    btn: true
  },
  setScore(e) {
    this.setData({
      scoresum: e.detail.value
    })
  },
  initScore(){
    this.setData({
      scoresum: ''
    })
  },
  initbtn(){

    var dt = new Date();
    console.log(dt.getDay())

    this.setData({
      btn: dt.getDay() != 0
    })

  },
  quit() {

    fetch({
      url: "/CVS/user/deletefinance",
      baseUrl: "http://192.168.50.239:9888",
      // baseUrl: "https://store.lianlianchains.com",
      data: {
        'openid': wx.getStorageSync("user").openid,
        'storeid': this.data.storeid,
        'score': this.data.scoresum
      },
      method: "GET",
      noLoading: true,
      header: { 'content-type': 'application/x-www-form-urlencoded' }
    }).then(res => {

      console.log(res)

      if (res.ec == '000000') {
        wx.navigateTo({
          url: '../score/score',
        })
      }

    }).catch(err => {

      wx.showToast({
        title: '出错了',
      })
      console.log(err)

    })
  },
  join() {

    console.log(this.data.scoresum)
    console.log(this.data.curscore)

    if (this.data.scoresum=='' || parseInt(this.data.scoresum) == 0) {
      wx.showToast({
        title: '请输入积分',
      })

      return
    }

    if (parseInt(this.data.scoresum) > parseInt(this.data.curscore)) {
      wx.showToast({
        title: '您的积分不足',
      })

      return
    }

    fetch({
      url: "/CVS/user/joinfinance",
      baseUrl: "http://192.168.50.239:9888",
      // baseUrl: "https://store.lianlianchains.com",
      data: {
        'openid': wx.getStorageSync("user").openid,
        'storeid': this.data.storeid,
        'score': this.data.scoresum
      },
      method: "GET",
      noLoading: true,
      header: { 'content-type': 'application/x-www-form-urlencoded' }
    }).then(res => {

      console.log(res)

      if (res.ec == '000000') {
        wx.navigateTo({
          url: '../score/score',
        })
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

    this.setData({
      investtype: options.investtype,
      storeid: options.storeid,
    })

    if (options.investtype == 0) {
      this.setData({
        curscore: options.curscore,
      })
    } else {
      this.setData({
        score: options.score,
        scorebonus: options.scorebonus,
        scoresum: parseInt(options.score) + parseInt(options.scorebonus)
      })
    }

    this.initbtn()

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
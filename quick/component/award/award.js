// pages/award/award.js
import fetch from '../../utils/fetch.js'

var onoff = true

Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: [
      "http://store.lianlianchains.com/xiaolian/rmb2.png",
      "http://store.lianlianchains.com/xiaolian/rmb5.png",
      "http://store.lianlianchains.com/xiaolian/rmb10.png"
    ],
    index: 0,
    guanbi: "../../image/guanbi.png",
    show: false,
    canUse: true
  },
  input(e) {
    this.setData({
      award: e.detail.value
    })
  },
  close() {
    this.setData({
      show: false
    })
  },
  award() {

    if(!this.data.award) {
      wx.showModal({
        content: "兑奖码不能为空",
      })
      return
    }

    if (onoff) {
      this.pack();
    }
  },
  pack() {
    onoff = false;
    let obj = {
      "200": 0,
      "500": 1,
      "1000": 2
    };

    fetch({
      url: "/wxpay/sendredpack",
      //   baseUrl: "http://192.168.50.57:9888", 
      baseUrl: "https://store.lianlianchains.com",
      data: {
        openid: wx.getStorageSync('user').openid,
        description: this.data.award
      },
      noLoading: false,
      method: "GET",
      header: { 'content-type': 'application/x-www-form-urlencoded' }
      //  header: { 'content-type': 'application/json' }
    }).then(result => {
      
      if (result.ec == "000000") {
        this.setData({
          index: obj[result.data],
          show: true
        })
      } else {
        wx.showModal({
          content: result.em,
        })
      }
      onoff = true;

    }).catch(err => {
      onoff = true;
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
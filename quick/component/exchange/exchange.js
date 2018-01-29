// pages/score/score.js
import fetch from '../../utils/fetch';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  preview() {
    wx.previewImage({
      current: this.data.receiveCode, // 当前显示图片的http链接
      urls: [this.data.receiveCode,] // 需要预览的图片http链接列表
    })
  },
 
  pay() {
    wx.scanCode({
      success: (res) => {
        console.log(res);

        wx.navigateTo({
          url: '../pay/pay?unionto='+res.result,
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let unionto = wx.getStorageSync('unionId');
    
    this.setData({
      receiveCode: "https://store.lianlianchains.com/qrcode?data=" + unionto + "&width=202&height=202"
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
    this.loadMore()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
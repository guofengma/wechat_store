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
          url: '../pay/pay?opento='+res.result,
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let opento = wx.getStorageSync('user').openid;
    
    this.setData({
      receiveCode: "https://store.lianlianchains.com/qrcode?data=" + opento + "&width=202&height=202"
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

  }
})
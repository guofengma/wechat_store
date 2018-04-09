// pages/settle/settle.js
import fetch from '../../utils/fetch';

Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },
  benefitView() {
    wx.navigateTo({
      url: '../benefit/benefit',
    })
  },
  saveUnion() {
    fetch({
      url: "/wx/account",
      //  baseUrl: "http://192.168.50.238:9888", 
      baseUrl: "https://store.lianlianchains.com",
      data: {
        openid: wx.getStorageSync('user').openid
      },
      noLoading: true,
      method: "GET",
      header: { 'content-type': 'application/x-www-form-urlencoded' }
      //  header: { 'content-type': 'application/json' }
    }).then(res => {

      console.log(res)

    }).catch(err => {
      console.log("出错了")
      wx.showToast({
        title: '网络繁忙'
      })
      console.log(err)
    });
  },  
  applyView() {
    wx.redirectTo({
      url: '../apply/apply',
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
    
    this.saveUnion()
  }
})
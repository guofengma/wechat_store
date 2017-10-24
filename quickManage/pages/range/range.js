// pages/range/range.js
import fetch from '../../utils/fetch'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    saleView: true,
    moneyView: false,
    amountrank: [],
    moneyrank: []
  },
  saleView() {
    this.setData({
      saleView: true,
      moneyView: false
    })
  },
  moneyView() {
    this.setData({
      moneyView:true,
      saleView:false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: '#ffffff',
      animation: {
        duration: 400,
        timingFunc: 'easeIn'
      }
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
    fetch({
      url: "/CVS/amountrank",
      //   baseUrl: "http://192.168.50.57:9888",
      baseUrl: "https://store.lianlianchains.com",
      data: {
        storeid: wx.getStorageSync('storeid')
      },
      method: "GET",
      noLoading: true,
      header: { 'content-type': 'application/x-www-form-urlencoded' }
    }).then(result => {
      console.log(result);
      this.setData({
        amountrank: result.slice(0,10)
      })
      
    }).catch(err => {
      console.log("出错了")
      wx.showToast({
        title: '出错了',
      })
      console.log(err)
    });

    fetch({
      url: "/CVS/moneyrank",
      //   baseUrl: "http://192.168.50.57:9888",
      baseUrl: "https://store.lianlianchains.com",
      data: {
        storeid: wx.getStorageSync('storeid')
      },
      method: "GET",
      noLoading: true,
      header: { 'content-type': 'application/x-www-form-urlencoded' }
    }).then(result => {
      console.log(result);
      this.setData({
        moneyrank: result.slice(0, 10)
      })

    }).catch(err => {
      console.log("出错了")
      wx.showToast({
        title: '出错了',
      })
      console.log(err)
    });
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
  
  }
})
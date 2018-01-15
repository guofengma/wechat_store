// pages/shelveOrderList/shelveOrderList.js
import fetch from '../../utils/fetch.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[]
  },
  sendOrder(e) {
    console.log(e)
    var storeid = e.target.dataset.storeid;
    wx.redirectTo({
      url: '../sendOrder/sendOrder?storeid=' + storeid,
    })
  },
  moveTo(e) {
    if (e.target.dataset.servicestate == 2) {
      wx.navigateToMiniProgram({
        appId: 'wx22980810fa9f0ba3',
        path: 'pages/submit/submit',
        envVersion: 'develop',
        success(res) {
          // 打开成功
        }
      })
    } else if (e.target.dataset.servicestate == 3){
      wx.showToast({
        title: '等待商家确认',
      })
    }
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    fetch({
      url: "/CVS/querybyopenid",
      // baseUrl: "http://192.168.50.239:9888",
      baseUrl: "https://store.lianlianchains.com",
      data: {
        openid: wx.getStorageSync('user').openid
      },
      method: "POST",
      noLoading: true,
      header: { 'content-type': 'application/x-www-form-urlencoded' }
    }).then(res => {
      console.log(res)
      this.setData({
        list: res.data
      })
    }).catch(err => {

    });
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
// pages/shelvenav/shelvenav.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [
      {
        idx: "第一步",
        title: "提供供应链信息",
        img: "../../image/gongyinglian.png"
      },
      {
        idx: "第二步",
        title: "货架参与方完成线上签约",
        img: "../../image/qianyue.png"
      },
      {
        idx: "第三步",
        title: "提供货架商品供应服务",
        img: "../../image/goodsgongying.png"
      }
    ]
  },
  shelveView() {
    wx.navigateTo({
      url: '../shelve/shelve',
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
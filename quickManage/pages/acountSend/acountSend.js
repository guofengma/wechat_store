import fetch from '../../utils/fetch.js';
import { filterTime} from '../../utils/filter'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active:true,
    base:1,
    multiIndex: [0, 0, 0],
    date: '',
    time: '12:01',
  },
  acountSend(e) {
    console.log(e)
    clearTimeout(timer)
    var timer = setTimeout(() => {
      let name = e.detail.value.production;
      let time = filterTime(e.detail.value.date);
      console.log(time)
      let amount = e.detail.value.money * this.data.base;
      if (name && time && amount) {
        fetch({
          url: "/CVS/account/save",
          //   baseUrl: "http://192.168.50.57:9888",
          baseUrl: "https://store.lianlianchains.com",
          data: {
            storeid: wx.getStorageSync('storeid'),
            name: name,
            time: time,
            amount: amount
          },
          method: "POST",
          noLoading: true,
          header: { 'content-type': 'application/x-www-form-urlencoded' }
        }).then(result => {
          if (result.ec === "000000") {
            wx.redirectTo({
              url: '../acount/acount'
            })
          }
          console.log(result)
        })
      }
    },20)
    
  },
  incomeView() {
    this.setData({
      active: true,
      base: 1
    })
  },
  sendView() {
    this.setData({
      active: false,
      base:-1
    })
  },
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  bindTimeChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time: e.detail.value
    })
  },
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
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
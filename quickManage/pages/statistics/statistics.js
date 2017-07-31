// pages/statistics/statistics.js
import fetch from '../../utils/fetch'
Page({

   /**
    * 页面的初始数据
    */
   data: {
      selectedA: true,
      selectedB: false,
      selectedC: false
   },
   selecttoday() {
      this.setData({
         selectedA: true,
         selectedB: false,
         selectedC: false
      })
      fetch({
         url: "/CVS/total",
         // baseUrl: "http://192.168.50.57:9888",
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
            count: result.count,
            totlefee: result.totlefee.toFixed(2)
         })
      }).catch(err => {
         console.log("出错了")
         console.log(err)
      });
   },
   selectyestoday() {
      this.setData({
         selectedA: false,
         selectedB: true,
         selectedC: false
      })
      fetch({
         url: "/CVS/totallastday",
         // baseUrl: "http://192.168.50.57:9888",
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
            count: result.count,
            totlefee: result.totlefee.toFixed(2)
         })
      }).catch(err => {
         console.log("出错了")
         console.log(err)
      });
   },
   selectrencent() {
      this.setData({
         selectedA: false,
         selectedB: false,
         selectedC: true
      })
      fetch({
         url: "/CVS/totallastseven",
         // baseUrl: "http://192.168.50.57:9888",
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
            count: result.count,
            totlefee: result.totlefee.toFixed(2)
         })
      }).catch(err => {
         console.log("出错了")
         console.log(err)
      });
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
      fetch({
         url: "/CVS/total",
         // baseUrl: "http://192.168.50.57:9888",
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
            count: result.count,
            totlefee: result.totlefee.toFixed(2)
         })
      }).catch(err => {
         console.log("出错了")
         console.log(err)
      });
      
      fetch({
         url: "/CVS/allgood",
         // baseUrl: "http://192.168.50.57:9888",
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
            amounts: result.count,
            totalcost: result.totle.toFixed(2)
         })
      }).catch(err => {
         console.log("出错了")
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
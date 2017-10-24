// pages/store/store.js
import fetch from '../../utils/fetch'
Page({

   /**
    * 页面的初始数据
    */
   data: {

   },
   bindScanTap() {
      wx.scanCode({
         success: (res) => {
            console.log(res);
            if (res.path) {
               var storeId = res.path.split('?')[1].split('&')[0].split('=')[1];
               var storeName = res.path.split('?')[1].split('&')[1].split('=')[1];
               // console.log(storeId)
               // console.log(storeName)
               if (storeId) {
                  wx.setStorageSync('storeId', storeId)
                  wx.setStorageSync('storeName', storeName)
               }
            }

            wx.switchTab({
               url: '../index/index'
            })
         }
      })
   },
   getShop(latitude, longitude) {
      fetch({
         url: "/CVS/getshop",
         // baseUrl: "http://192.168.50.57:9888",
         baseUrl: "https://store.lianlianchains.com",
         data: {
            lat: latitude,
            lng: longitude
            // lat: 39.90409,
            // lng: 116.407520
         },
         noLoading: true,
         method: "GET",
         header: { 'content-type': 'application/x-www-form-urlencoded' }
         // header: { 'content-type': 'application/json' }
      }).then(result => {
         console.log(result)
         
         wx.setStorageSync('storeId', result.storeId)
         wx.setStorageSync('storeName', result.storeName)
         if(result.storeId){
            setTimeout(() => {
               wx.switchTab({
                  url: '../index/index'
               })
            }, 20)
         }
         
      }).catch(err => {
         console.log("出错了")
         wx.showToast({
            title: '网络繁忙'
         })
         console.log(err)
      });
   },
   //匹配门店
   checkStore() {
      var that = this;
      wx.getLocation({
         type: 'wgs84',
         success: function (res) {
            var latitude = res.latitude
            var longitude = res.longitude
            console.log(latitude)
            console.log(longitude)
            var speed = res.speed
            var accuracy = res.accuracy

            that.getShop(latitude, longitude)
            
         }
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
      var that = this;
      wx.onAccelerometerChange((e) => {
         if (e.x > 0.6 && e.y > 0.6 || e.x > 0.6 && e.z > 0.6 || e.z > 0.6 && e.y > 0.6) {

            wx.vibrateLong({
               success: function () {
                  that.checkStore()
               }
            })
         }
      })
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
      wx.stopAccelerometer()
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
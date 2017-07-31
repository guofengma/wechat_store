// pages/submit/submit.js
import fetch from '../../utils/fetch'
Page({

   /**
    * 页面的初始数据
    */
   data: {
      disabled: true,
      isPhone: false,
      isPassword: false
   },
   mobHandler(e) {
      let mobile = e.detail.value.length;
      if (mobile == 11) {
         this.setData({
            isPhone: true
         })
      } else {
         if (this.data.isPhone == true) {
            this.setData({
               isPhone: false
            })
         }
      }
   },
   pwdHandler(e) {
      let pwd = e.detail.value.length;
      if (pwd == 6) {
         this.setData({
            isPassword: true
         })
      } else {
         if (this.data.isPassword == true) {
            this.setData({
               isPassword: false
            })
         }
      }
   },
   formSubmit(e) {
      console.log(e);
      //检查账号和密码是否正确
      fetch({
         url: "/CVS/user/login",
         //   baseUrl: "http://192.168.50.57:9888",
         baseUrl: "https://store.lianlianchains.com",
         data: {
            'phoneno': e.detail.value.phoneno,
            'password': e.detail.value.pwd
         },
         method: "POST",
         noLoading: true,
         header: { 'content-type': 'application/x-www-form-urlencoded' }
      }).then(result => {
         console.log(result);
         if (result.returncode == '01') {
            
            var timer = setTimeout(() => {
               this.setData({
                  hidden: true
               })
               clearTimeout(timer)
            }, 2000)
            wx.showToast({
               title: '用户名或密码错误',
            })
            return
         }
         if (result.returncode == '00') {
            wx.showToast({
               title: '登录成功',
               duration: 1500
            })
            wx.setStorageSync('storeid', result.storeid)
            var timer = setTimeout(() => {
               wx.switchTab({
                  url: '../check/check',
               })
               clearTimeout(timer)
            }, 1500)
         } 


      }).catch(err => {
         console.log("出错了")
         wx.showToast({
            title: '出错了',
         })
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
// pages/user/user.js
import fetch from '../../utils/fetch.js';

var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      isSubmit: false
  },
  orderView(){
      let mobile = wx.getStorageSync('mobile');
      if(this.data.mobile !== '') {
          wx.navigateTo({
              url: '../orderList/orderList'
          })
      }else{
          wx.navigateTo({
              url: '../submit/submit'
          })
      }
      
  },
  bindSubmitTap(){
      wx.navigateTo({
          url: '../submit/submit'
      })
  },
  cartView(e){
     console.log(e.target.dataset.totalnum);
     let totalnum = e.target.dataset.totalnum;
     if (totalnum > 0){
         wx.navigateTo({
            url: '../cart/cart',
         })
     }
  },
  _getCartnum(){
     fetch({
        url: "/CVS/cart/querycart",
        //   baseUrl: "http://192.168.50.57:9888", 
        baseUrl: "https://store.lianlianchains.com",
        data: {
           openid: wx.getStorageSync('user').openid,
           storeid: wx.getStorageSync('storeId')
        },
        noLoading: true,
        method: "GET",
        header: { 'content-type': 'application/x-www-form-urlencoded' }
        //  header: { 'content-type': 'application/json' }
     }).then(carts => {
        this.data.totalNum = 0;
        for (var i = 0; i < carts.length; i++) {
           this.data.totalNum += carts[i].amount
        }
        this.setData({
           totalNum: this.data.totalNum
        })
        console.log("购物车商品数量" + this.data.totalNum)
     }).catch(err => {
        console.log("出错了")
        wx.showToast({
           title: '网络繁忙'
        })
        console.log(err)
     });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    
    
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
      fetch({
         url: "/CVS/user/query",
         //   baseUrl: "http://192.168.50.57:9888",
         baseUrl: "https://store.lianlianchains.com",
         data: {
            openid: wx.getStorageSync('user').openid
         },
         noLoading: true,
         method: "GET",
         header: { 'content-type': 'application/x-www-form-urlencoded' }
         //   header: { 'content-type': 'application/json' }
      }).then(result => {
         console.log(result)
         
         if(result){
            let mobile = result.phoneno.substr(0, 3) + "****" + result.phoneno.substr(7)
            this.setData({
               mobile: mobile
            })
         }else{
            this.setData({
               mobile: ""
            })
         }
      }).catch(err => {
         console.log("出错了")
         console.log(err)
      });
      this._getCartnum();
      app.getUserInfo((userInfo) => {
          console.log(userInfo);
          //更新数据
          that.setData({
              userInfo: userInfo
          });
          wx.setStorageSync('userInfo', userInfo);

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
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  }
})
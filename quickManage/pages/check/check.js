// pages/user/user.js
import fetch from '../../utils/fetch.js';
var socketOpen = false
var onoff = true
var socketMsgQueue = []
var app = getApp();
Page({

   /**
    * 页面的初始数据
    */
   data: {
      messageArray: [],
      socketOpen: false,
   },
   scanCode() {
      var that = this;
      wx.scanCode({
         success: (res) => {
            console.log(res);
            let arr = res.result.split('_');
            wx.setStorageSync('orderNo', arr[0]);
            console.log("扫码成功");

            //查询订单状态是否已扫描过
            fetch({
               url: "/wxpay/queryOrderByNo",
               // baseUrl: "http://192.168.50.57:9888",
               baseUrl: "https://store.lianlianchains.com",
               data: {
                  orderNo: arr[0]
               },
               noLoading: true,
               method: "GET",
               header: { 'content-type': 'application/x-www-form-urlencoded' }
               // header: { 'content-type': 'application/json' }
            }).then(result => {
               console.log(result)
               if (result.checkstate == 0){
                  fetch({
                     url: "/wxpay/check",
                     // baseUrl: "http://192.168.50.57:9888",
                     baseUrl: "https://store.lianlianchains.com",
                     data: {
                        orderNo: arr[0],
                        storeid: wx.getStorageSync('storeid')
                     },
                     noLoading: true,
                     method: "POST",
                     header: { 'content-type': 'application/x-www-form-urlencoded' }
                     // header: { 'content-type': 'application/json' }
                  }).then(check => {
                     console.log("修改状态完毕")
                     console.log(check)
                     //推送消息
                     console.log('输出推送消息参数：')
                     console.log(arr[1])
                     that.sendSocketMessage(arr[1]);
                     //扫描完跳转到详情页
                     setTimeout(() => {
                        this.detailView();
                     }, 200)

                  }).catch(err => {

                  })
               }else{
                  wx.showToast({
                     title: '该商品已扫描过了',
                  })
               }

            }).catch(err => {

            })
           


         }
      })
   },
   detailView() {
      wx.navigateTo({
         url: '../detail/detail'
      })
   },
   orderView() {
      wx.navigateTo({
         url: '../orderList/orderList'
      })
   },
   staticView() {
      wx.navigateTo({
         url: '../statistics/statistics'
      })
   },
   /**
    * 生命周期函数--监听页面加载
    */
   onLoad(options) {
      var self = this;
      console.log("将要连接服务器。");
      wx.connectSocket({
         url: 'wss://store.lianlianchains.com/websocket'
      });

      wx.onSocketOpen(function (res) {
         console.log("连接服务器成功。");
         self.setData({
            socketOpen: true
         });
      });
      wx.onSocketError(function (res) {
         console.log('WebSocket连接打开失败，请检查！')
      })
      wx.onSocketMessage(function (res) {
         console.log('收到服务器内容：' + res.data);
      });
      wx.onSocketClose(function (res) {
         console.log(res)
      })
   },

   sendSocketMessage: function (msg) {
      wx.closeSocket()
      wx.connectSocket({
         url: 'wss://store.lianlianchains.com/websocket',
         fail: function (err) {
            console.log(err)
         }
      });
      wx.onSocketOpen(function (res) {
         console.log("连接服务器成功。");
         wx.sendSocketMessage({
            data: msg,
            success: function () {
               console.log("成功")
            },
            fail: function (err) {
               console.log(err)
            },
            complete: function () {
               console.log()
            }
         })
      });
      
   },
   ceshi(){
      console.log(111)
      
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
   onHide() {
      // wx.closeSocket()
      // wx.onSocketClose(function (res) {
      //    console.log('WebSocket 已关闭！')
      // })
   },
   onUnload(){
      // wx.closeSocket()
      
   }
})
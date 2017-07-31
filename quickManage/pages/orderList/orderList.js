// pages/orderList/orderList.js
import fetch from '../../utils/fetch';
import { formattime, formatState } from '../../utils/filter'

let orderList = [];
let page = 0;
let totalpage = 0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
      hasOrder:true,
      orderList:[],
      hidden: true
  },
  checkView(){

  },
  loadMore() {
     console.log(totalpage)
     if (page >= totalpage - 1) {
        console.log("没有更多了")
        page = totalpage
        this.setData({
           hidden: true
        })
     } else {
        console.log("加载更多")
        page++

        fetch({
           url: "/wxpay/queryShopOrderByPage",
         //   baseUrl: "http://192.168.50.57:9888",
            baseUrl: "https://store.lianlianchains.com",
           data: {
              storeid: wx.getStorageSync('storeid'),
              'page': page
           },
           method: "GET",
           noLoading: true,
           header: { 'content-type': 'application/x-www-form-urlencoded' }
        }).then(res => {
           let result = res.order;
           console.log(result);
           if (result.length == 0) {
              this.setData({
                 hasOrder: false
              })
           }
           for (var i = 0; i < result.length; i++) {
              result[i].time = formattime(result[i].time)
              result[i].state = formatState(result[i].state);
              result[i].totalNum = 0;
              result[i].totalPrice = 0;
              for (var j = 0; j < result[i].temp.length; j++) {
                 result[i].totalNum += result[i].temp[j].amount
                 result[i].totalPrice += result[i].temp[j].amount * result[i].temp[j].price
              }
           }

           orderList = orderList.concat(result);
           setTimeout(() => {
              this.setData({
                 orderList: orderList
              })
           }, 1000);
        }).catch(err => {
           console.log("出错了")
           wx.showToast({
              title: '出错了',
           })
           console.log(err)
        });
     }


  },
  //刷新列表
  refreshList() {
     orderList = [];
     page = 0;

     fetch({
        url: "/wxpay/queryShopOrderByPage",
      //   baseUrl: "http://192.168.50.57:9888",
         baseUrl: "https://store.lianlianchains.com",
        data: {
           storeid: wx.getStorageSync('storeid'),
           'page': page
        },
        method: "GET",
        noLoading: true,
        header: { 'content-type': 'application/x-www-form-urlencoded' }
     }).then(res => {
        let result = res.order;
        totalpage = res.totalpage;
        console.log(result);
        if (result.length == 0) {
           this.setData({
              hasOrder: false
           })
        }
        for (var i = 0; i < result.length; i++) {
           result[i].time = formattime(result[i].time)
           result[i].state = formatState(result[i].state);
           result[i].totalNum = 0;
           result[i].totalPrice = 0;
           for (var j = 0; j < result[i].temp.length; j++) {
              result[i].totalNum += result[i].temp[j].amount
              result[i].totalPrice += result[i].temp[j].amount * result[i].temp[j].price
           }
        }
        orderList = [...result]
        setTimeout(() => {
           wx.stopPullDownRefresh()
           this.setData({
              orderList: orderList
           })
           console.log("刷新完成")
        }, 1500);


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
     var that = this;
     fetch({
        url: "/wxpay/queryShopOrderByPage",
      //   baseUrl: "http://192.168.50.57:9888",
         baseUrl: "https://store.lianlianchains.com",
        data: {
           storeid: wx.getStorageSync('storeid'),
           'page': 0
        },
        method: "GET",
        noLoading: true,
        header: { 'content-type': 'application/x-www-form-urlencoded' }
     }).then(res => {
        console.log(res.totalpage)
        let result = res.order;
        totalpage = res.totalpage;
        console.log(result);
        if (result.length == 0) {
           this.setData({
              hasOrder: false
           })
        }
        for (var i = 0; i < result.length; i++) {
           result[i].time = formattime(result[i].time)
           result[i].state = formatState(result[i].state);
           result[i].totalNum = 0;
           result[i].totalPrice = 0;
           for (var j = 0; j < result[i].temp.length; j++) {
              result[i].totalNum += result[i].temp[j].amount
              result[i].totalPrice += result[i].temp[j].amount * result[i].temp[j].price
           }
        }
        orderList = [...result];
        this.setData({
           orderList: orderList
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
     console.log('下拉刷新');
     this.refreshList();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
     this.setData({
        hidden: false
     })
     this.loadMore()
  },
})
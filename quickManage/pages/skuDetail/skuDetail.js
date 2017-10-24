 // pages/skuDetail/skuDetail.js
import fetch from '../../utils/fetch'
import { percentNum, chartTime } from '../../utils/filter'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    month:true,
    week:false,
    day:false
  },
  dayView() {
    this.setData({
      month: false,
      week: false,
      day: true
    })
    var that = this;
    fetch({
      url: "/CVS/sku/day",
      // baseUrl: "http://192.168.50.57:9888",
      baseUrl: "https://store.lianlianchains.com",
      data: {
        code: this.data.code,
        storeid: wx.getStorageSync('storeid')
      },
      method: "GET",
      noLoading: true,
      header: { 'content-type': 'application/x-www-form-urlencoded' }
    }).then(result => {
      console.log(result);
      this.setData({
        count: result.count,
        percent: percentNum(result.count, that.data.total),
        totlefee: result.totlefee.toFixed(2)
      })
    }).catch(err => {
      console.log("出错了")
      console.log(err)
    })
  },
  weekView() {
    var that = this;
    this.setData({
      month: false,
      week: true,
      day: false
    })
    fetch({
      url: "/CVS/sku/week",
      // baseUrl: "http://192.168.50.57:9888",
      baseUrl: "https://store.lianlianchains.com",
      data: {
        code: this.data.code,
        storeid: wx.getStorageSync('storeid')
      },
      method: "GET",
      noLoading: true,
      header: { 'content-type': 'application/x-www-form-urlencoded' }
    }).then(result => {
      console.log(result);
      this.setData({
        count: result.count,
        percent: percentNum(result.count, that.data.total),
        totlefee: result.totlefee.toFixed(2)
      })
    }).catch(err => {
      console.log("出错了")
      console.log(err)
    })
  },
  monthView() {
    var that = this;
    this.setData({
      month: true,
      week: false,
      day: false
    })
    fetch({
      url: "/CVS/sku/month",
      // baseUrl: "http://192.168.50.57:9888",
      baseUrl: "https://store.lianlianchains.com",
      data: {
        code: this.data.code,
        storeid: wx.getStorageSync('storeid')
      },
      method: "GET",
      noLoading: true,
      header: { 'content-type': 'application/x-www-form-urlencoded' }
    }).then(result => {
      console.log(result);
      this.setData({
        count: result.count,
        percent: percentNum(result.count, that.data.total),
        totlefee: result.totlefee.toFixed(2)
      })
    }).catch(err => {
      console.log("出错了")
      console.log(err)
    })
  },
  duringView(total) {
    console.log(total)
    fetch({
      url: "/CVS/sku/month",
      // baseUrl: "http://192.168.50.57:9888",
      baseUrl: "https://store.lianlianchains.com",
      data: {
        code: this.data.code,
        storeid: wx.getStorageSync('storeid')
      },
      method: "GET",
      noLoading: true,
      header: { 'content-type': 'application/x-www-form-urlencoded' }
    }).then(result => {
      console.log(result);
      this.setData({
        count:result.count,
        percent: percentNum(result.count, total),
        totlefee: result.totlefee.toFixed(2)
      })
    }).catch(err => {
      console.log("出错了")
      console.log(err)
    })

    fetch({
      url: "/CVS/sku/num",
      // baseUrl: "http://192.168.50.57:9888",
      baseUrl: "https://store.lianlianchains.com",
      data: {
        code: this.data.code,
        storeid: wx.getStorageSync('storeid')
      },
      method: "GET",
      noLoading: true,
      header: { 'content-type': 'application/x-www-form-urlencoded' }
    }).then(result => {
      console.log(result);
      this.setData({
        cartcount: result.cartcount,
        commentcount: result.commentcount
      })
    }).catch(err => {
      console.log("出错了")
      console.log(err)
    })


  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.setData({
      name: options.name,
      spec: options.spec,
      code: options.code,
      total: options.total
    })
    this.duringView(options.total)
    //创建一个 Canvas 绘图上下文 skuCanvas
    var context = wx.createCanvasContext('skuCanvas');

    fetch({
      url: "/CVS/sku/chart",
      // baseUrl: "http://192.168.50.57:9888",
      baseUrl: "https://store.lianlianchains.com",
      data: {
        code: this.data.code,
        storeid: wx.getStorageSync('storeid')
      },
      method: "GET",
      noLoading: true,
      header: { 'content-type': 'application/x-www-form-urlencoded' }
    }).then(chart => {
      console.log("chart",chart);
      context.setStrokeStyle("#BBBBBB");
      context.setLineWidth(2);
      context.moveTo(50, 0);
      context.lineTo(50, 200);
      context.lineTo(360, 200);

      //x轴的点
      context.moveTo(120.5, 200);
      context.lineTo(120.5, 196);
      context.moveTo(191, 200);
      context.lineTo(191, 196);
      context.moveTo(261.5, 200);
      context.lineTo(261.5, 196);
      context.moveTo(332, 200);
      context.lineTo(332, 196);

      //y轴上的点
      context.moveTo(50, 170);
      context.lineTo(54, 170);
      context.moveTo(50, 140);
      context.lineTo(54, 140);
      context.moveTo(50, 110);
      context.lineTo(54, 110);
      context.moveTo(50, 80);
      context.lineTo(54, 80);
      context.moveTo(50, 50);
      context.lineTo(54, 50);
      context.moveTo(50, 20);
      context.lineTo(54, 20);

      //折线图
      context.setStrokeStyle("#0D8FEF");
      context.setFillStyle("#0D8FEF");
      context.moveTo(120.5, 200 - chart.count1 * 6);
      context.lineTo(120.5, 200 - chart.count1 * 6);
      context.arc(120.5, 200 - chart.count1 * 6, 1, 0, 2 * Math.PI, false)
      context.lineTo(191, 200 - chart.count2 * 6);
      context.arc(191, 200 - chart.count2 * 6, 1, 0, 2 * Math.PI, false)
      context.lineTo(261.5, 200 - chart.count3 * 6);
      context.arc(261.5, 200 - chart.count3 * 6, 1, 0, 2 * Math.PI, false)
      context.lineTo(332, 200 - chart.count4 * 6);
      context.arc(332, 200 - chart.count4 * 6, 1, 0, 2 * Math.PI, false)

      context.stroke()

      //告诉 <canvas/> 组件你要将刚刚的描述绘制上去
      context.draw()
      this.setData({
        time1: chartTime(chart.time1),
        time2: chartTime(chart.time2),
        time3: chartTime(chart.time3),
        time4: chartTime(chart.time4)
      })
    }).catch(err => {
      console.log("出错了")
      console.log(err)
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
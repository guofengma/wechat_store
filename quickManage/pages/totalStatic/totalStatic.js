// pages/statistics/statistics.js
import fetch from '../../utils/fetch'
import { percentNum, chartTime, normalizeStoreList, NowTime } from '../../utils/filter'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    month: false,
    week: false,
    day: true
  },
  auth(){
    wx.navigateTo({
      url: '../auth/auth',
    })
  },
  storeView(e) {
    // console.log(e.currentTarget.dataset.storename)
    wx.setStorageSync('storename', e.currentTarget.dataset.storename)
    wx.setStorageSync('storeid', e.currentTarget.dataset.id)
    wx.switchTab({
      url: '../index/index',
    })
  },
  selecttoday() {
    var FirstTimes = wx.getStorageSync('FirstTime');
    var storeidList = wx.getStorageSync('storeidList');
    this.setData({
      month: false,
      week: false,
      day: true
    })
    // console.log(this.data.monthList)
    // var todaycount = wx.getStorageSync('todaycount');
    // if (todaycount && FirstTimes == NowTime()) {
    //   this.setData({
    //     storeList: wx.getStorageSync('todayList'),
    //     count: todaycount,
    //     totlefee: wx.getStorageSync('todaytotlefee'),
    //   })
    //   return
    // }


    wx.showLoading({
      title: '加载中',
    })
    fetch({
      url: "/CVS/usertotal",
      // baseUrl: "http://192.168.50.157:9888",
      baseUrl: "https://store.lianlianchains.com",
      data: {
        phoneno: wx.getStorageSync('phoneno')
      },
      method: "GET",
      noLoading: true,
      header: { 'content-type': 'application/x-www-form-urlencoded' }
    }).then(result => {
      console.log(result);
      setTimeout(function () {
        wx.hideLoading()
      }, 2000)


      var phoneno = wx.getStorageSync('phoneno', phoneno)
      var pw = wx.getStorageSync('pw', pw)

      fetch({
        url: "/CVS/user/login",
        //  baseUrl: "http://192.168.50.157:9888",
        baseUrl: "https://store.lianlianchains.com",
        data: {
          'phoneno': phoneno,
          'password': pw
        },
        method: "POST",
        noLoading: true,
        header: { 'content-type': 'application/x-www-form-urlencoded' }
      }).then(res => {

        console.log(res);
        // wx.setStorageSync('storeidList', res.storeid)

        var storeList = normalizeStoreList(result, res.storeid);
        console.log("aa", storeList)

        this.setData({
          count: result.count,
          totlefee: result.totlefee.toFixed(2),
          storeList: storeList
        })

      }).catch(err => {

      });

      // wx.setStorageSync('todaycount', result.count)
      // wx.setStorageSync('todaytotlefee', result.totlefee.toFixed(2))
      // wx.setStorageSync('todayList', storeList)
    }).catch(err => {
      console.log("出错了")
      console.log(err)
    });
  },
  selectlastseven() {
    var storeidList = wx.getStorageSync('storeidList');
    var FirstTimes = wx.getStorageSync('FirstTime');
    var WeekDate = wx.getStorageSync('weekDate');
    var MonthDate = wx.getStorageSync('MonthDate');
    this.setData({
      month: false,
      week: true,
      day: false
    })
    var weekcount = wx.getStorageSync('weekcount');

    console.log('week now is ' + NowTime())

    if (weekcount && WeekDate == NowTime()) {

      console.log('缓存')

      this.setData({
        storeList: wx.getStorageSync('weekList'),
        count: weekcount,
        totlefee: wx.getStorageSync('weektotlefee')
      })
      return
    }

    wx.showLoading({
      title: '加载中',
    })
    fetch({
      url: "/CVS/usertotallastseven",
      // baseUrl: "http://192.168.50.157:9888",
      baseUrl: "https://store.lianlianchains.com",
      data: {
        phoneno: wx.getStorageSync('phoneno')
      },
      method: "GET",
      noLoading: true,
      header: { 'content-type': 'application/x-www-form-urlencoded' }
    }).then(result => {
      console.log(result);
      setTimeout(function () {
        wx.hideLoading()
      }, 2000);

      var phoneno = wx.getStorageSync('phoneno', phoneno)
      var pw = wx.getStorageSync('pw', pw)

      fetch({
        url: "/CVS/user/login",
        //  baseUrl: "http://192.168.50.157:9888",
        baseUrl: "https://store.lianlianchains.com",
        data: {
          'phoneno': phoneno,
          'password': pw
        },
        method: "POST",
        noLoading: true,
        header: { 'content-type': 'application/x-www-form-urlencoded' }
      }).then(res => {

        console.log(res);
        // wx.setStorageSync('storeidList', res.storeid)

        wx.setStorageSync('weekDate', NowTime());
        var storeList = normalizeStoreList(result, res.storeid);
        wx.setStorageSync('weekcount', result.count)
        wx.setStorageSync('weektotlefee', result.totlefee.toFixed(2))
        wx.setStorageSync('weekList', storeList)

        this.setData({
          count: result.count,
          totlefee: result.totlefee.toFixed(2),
          storeList: storeList
        })

      }).catch(err => {

      });

    }).catch(err => {
      console.log("出错了")
      console.log(err)
    });
  },
  selectlastmonth() {
    var storeidList = wx.getStorageSync('storeidList');
    var FirstTimes = wx.getStorageSync('FirstTime');
    var WeekDate = wx.getStorageSync('weekDate');
    var MonthDate = wx.getStorageSync('MonthDate');
    this.setData({
      month: true,
      week: false,
      day: false
    })
    var monthcount = wx.getStorageSync('monthcount')

    console.log('month now is ' + NowTime())
    console.log('monthcount is ' + monthcount)

    if (monthcount && MonthDate == NowTime()) {

      console.log('缓存')

      this.setData({
        storeList: wx.getStorageSync('monthList'),
        count: monthcount,
        totlefee: wx.getStorageSync('monthtotlefee'),
      })
      return
    }

    wx.showLoading({
      title: '加载中',
    })
    fetch({
      url: "/CVS/usertotallastmonth",
      // baseUrl: "http://192.168.50.157:9888",
      baseUrl: "https://store.lianlianchains.com",
      data: {
        phoneno: wx.getStorageSync('phoneno')
      },
      method: "GET",
      noLoading: true,
      header: { 'content-type': 'application/x-www-form-urlencoded' }
    }).then(result => {
      console.log(result);
      setTimeout(function () {
        wx.hideLoading()
      }, 2000)

      var phoneno = wx.getStorageSync('phoneno', phoneno)
      var pw = wx.getStorageSync('pw', pw)

      fetch({
        url: "/CVS/user/login",
        //  baseUrl: "http://192.168.50.157:9888",
        baseUrl: "https://store.lianlianchains.com",
        data: {
          'phoneno': phoneno,
          'password': pw
        },
        method: "POST",
        noLoading: true,
        header: { 'content-type': 'application/x-www-form-urlencoded' }
      }).then(res => {

        console.log(res);
        // wx.setStorageSync('storeidList', res.storeid)

        var storeList = normalizeStoreList(result, res.storeid);

        this.setData({
          count: result.count,
          totlefee: result.totlefee.toFixed(2),
          storeList: storeList
        })
        var MonthDate = NowTime();
        wx.setStorageSync('MonthDate', MonthDate)
        wx.setStorageSync('monthcount', result.count)
        wx.setStorageSync('monthtotlefee', result.totlefee.toFixed(2))
        wx.setStorageSync('monthList', storeList)

      }).catch(err => {

      });

    }).catch(err => {
      console.log("出错了")
      console.log(err)
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    var context = wx.createCanvasContext('staticCanvas');

    // var FirstTimes = wx.getStorageSync('FirstTime');
    // if (!FirstTimes || FirstTimes != NowTime()) {
    //   var FirstTime = NowTime();
    //   wx.setStorageSync('FirstTime', FirstTime);
    // }


    this.setData({
      storeidList: wx.getStorageSync('storeidList'),
    })
    fetch({
      url: "/CVS/userchart",
      // baseUrl: "http://192.168.50.157:9888",
      baseUrl: "https://store.lianlianchains.com",
      data: {
        phoneno: wx.getStorageSync('phoneno')
      },
      method: "GET",
      noLoading: true,
      header: { 'content-type': 'application/x-www-form-urlencoded' }
    }).then(chart => {
      console.log("chart", chart);
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

      var basenum = 0.6;
      context.setStrokeStyle("#0D8FEF");
      context.setFillStyle("#0D8FEF");
      context.moveTo(120.5, 200 - chart.count1 * basenum);
      context.lineTo(120.5, 200 - chart.count1 * basenum);
      context.arc(120.5, 200 - chart.count1 * basenum, 1, 0, 2 * Math.PI, false)
      context.lineTo(191, 200 - chart.count2 * basenum);
      context.arc(191, 200 - chart.count2 * basenum, 1, 0, 2 * Math.PI, false)
      context.lineTo(261.5, 200 - chart.count3 * basenum);
      context.arc(261.5, 200 - chart.count3 * basenum, 1, 0, 2 * Math.PI, false)
      context.lineTo(332, 200 - chart.count4 * basenum);
      context.arc(332, 200 - chart.count4 * basenum, 1, 0, 2 * Math.PI, false)

      context.stroke()

      //告诉 <canvas/> 组件你要将刚刚的描述绘制上去
      context.draw()
      this.setData({
        time1: chartTime(chart.time1),
        time2: chartTime(chart.time2),
        time3: chartTime(chart.time3),
        time4: chartTime(chart.time4)
      })
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

    console.log('now is ====' + NowTime())

    var storeidList = wx.getStorageSync('storeidList');
    var FirstTimes = wx.getStorageSync('FirstTime');
    var monthcount = wx.getStorageSync('monthcount')
    if (monthcount && FirstTimes == NowTime()) {

      console.log('缓存')

      this.setData({
        storeList: wx.getStorageSync('monthList'),
        count: monthcount,
        totlefee: wx.getStorageSync('monthtotlefee'),
      })
      return
    }
    var storeidList = wx.getStorageSync('storeidList');
    wx.showLoading({
      title: '加载中',
    })
    // fetch({
    //   url: "/CVS/usertotallastmonth",
    //   // baseUrl: "http://192.168.50.157:9888",
    //   baseUrl: "https://store.lianlianchains.com",
    //   data: {
    //     phoneno: wx.getStorageSync('phoneno')
    //   },
    //   method: "GET",
    //   noLoading: false,
    //   header: { 'content-type': 'application/x-www-form-urlencoded' }
    // }).then(result => {
    //   console.log(result);
    //   setTimeout(function () {
    //     wx.hideLoading()
    //   }, 3000)
    //   var storeList = normalizeStoreList(result, storeidList);
    //   console.log("aa", storeList)

    //   this.setData({
    //     count: result.count,
    //     totlefee: result.totlefee.toFixed(2),
    //     storeList: storeList
    //   })
    //   wx.setStorageSync('monthcount', result.count)
    //   wx.setStorageSync('monthtotlefee', result.totlefee.toFixed(2))
    //   wx.setStorageSync('monthList', storeList)
    //   var FirstTime = NowTime();
    //   wx.setStorageSync('FirstTime', FirstTime);
    //   wx.setStorageSync('MonthDate', FirstTime)
    // }).catch(err => {
    //   console.log("出错了")
    //   console.log(err)
    // });

    fetch({
      url: "/CVS/usertotal",
      // baseUrl: "http://192.168.50.157:9888",
      baseUrl: "https://store.lianlianchains.com",
      data: {
        phoneno: wx.getStorageSync('phoneno')
      },
      method: "GET",
      noLoading: true,
      header: { 'content-type': 'application/x-www-form-urlencoded' }
    }).then(result => {
      console.log(result);
      setTimeout(function () {
        wx.hideLoading()
      }, 2000)
      var storeList = normalizeStoreList(result, storeidList);
      console.log("aa", storeList)

      this.setData({
        count: result.count,
        totlefee: result.totlefee.toFixed(2),
        storeList: storeList
      })
      // wx.setStorageSync('todaycount', result.count)
      // wx.setStorageSync('todaytotlefee', result.totlefee.toFixed(2))
      // wx.setStorageSync('todayList', storeList)
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

  },

  onShareAppMessage(e){
    console.log('share')

    return {
      title: '授权',
      path: '/pages/auth/auth?id=' + e.target.dataset.id,
      imageUrl: '../../image/auth.png'
    }
  }  
})
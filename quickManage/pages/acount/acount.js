import fetch from '../../utils/fetch.js';
import { timeNeeds,nowDate} from '../../utils/filter'
var order = ['red', 'yellow', 'blue', 'green', 'red']
Page({

  /**
   * 页面的初始数据
   */
  data: {
    windowHeight:0,
    toView: 'red',
    scrollTop: 100
  },
  increase() {
    var Year = this.data.Year;
    var Month = this.data.Month;
    
    if (Month < 12) {
      Month++;
    }
    else if (Month == 12) {
      Month = 1;
      Year++
    }

    var time = Year + '' + Month;
    this._acountQuery(time)

    this.setData({
      Year: Year,
      Month: Month
    })
  },
  decrease() {
    var Year = this.data.Year;
    var Month = this.data.Month;
    
    if (Month > 1) {
      Month--;
    }
    else if (Month == 1) {
      Month = 12;
      Year--
    }

    var time = Year + '' + (Month < 10 ? "0" + Month : Month);
    this._acountQuery(time)

    this.setData({
      Year: Year,
      Month: Month
    })
  },
  acountView() {
    wx.navigateTo({
      url: '../acountSend/acountSend',
    })
  },
  _moneyDetail(result) {
    var income = 0;
    var pay = 0;
    var profit = 0;

    for(var i=0;i<result.length;i++) {
      profit += (result[i].amount - 0);
      if (result[i].amount - 0 >= 0) {
        income += (result[i].amount - 0);
      }
      if (result[i].amount - 0 < 0) {
        pay += (result[i].amount - 0);
      }
      
    }
    console.log(profit)
    this.setData({
      profit: profit.toFixed(2),
      income: income.toFixed(2),  
      pay: pay.toFixed(2),    
      acountList: result
    })
  },
  _acountQuery(time) {
    fetch({
      url: "/CVS/account/query",
      //   baseUrl: "http://192.168.50.57:9888",
      baseUrl: "https://store.lianlianchains.com",
      data: {
        storeid: wx.getStorageSync('storeid'),
        time: time
      },
      method: "GET",
      noLoading: true,
      header: { 'content-type': 'application/x-www-form-urlencoded' }
    }).then(result => {
      this._moneyDetail(result);
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  upper: function (e) {
    console.log(e)
  },
  lower: function (e) {
    console.log("到底了")
  },
  scroll: function (e) {
    console.log(e)
  },
  tap: function (e) {
    for (var i = 0; i < order.length; ++i) {
      if (order[i] === this.data.toView) {
        this.setData({
          toView: order[i + 1]
        })
        break
      }
    }
  },
  tapMove: function (e) {
    this.setData({
      scrollTop: this.data.scrollTop + 10
    })
  },
  onLoad: function (options) {
    var _this = this;
    var sys = wx.getSystemInfo({
      success: (res) => {
        console.log(res)
        this.setData({
          windowHeight: res.windowHeight
        })
      }
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
    var Year = new Date().getFullYear();
    var Month = new Date().getMonth() + 1;
    this.setData({
      Year: Year,
      Month: Month
    })
    console.log(timeNeeds());
    // this.setData({
    //   nowDate: nowDate(Year, Month)
    // })
    fetch({
      url: "/CVS/account/query",
      //   baseUrl: "http://192.168.50.57:9888",
      baseUrl: "https://store.lianlianchains.com",
      data: {
        storeid: wx.getStorageSync('storeid'),
        time: timeNeeds()
      },
      method: "GET",
      noLoading: true,
      header: { 'content-type': 'application/x-www-form-urlencoded' }
    }).then(result => {
      this._moneyDetail(result);
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})
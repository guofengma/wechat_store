// pages/inventory/inventory.js
import fetch from '../../utils/fetch';
import { percentNum} from '../../utils/filter'

let inventory = [];
let selects = [];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inventoryList: [],
    selects: []
  },
  reportView() {
    wx.navigateTo({
      url: '../report/report',
    })
  },
  checkboxChange(e) {
    let index = e.target.dataset.idx;
    this.data.selects[index].onoff = !this.data.selects[index].onoff;
    this.setData({
      selects: this.data.selects
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = 0;
    console.log('id',options.id)
    id = options.id;
    this.setData({
      id: options.id
    })
    fetch({
      url: "/CVS/report/query",
      //   baseUrl: "http://192.168.50.57:9888",
      baseUrl: "https://store.lianlianchains.com",
      data: {
        id: id
      },
      method: "GET",
      noLoading: true,
      header: { 'content-type': 'application/x-www-form-urlencoded' }
    }).then(result => {
      console.log("aa", JSON.parse(result.report))
      var results = JSON.parse(result.report);

      var reportList = results[2].reportList;
      var totalNumber = results[0].totalNumber;
      var totalMoney = results[1].totalMoney;
      console.log(reportList)
      var losenumPercent = 0;
      var losemoneyPercent = 0;
      var losenum = 0;
      var totalnum = 0;
      var losemoney = 0;
      var totalmoney = 0;
      console.log(reportList)
      for (var i = 0; i < reportList.length; i++) {
        losenum += (reportList[i].amount - reportList[i].value)
        // totalnum += reportList[i].total
        losemoney += (reportList[i].amount - reportList[i].value) * reportList[i].price
        // totalmoney += reportList[i].total * reportList[i].price
      }
      console.log(losenum)
      console.log(totalnum)
      console.log(losemoney)
      console.log(totalmoney)
      losemoney = losemoney.toFixed(2) - 0;
      losenumPercent = percentNum(losenum, totalNumber);
      losemoneyPercent = percentNum(losemoney, totalMoney)
      this.setData({
        losenum: losenum,
        losenumPercent: losenumPercent,
        losemoney: losemoney,
        losemoneyPercent: losemoneyPercent,
        reportList: reportList
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
    return {
      title: '盘点报告',
      path: '/pages/report/report?id='+this.data.id,
      success: function (res) {

        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})
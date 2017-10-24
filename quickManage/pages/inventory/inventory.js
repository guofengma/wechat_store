// pages/inventory/inventory.js
import fetch from '../../utils/fetch';
import { normalLizeInventory} from '../../utils/inventory'

let inventory = [];
let selects = [];
let reportList = [];

//定义索引字母数组
var indexArr = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
var y = 0;
//获取touchstart字母数组角标
function getArrIndex(english) {
  // console.log(Page)
  for (var x = 0; x < indexArr.length; x++) {
    if (english == indexArr[x]) {
      return x;
    }
  }
}
//num 移动了多少位 index 当前字母,返回当前触摸位置节点的字母
function getArrEnglish(num, index) {
  var english = indexArr[index + num];
  if (!(1 > num + index > 26)) {
    return english;
  } else {
    return AAA;
  }
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inventoryList: [],
    selects: [],
    rightShow: false,
    dropShow: false,
    indexShow: false,
    toView: "e",
    scrollTop: 1000,
    indexId: "",
    indexy: "",
    indexEnglish: "",
    arrId: indexArr,
    userInfo: "这是一条数据"
  },
  changevalue(e) {
    let index = e.target.dataset.idx;
    let value = Number(e.detail.value);
    for (var i = 0; i < reportList.length; i++) {
      if (reportList[i].id === index) {
        reportList[i].value = value
      }
    }
    console.log(reportList)
  },
  reportView() {
    var that = this;
    var reportId = new Date().getTime();
    fetch({
      url: "/CVS/report/save",
      //   baseUrl: "http://192.168.50.57:9888",
      baseUrl: "https://store.lianlianchains.com",
      data: {
        // id: wx.getStorageSync('storeid'),
        id: reportId,
        report: JSON.stringify([
          { 'totalNumber': wx.getStorageSync('totalNumber')},
          {
            'totalMoney': wx.getStorageSync('totalMoney')},
          {
            reportList: reportList
          }
        ])
      },
      method: "GET",
      noLoading: true,
      header: { 'content-type': 'application/x-www-form-urlencoded' }
    }).then(result => {
      console.log(result)
      wx.navigateTo({
        url: '../report/report?id=' + reportId,
      })
    })
    // return
    // wx.setStorageSync('reportList', reportList);
    
  },
  checkboxChange(e) {
    let index = e.target.dataset.idx;
    console.log(index)
    let name = e.target.dataset.name;
    let amount = e.target.dataset.value;
    let value = e.target.dataset.value;
    let total = e.target.dataset.total;
    let price = e.target.dataset.price;
    this.data.selects[index].onoff = !this.data.selects[index].onoff;
    if (!!this.data.selects[index].onoff) {
      var opt = {};
      opt.id = index;
      opt.name = name;
      opt.amount = amount;
      opt.value = amount;
      opt.total = total;
      opt.price = price;
      reportList.push(opt)
    }else{
      for (var i = 0; i < reportList.length;i++) {
        if (reportList[i].id === index) {
          reportList.splice(i, 1)
        }
      }  
    }
    console.log(reportList)
    this.setData({
      selects: this.data.selects
    })
  },
  touchstart: function (e) {
    console.log(e)
    this.setData({
      indexId: e.target.id,
      toView: e.target.id.toLowerCase(),
      indexy: e.touches[0].pageY,
      indexShow: true,
      indexEnglish: e.target.id
    })
  },
  touchmove: function (e) {
    y = getArrIndex(e.target.id);
    var indexY = e.touches[0].pageY;
    if (getArrEnglish(Math.round((indexY - this.data.indexy) / 15), y)) {
      this.setData({
        toView: getArrEnglish(Math.round((indexY - this.data.indexy) / 15), y).toLowerCase(),
        indexEnglish: getArrEnglish(Math.round((indexY - this.data.indexy) / 15), y)
      })
    }
  },
  touchend: function (e) {
    this.setData({
      indexShow: false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          windowHeight: res.windowHeight,
          indexTop: res.windowHeight / 2 - 200
        });
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
    reportList = [];

    fetch({
      url: "/CVS/good/queryallsort",
      //   baseUrl: "http://192.168.50.57:9888",
      baseUrl: "https://store.lianlianchains.com",
      data: {
        storeid: wx.getStorageSync('storeid')
      },
      method: "GET",
      noLoading: true,
      header: { 'content-type': 'application/x-www-form-urlencoded' }
    }).then(result => {
      var totalNumber = 0;
      var totalMoney = 0;
      var newArr = normalLizeInventory(result);
      // result = addSelected(result)
      console.log('newArr', newArr)
      for (var i = 0; i < newArr.length; i++) {
        totalNumber += newArr[i].total
        totalMoney += newArr[i].total * newArr[i].price
        selects.push({ onoff: false });
      }
      console.log(totalNumber);
      console.log(totalMoney)

      this.setData({
        inventoryList: newArr,
        selects: selects
      })
      wx.setStorageSync('totalNumber', totalNumber)
      wx.setStorageSync('totalMoney', totalMoney)
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
  
  }
})
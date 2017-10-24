// pages/sku/sku.js
import fetch from '../../utils/fetch'

var totalAmount = 0;
var totalPrice = 0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navActive: true
  },
  checkboxChange(e) {
    var index = e.target.dataset.idx;
    var code = e.target.dataset.code;
    console.log(this.data.shelveList)
    if (this.data.shelveList[index].checked === false) {
      this.data.shelveList[index].checked = true
      this.setData({
        shelveList: this.data.shelveList
      })
      this._changeStatus(code, "1")
    }
    else if (this.data.shelveList[index].checked === true) {
      this.data.shelveList[index].checked = false
      this.setData({
        shelveList: this.data.shelveList
      })
      this._changeStatus(code, "0")
    }

    console.log(index)
  },
  skuDetail(e) {
    var name = e.target.dataset.name;
    var spec = e.target.dataset.spec;
    var code = e.target.dataset.code;
    var total = e.target.dataset.total;
    wx.navigateTo({
      url: '../skuDetail/skuDetail?name=' + name + '&spec=' + spec + '&code=' + code + '&total=' + total,
    })
  },
  shelveTemp() {
    if (this.data.navActive === true) {
      return
    }
    this.setData({
      navActive: true,
    })
  },
  shelveTemp() {
    if (this.data.navActive === true) {
      return
    }
    this._shuData("shelve");
    this.setData({
      navActive: true
    })
  },
  offShelveTemp() {
    if (this.data.navActive === false) {
      return
    }
    this._shuData("offShelve");
    this.setData({
      navActive: false
    })
  },
  _changeStatus(code, tag) {
    fetch({
      url: "/CVS/sku/update",
      // baseUrl: "http://192.168.50.57:9888",
      baseUrl: "https://store.lianlianchains.com",
      data: {
        storeid:wx.getStorageSync('storeid'),
        code: code,
        tag: tag
      },
      method: "GET",
      noLoading: true,
      header: { 'content-type': 'application/x-www-form-urlencoded' }
    }).then(result => {
      console.log(result);

    }).catch(err => {
      console.log("出错了")
      console.log(err)
    })

  },
  _shuData(types) {
    totalAmount = 0;
    totalPrice = 0;
    if (types === "shelve") {
      fetch({
        url: "/CVS/sku/queryall",
        // baseUrl: "http://192.168.50.57:9888",
        baseUrl: "https://store.lianlianchains.com",
        data: {
          storeid: wx.getStorageSync('storeid')
        },
        method: "GET",
        noLoading: true,
        header: { 'content-type': 'application/x-www-form-urlencoded' }
      }).then(result => {
        console.log(result);
        for (var i = 0; i < result.length; i++) {
          totalAmount += result[i].skuamount;
          result[i] = Object.assign({}, result[i], { cost: (result[i].skuamount * result[i].price).toFixed(2),checked:false })
          totalPrice += (result[i].cost * 1);
        }
        this.setData({
          totalAmount: totalAmount,
          totalPrice: totalPrice.toFixed(2),
          shelveList: result
        })
      }).catch(err => {
        console.log("出错了")
        console.log(err)
      });
    }
    else if (types === "offShelve") {
      fetch({
        url: "/CVS/sku/queryalldown",
        // baseUrl: "http://192.168.50.57:9888",
        baseUrl: "https://store.lianlianchains.com",
        data: {
          storeid: wx.getStorageSync('storeid')
        },
        method: "GET",
        noLoading: true,
        header: { 'content-type': 'application/x-www-form-urlencoded' }
      }).then(result => {
        console.log(result);
        for (var i = 0; i < result.length; i++) {
          totalAmount += result[i].skuamount;
          result[i] = Object.assign({}, result[i], { cost: (result[i].skuamount * result[i].price).toFixed(2), checked: false })
          totalPrice += (result[i].cost * 1);
        }
        this.setData({
          totalAmount: totalAmount,
          totalPrice: totalPrice.toFixed(2),
          shelveList: result
        })
      }).catch(err => {
        console.log("出错了")
        console.log(err)
      });
    }
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
    totalAmount = 0;
    totalPrice = 0;
    fetch({
      url: "/CVS/sku/queryall",
      // baseUrl: "http://192.168.50.57:9888",
      baseUrl: "https://store.lianlianchains.com",
      data: {
        storeid: wx.getStorageSync('storeid')
      },
      method: "GET",
      noLoading: true,
      header: { 'content-type': 'application/x-www-form-urlencoded' }
    }).then(result => {
      console.log(result);
      for (var i = 0; i < result.length; i++) {
        totalAmount += result[i].skuamount;
        result[i] = Object.assign({}, result[i], { cost: (result[i].skuamount * result[i].price).toFixed(2), checked: false })
        totalPrice += (result[i].cost * 1);
      }
      this.setData({
        totalAmount: totalAmount,
        totalPrice: totalPrice.toFixed(2),
        shelveList: result
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  }
})
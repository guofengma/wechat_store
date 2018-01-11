// pages/sendorder/sendorder.js
import { get3MonthBefor, getNowDate } from '../../utils/date.js';
import fetch from '../../utils/fetch.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: {},
    index: 0,
    array: ['安装部署货架', '商品上下架'],
    phone: '',
    date: '',
    startDate: get3MonthBefor()
  },
  cancelOrder() {
    fetch({
      url: "/CVS/updatestorestate",
      baseUrl: "http://192.168.50.239:9888",
      // baseUrl: "https://store.lianlianchains.com",
      data: {
        StoreId: this.data.info.storeId,
        servicestate: 1
      },
      method: "POST",
      noLoading: true,
      header: { 'content-type': 'application/x-www-form-urlencoded' }
    }).then(res => {

      wx.redirectTo({
        url: '../grab/grab',
      })

    }).catch(err => {

    });
  },
  getPhoneNumber: function (e) {
    console.log(e.detail.errMsg)
    console.log(e.detail.iv)
    console.log(e.detail.encryptedData)

    var that = this
    if (e.detail.errMsg != 'getPhoneNumber:fail user deny') {

      wx.request({
        url: 'http://192.168.50.239:9888/wx/decodePhone',
        data: {
          openid: wx.getStorageSync('user').openid,
          session_key: wx.getStorageSync('user').session_key,
          encryptedData: e.detail.encryptedData,
          iv: e.detail.iv
        },
        method: 'GET',
        success: function (secr) {
          console.log(secr);

          that.setData({
            phone: secr.data.ret.phone
          })

        }
      });

    }
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  submit(e) {
    console.log(e)
    var servicestate = e.detail.target.dataset.orderstate;

    fetch({
      url: "/CVS/issueOrder",
      baseUrl: "http://192.168.50.239:9888",
      // baseUrl: "https://store.lianlianchains.com",
      data: {
        StoreId: this.data.info.id,
        address: this.data.info.address,
        StoreName: this.data.info.name,
        lng: this.data.info.lng,
        lat: this.data.info.lat,
        name: e.detail.value.service,
        price: e.detail.value.price,
        phone: e.detail.value.phone,
        time: (e.detail.value.date).replace(new RegExp("-", "gm"), ""),
        servicestate: servicestate
      },
      method: "POST",
      noLoading: true,
      header: { 'content-type': 'application/x-www-form-urlencoded' }
    }).then(res => {

      wx.navigateBack();

    }).catch(err => {

    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (!!options.storeid) {
      this.setData({
        storeid: options.storeid
      });
      fetch({
        url: "/CVS/querybyid",
        baseUrl: "http://192.168.50.239:9888",
        // baseUrl: "https://store.lianlianchains.com",
        data: {
          StoreId: options.storeid
        },
        method: "POST",
        noLoading: true,
        header: { 'content-type': 'application/x-www-form-urlencoded' }
      }).then(res => {
        console.log(res);
        this.setData({
          info: res
        })
        
      }).catch(err => {

      });
    }
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
    var date = getNowDate();

    this.setData({
      date: date
    })

    console.log(get3MonthBefor())
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
// pages/sendorder/sendorder.js
import {
  get3MonthBefor,
  getNowDate
} from '../../utils/date.js';
import fetch from '../../utils/fetch.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: 0,
    array: ['安装部署货架', '商品上下架及盘点'],
    phone: '',
    date: '',
    startDate: get3MonthBefor()
  },
  getPhoneNumber: function(e) {
    console.log(e.detail.errMsg)
    console.log(e.detail.iv)
    console.log(e.detail.encryptedData)

    var that = this
    if (e.detail.errMsg != 'getPhoneNumber:fail user deny') {

      wx.request({
        url: 'https://store.lianlianchains.com/wx/decodePhone',
        data: {
          openid: wx.getStorageSync('user').openid,
          session_key: wx.getStorageSync('user').session_key,
          encryptedData: e.detail.encryptedData,
          iv: e.detail.iv
        },
        method: 'GET',
        success: function(secr) {
          console.log(secr);

          that.setData({
            phone: secr.data.ret.phone
          })

        }
      });

    }
  },
  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  bindDateChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  submit(e) {

    var opendId = wx.getStorageSync('user').openid;
    var payMoney = this.data.info.price - 0;

    this.prepay(opendId, payMoney)

  },
  prepay(openId, payMoney) {
    console.log("支付钱数：" + payMoney);
    var that = this;
    fetch({
      url: "/wxpay/prepayshop",
      // baseUrl: "http://192.168.50.239:9888",
      baseUrl: "https://store.lianlianchains.com",
      data: {
        'openid': openId,
        'fee': payMoney,
        'description': "订单确认",
        'usedScore': 0,
        'mch_id': this.data.info.storeId,
        'storeid': this.data.info.storeId,
        'charges': this.data.info.openid
      },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      }
    }).then(result => {
      console.log(result);
      if (result.returncode) {
        wx.showToast({
          title: result.returnmsg,
        })
        return
      }
      var prepay_id = result.prepay_id;
      wx.setStorageSync('orderNo', result.orderNo)
      console.log("统一下单返回 prepay_id:" + prepay_id);
      that.sign(prepay_id, payMoney);
    }).catch(err => {

    });
  },
  //签名
  sign(prepay_id, payMoney) {
    console.log("支付钱数：" + payMoney);
    var that = this;
    fetch({
      url: "/wxpay/sign",
      // baseUrl: "http://192.168.50.57:9888",
      baseUrl: "https://store.lianlianchains.com",
      data: {
        'repay_id': prepay_id,
        'storeid': this.data.info.storeId
      },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      }
    }).then(result => {
      console.log(result)
      that.requestPayment(result, payMoney);
    }).catch(err => {

    });
  },
  //申请支付
  requestPayment: function(obj, payMoney) {
    let self = this;
    console.log("支付钱数：" + payMoney);
    wx.requestPayment({
      'timeStamp': obj.timeStamp,
      'nonceStr': obj.nonceStr,
      'package': obj.package,
      'signType': obj.signType,
      'paySign': obj.paySign,
      'success': (res) => {

        fetch({
          url: "/CVS/updatestorestate",
          // baseUrl: "http://192.168.50.239:9888",
          baseUrl: "https://store.lianlianchains.com",
          data: {
            StoreId: this.data.info.storeId,
            servicestate: 4
          },
          method: "POST",
          noLoading: true,
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          }
        }).then(res => {
          wx.navigateBackMiniProgram({
            extraData: {},
            success(res) {
              // 返回成功
            }
          })
        }).catch(err => {

        });
      },
      'fail': function(res) {
        console.log('输出失败信息：')
        console.log(res);
        console.log("支付失败")
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    let info = {};
    if (!!options.item && !!options.orderstate) {
      info = JSON.parse(options.item);
      this.setData({
        orderState: options.orderstate,
        StoreId: info.id
      })
      fetch({
        url: "/CVS/querybyid",
        // baseUrl: "http://192.168.50.239:9888",
        baseUrl: "https://store.lianlianchains.com",
        data: {
          StoreId: info.id
        },
        method: "POST",
        noLoading: true,
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        }
      }).then(res => {
        console.log(res);
        res.time = res.time.substring(0, 4) + "-" + res.time.substring(4, 6) + "-" + res.time.substring(6);
        var url = "https://store.lianlianchains.com/images/";
        res.img1 = url + res.img1;
        res.img2 = url + res.img2;
        res.img3 = url + res.img3;
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
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var date = getNowDate();

    this.setData({
      date: date
    })

    console.log(get3MonthBefor())
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})
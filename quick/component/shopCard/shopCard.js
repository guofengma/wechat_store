import fetch from '../../utils/fetch.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [
      {
        cardUrl: "../../image/10.png",
        price: 10,
        active: true
      },
      {
        cardUrl: "../../image/200.png",
        price: 200,
        active: false
      },
      {
        cardUrl: "../../image/300.png",
        price: 300,
        active: false
      }
    ],
    img:[
      {
        increaseBlue: "../../image/increaseBlue.png",
        reduceBlue: "../../image/reduceBlue.png"
      },
      {
        increaseGray: "../../image/increaseGray.png",
        reduceGray: "../../image/reduceGray.png"
      }
    ],
    amount: 1,
    idx: 0,
    price: 10,
    total: 0
  },
  increase() {
    this.data.amount++;
    this.setData({
      amount: this.data.amount
    })
  },
  reduce() {
    if (this.data.amount <= 1) {
      this.data.amount = 1
    }else{
      this.data.amount--;
    }
    
    this.setData({
      amount: this.data.amount
    })
  },
  chooseCard(e) {
    let idx = e.currentTarget.dataset.index;
    this.data.list.forEach((item, index) => {
      if(index == idx) {
        item.active = true
      }else{
        item.active = false
      }
    });

    this.setData({
      list: this.data.list,
      idx: idx,
      amount: 1,
      price: this.data.list[idx].price
    })
  },
  //下单
  buy(e) {
    let payMoney = e.currentTarget.dataset.price;
    this.prepay(wx.getStorageSync('user').openid, payMoney)
  },
  prepay(openId, payMoney) {
    console.log("支付钱数：" + payMoney);
    var that = this;
    fetch({
      url: "/wxpay/prepaycard",
      // baseUrl: "http://192.168.50.239:9888",
      baseUrl: "https://store.lianlianchains.com",
      data: {
        'openid': openId,
        'fee': payMoney,
        'description': "购买购物卡",
        'mch_id': wx.getStorageSync('storeId'),
        'storeid': wx.getStorageSync('storeId'),
      },
      method: "POST",
      header: { 'content-type': 'application/x-www-form-urlencoded' }
    }).then(result => {
      console.log(result);
      if (result.returncode) {
        wx.showModal({
          content: result.returnmsg,
        })
        // wx.showToast({
        //   title: result.returnmsg,
        // })
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
      //   baseUrl: "http://192.168.50.57:9888",
      baseUrl: "https://store.lianlianchains.com",
      data: {
        'repay_id': prepay_id,
        'storeid': wx.getStorageSync('storeId')
      },
      method: "POST",
      header: { 'content-type': 'application/x-www-form-urlencoded' }
    }).then(result => {
      console.log(result)
      that.requestPayment(result, payMoney);
    }).catch(err => {

    });
  },
  //申请支付
  requestPayment: function (obj, payMoney) {
    let self = this;
    console.log("支付钱数：" + payMoney);
    wx.requestPayment({
      'timeStamp': obj.timeStamp,
      'nonceStr': obj.nonceStr,
      'package': obj.package,
      'signType': obj.signType,
      'paySign': obj.paySign,
      'success': function (res) {
        wx.navigateBack();
      },
      'fail': function (res) {
        console.log('输出失败信息：')
        console.log(res);
        console.log("支付失败")
      }
    })
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
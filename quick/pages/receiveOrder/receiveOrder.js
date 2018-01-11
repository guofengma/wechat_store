// pages/sendorder/sendorder.js
import { get3MonthBefor, getNowDate } from '../../utils/date.js';
import fetch from '../../utils/fetch.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: 0,
    array: ['安装部署货架', '商品上下架'],
    phone: '',
    date: '',
    startDate: get3MonthBefor(),
    maskShow: false,
    hasRegister: false
  },
  receiveOrder() {
    fetch({
      url: "/CVS/getorder",
      baseUrl: "http://192.168.50.239:9888",
      // baseUrl: "https://store.lianlianchains.com",
      data: {
        StoreId: "000001" || this.data.info[0].id,
        openid: wx.getStorageSync('user').openid
      },
      method: "POST",
      noLoading: true,
      header: { 'content-type': 'application/x-www-form-urlencoded' }
    }).then(res => {

      if(res.ec === "000000") {
        wx.navigateTo({
          url: '../shelveOrderList/shelveOrderList',
        });
      }

    }).catch(err => {

    });
  },
  pwdInput(e) {
    console.log(e)
    this.setData({
      pwd: e.detail.value
    })
  },
  hideMask() {
    this.setData({
      maskShow: false
    });
  },
  register(add) {
    console.log(this.data.pwd)
    var pwd = "";
    if(add == 'add') {
      pwd = "";
    }else{
      pwd = this.data.pwd
    }
    fetch({
      url: "/CVS/shopopen",
      baseUrl: "http://192.168.50.239:9888",
      // baseUrl: "https://store.lianlianchains.com",
      data: {
        storeid: "000001",
        phoneno: this.data.phone,
        password: pwd
      },
      method: "POST",
      noLoading: true,
      header: { 'content-type': 'application/x-www-form-urlencoded' }
    }).then(res => {
      console.log(res);
      this.receiveOrder();
    }).catch(err => {

    });
    this.setData({
      hasRegister: true
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
    if(!this.data.phone) {
      wx.showToast({
        title: '手机号不能为空',
      });
      return;
    }

    if (this.data.phone.length != 11) {
      wx.showToast({
        title: '请输入正确的手机号',
      });
      return;
    }

    this._checkFirst();
  },

  
  //检查是否为第一次接单
  _checkFirst() {
    fetch({
      url: "/CVS/shopfirst",
      baseUrl: "http://192.168.50.239:9888",
      // baseUrl: "https://store.lianlianchains.com",
      data: {
        phoneno: this.data.phone
      },
      method: "POST",
      noLoading: true,
      header: { 'content-type': 'application/x-www-form-urlencoded' }
    }).then(res => {
      if(res.data == 0) {
        this.setData({
          hasRegister: false,
          maskShow: true
        });
      }else if(res.data == 1){
        this.setData({
          hasRegister: true,
          maskShow: false
        });
        this.register("add")
      }
    }).catch(err => {

    });
  },
  _normalDate(time) {
    return time.substring(0, 4) + "-" + time.substring(4, 6) + "-" + time.substring(6);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    let info = [];
    if (!!options.item) {
      info = JSON.parse(options.item);
      
    }

    fetch({
      url: "/CVS/querybyid",
      baseUrl: "http://192.168.50.239:9888",
      // baseUrl: "https://store.lianlianchains.com",
      data: {
        StoreId: info[0].id
      },
      noLoading: true,
      method: "GET",
      header: { 'content-type': 'application/x-www-form-urlencoded' }
      //  header: { 'content-type': 'application/json' }
    }).then(res => {

      console.log(res);
      res.time = this._normalDate(res.time);

      this.setData({
        info: info,
        formData: res
      })

    })
  }
})
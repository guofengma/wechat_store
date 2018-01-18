// pages/sendorder/sendorder.js
import { get3MonthBefor, getNowDate} from '../../utils/date.js';
import fetch  from '../../utils/fetch.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index:0,
    array: ['安装部署货架', '商品上下架及盘点'],
    phone:'',
    date: '',
    price: "",
    startDate: get3MonthBefor()
  },
  priceInput(e) {
    this.setData({
      price: e.detail.value
    })
  },
  input(e) {
    this.setData({
      phone:e.detail.value
    })
  },
  getPhoneNumber: function (e) {
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
  resubmit(e, servicestate) {
    fetch({
      url: "/CVS/editOrder",
      //  baseUrl: "http://192.168.50.239:9888",
      baseUrl: "https://store.lianlianchains.com",
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

      fetch({
        url: "/CVS/updatestorestate",
        // baseUrl: "http://192.168.50.239:9888",
        baseUrl: "https://store.lianlianchains.com",
        data: {
          StoreId: this.data.info.id,
          servicestate: 1
        },
        method: "POST",
        noLoading: true,
        header: { 'content-type': 'application/x-www-form-urlencoded' }
      }).then(res => {

        wx.navigateBack();

      }).catch(err => {

      });



    }).catch(err => {

    });
  },
  submit(e) {
    console.log(e)
    var servicestate = e.detail.target.dataset.orderstate;
    var types = e.detail.target.dataset.types;
    console.log(e.detail.target.dataset.types)


    if (types == 'resend') {
      this.resubmit(e, servicestate);

      return;
    }

    if (types == 'cancel') {
      fetch({
        url: "/CVS/delete",
          // baseUrl: "http://192.168.50.239:9888",
          baseUrl: "https://store.lianlianchains.com",
          data: {
            StoreId: this.data.info.id
          },
          method: "POST",
          noLoading: true,
          header: { 'content-type': 'application/x-www-form-urlencoded' }
        }).then(res => {

          wx.navigateBack();

        }).catch(err => {

        });
      // fetch({
      //   url: "/CVS/updatestorestate",
      //   // baseUrl: "http://192.168.50.239:9888",
      //   baseUrl: "https://store.lianlianchains.com",
      //   data: {
      //     StoreId: this.data.info.id,
      //     servicestate: 0
      //   },
      //   method: "POST",
      //   noLoading: true,
      //   header: { 'content-type': 'application/x-www-form-urlencoded' }
      // }).then(res => {

      //   wx.navigateBack();

      // }).catch(err => {

      // });

      return;
    }

    if (types == 'send') {
      fetch({
        url: "/CVS/issueOrder",
        //  baseUrl: "http://192.168.50.239:9888",
        baseUrl: "https://store.lianlianchains.com",
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

        fetch({
          url: "/CVS/updatestorestate",
          // baseUrl: "http://192.168.50.239:9888",
          baseUrl: "https://store.lianlianchains.com",
          data: {
            StoreId: this.data.info.id,
            servicestate: 1
          },
          method: "POST",
          noLoading: true,
          header: { 'content-type': 'application/x-www-form-urlencoded' }
        }).then(res => {

          wx.navigateBack();

        }).catch(err => {

        });



      }).catch(err => {

      });
    }

    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let info = {};
    if (!!options.item && !!options.orderstate) {
      info = JSON.parse(options.item);
      this.setData({
        info: info,
        orderState: options.orderstate
      })
    }

    fetch({
      url: "/CVS/querybyid",
      // baseUrl: "http://192.168.50.239:9888",
      baseUrl: "https://store.lianlianchains.com",
      data: {
        StoreId: info.id
      },
      method: "POST",
      noLoading: true,
      header: { 'content-type': 'application/x-www-form-urlencoded' }
    }).then(res => {
      console.log(res);
      this.setData({
        price: res.price,
        phone: res.phone,
        date: res.time.substring(0, 4) + "-" + res.time.substring(4, 6) + "-" + res.time.substring(6),
        index: this.data.array.indexOf(res.name)
      })

    }).catch(err => {

    });
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
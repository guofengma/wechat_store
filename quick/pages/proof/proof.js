// pages/sendorder/sendorder.js
import { get3MonthBefor, getNowDate } from '../../utils/date.js';
import { uploadImage } from '../../utils/uploadImg.js'
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
    startDate: get3MonthBefor(),
    previewImg1: '../../image/upload.png',
    previewImg2: '../../image/upload.png',
    previewImg3: '../../image/upload.png',
  },
  //上传图片
  imageView(e) {

    let idx = e.target.dataset.idx;
    uploadImage().then(res => {

      let path = res.tempFilePaths[0];
      if (idx === "previewImg1") {
        this.setData({
          previewImg1: path
        })
        wx.uploadFile({
          // url: 'http://192.168.50.115:8123/upload', //仅为示例，非真实的接口地址
          url: 'https://store.lianlianchains.com/CVS/upload', //仅为示例，非真实的接口地址
          filePath: path,
          name: 'test',
          formData: {
            'openid': wx.getStorageSync('user').openid
          },
          success: (res) => {
            var data = res.data
            //do something

            this.setData({
              image1: data
            })
          }
        })
      } else if (idx === "previewImg2") {
        this.setData({
          previewImg2: path
        })
        wx.uploadFile({
          // url: 'http://192.168.50.115:8123/upload', //仅为示例，非真实的接口地址
          url: 'https://store.lianlianchains.com/CVS/upload', //仅为示例，非真实的接口地址
          filePath: path,
          name: 'test',
          formData: {
            'openid': wx.getStorageSync('user').openid
          },
          success: (res) => {
            var data = res.data
            //do something

            this.setData({
              image2: data
            })
          }
        })
      } else if (idx === "previewImg3") {
        this.setData({
          previewImg3: path
        })
        wx.uploadFile({
          // url: 'http://192.168.50.115:8123/upload', //仅为示例，非真实的接口地址
          url: 'https://store.lianlianchains.com/CVS/upload', //仅为示例，非真实的接口地址
          filePath: path,
          name: 'test',
          formData: {
            'openid': wx.getStorageSync('user').openid
          },
          success: (res) => {
            var data = res.data
            //do something

            this.setData({
              image3: data
            })
          }
        })
      }

    })
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
  updateState() {
    fetch({
      url: "/CVS/updatestorestate",
      // baseUrl: "http://192.168.50.239:9888",
      baseUrl: "https://store.lianlianchains.com",
      data: {
        StoreId: this.data.info.storeId,
        servicestate: 3
      },
      method: "POST",
      noLoading: true,
      header: { 'content-type': 'application/x-www-form-urlencoded' }
    }).then(res => {

      wx.redirectTo({
        url: '../shelveOrderList/shelveOrderList',
      });

    }).catch(err => {

    });
  },
  submit(e) {
    fetch({
      url: "/CVS/finish",
      // baseUrl: "http://192.168.50.239:9888",
      baseUrl: "https://store.lianlianchains.com",
      data: {
        StoreId: this.data.info.storeId,
        phone: this.data.info.phone,
        img1: this.data.image1,
        img2: this.data.image2,
        img3: this.data.image3
      },
      method: "POST",
      noLoading: true,
      header: { 'content-type': 'application/x-www-form-urlencoded' }
    }).then(res => {

      this.updateState();

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
        // baseUrl: "http://192.168.50.239:9888",
        baseUrl: "https://store.lianlianchains.com",
        data: {
          StoreId: options.storeid
        },
        method: "POST",
        noLoading: true,
        header: { 'content-type': 'application/x-www-form-urlencoded' }
      }).then(res => {
        console.log(res);
        res.time = res.time.substring(0, 4) + "-" + res.time.substring(4, 6) + "-" + res.time.substring(6);
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
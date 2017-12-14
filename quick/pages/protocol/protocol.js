// pages/protocol/protocol.js
import fetch from '../../utils/fetch';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: wx.getStorageSync("user").openid,
    fieldpercent: 2,
    dealpercent: 92,
    supplypercent: 3,
  },
  setfield(e) {
    
    var sum = parseInt(e.detail.value == '' ? 0 : e.detail.value) + parseInt(this.data.dealpercent) + parseInt(this.data.supplypercent)
    
    if (sum > 97) {
      wx.showToast({
        title: '比例超限',
      })

      this.setData({
        fieldpercent: 2
      })

      return
    }
    this.setData({
      fieldpercent: e.detail.value == '' ? 0 : e.detail.value
    })
  },
  setdeal(e) {

    var sum = parseInt(e.detail.value == '' ? 0 : e.detail.value) + parseInt(this.data.fieldpercent) + parseInt(this.data.supplypercent)

    if (sum > 97) {
      wx.showToast({
        title: '比例超限',
      })

      this.setData({
        dealpercent: 92
      })

      return
    }

    this.setData({
      dealpercent: e.detail.value == '' ? 0 : e.detail.value
    })
  },
  setsupply(e) {

    var sum = parseInt(e.detail.value == '' ? 0 : e.detail.value) + parseInt(this.data.fieldpercent) + parseInt(this.data.dealpercent)

    if (sum > 97) {
      wx.showToast({
        title: '比例超限',
      })

      this.setData({
        supplypercent: 3
      })

      return
    }

    this.setData({
      supplypercent: e.detail.value == '' ? 0 : e.detail.value
    })
  },
  setpercent(roletype, per) {

    var that = this
    fetch({
      url: "/CVS/apply/perset",
      // baseUrl: "http://192.168.50.239:9888",
      baseUrl: "https://store.lianlianchains.com",
      data: {
        'id': that.data.storeid,
        'roletype': roletype,
        'per': per
      },
      method: "POST",
      noLoading: true,
      header: { 'content-type': 'application/x-www-form-urlencoded' }
    }).then(res => {

      console.log(res)

    }).catch(err => {
      console.log("出错了")
      wx.showToast({
        title: '出错了',
      })
      console.log(err)
    })
  },
  querypercent() {

    var that = this
    fetch({
      url: "/CVS/apply/queryper",
      // baseUrl: "http://192.168.50.239:9888",
      baseUrl: "https://store.lianlianchains.com",
      data: {
        'id': that.data.storeid
      },
      method: "POST",
      noLoading: true,
      header: { 'content-type': 'application/x-www-form-urlencoded' }
    }).then(res => {

      console.log(res)

      that.setData({
        fieldpercent: res.fieldper,
        dealpercent: res.dealper,
        supplypercent: res.supplyper
      })

    }).catch(err => {
      console.log("出错了")
      wx.showToast({
        title: '出错了',
      })
      console.log(err)
    })
  },
  goback() {
    wx.navigateBack({
      url: '../apply/apply',
    })
  },
  fieldprotocol() {

    if (this.data.fieldflag == '签约') {
      console.log('签约')

      var that = this

      wx.showModal({
        title: '协议签约',
        content: '签约后分润比例将不能修改，请确认是否签约？',
        success: function (sm) {

          if (sm.confirm) {
            console.log('用户点击确定')

            fetch({
              url: "/CVS/apply/update",
              //   baseUrl: "http://192.168.50.239:9888",
              baseUrl: "https://store.lianlianchains.com",
              data: {
                'id': that.data.storeid,
                'fieldstate': 1
              },
              method: "POST",
              noLoading: true,
              header: { 'content-type': 'application/x-www-form-urlencoded' }
            }).then(res => {

              if (res.ec == '000000') {

                that.setData({
                  fieldflag: '已签约',
                  fieldstate: 1,
                  fieldrolebtn: 'rolebtn2'
                })

                that.setpercent(0, that.data.fieldpercent)
              }

            }).catch(err => {
              console.log("出错了")
              wx.showToast({
                title: '出错了',
              })
              console.log(err)
            })

          } else if (sm.cancel) {
            console.log('用户点击取消')

          }

        }
      })

    }
  },

  dealprotocol() {

    if (this.data.dealflag == '签约') {
      console.log('签约')

      var that = this

      wx.showModal({
        title: '协议签约',
        content: '签约后分润比例将不能修改，请确认是否签约？',
        success: function (sm) {

          if (sm.confirm) {
            console.log('用户点击确定')

            fetch({
              url: "/CVS/apply/update",
              //   baseUrl: "http://192.168.50.239:9888",
              baseUrl: "https://store.lianlianchains.com",
              data: {
                'id': that.data.storeid,
                'dealstate': 1
              },
              method: "POST",
              noLoading: true,
              header: { 'content-type': 'application/x-www-form-urlencoded' }
            }).then(res => {

              if (res.ec == '000000') {

                that.setData({
                  dealflag: '已签约',
                  dealstate: 1,
                  dealrolebtn: 'rolebtn2'
                })

                that.setpercent(1, that.data.dealpercent)
              }

            }).catch(err => {
              console.log("出错了")
              wx.showToast({
                title: '出错了',
              })
              console.log(err)
            })

          } else if (sm.cancel) {
            console.log('用户点击取消')

          }

        }
      })
    }
  },

  supplyprotocol() {

    if (this.data.supplyflag == '签约') {
      console.log('签约')

      var that = this

      wx.showModal({
        title: '协议签约',
        content: '签约后分润比例将不能修改，请确认是否签约？',
        success: function (sm) {

          if (sm.confirm) {
            console.log('用户点击确定')

            fetch({
              url: "/CVS/apply/update",
              //   baseUrl: "http://192.168.50.239:9888",
              baseUrl: "https://store.lianlianchains.com",
              data: {
                'id': that.data.storeid,
                'supplystate': 1
              },
              method: "POST",
              noLoading: true,
              header: { 'content-type': 'application/x-www-form-urlencoded' }
            }).then(res => {

              if (res.ec == '000000') {

                that.setData({
                  supplyflag: '已签约',
                  supplystate: 1,
                  supplyrolebtn: 'rolebtn2'
                })

                that.setpercent(2, that.data.supplypercent)
              }

            }).catch(err => {
              console.log("出错了")
              wx.showToast({
                title: '出错了',
              })
              console.log(err)
            })

          } else if (sm.cancel) {
            console.log('用户点击取消')

          }

        }
      })

    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    console.log(options)

    this.setData({
      storeid: options.storeid,
      field: options.fielduser,
      deal: options.dealuser,
      supply: options.supplyuser,
    });

    this.setData({
      fieldstate: options.fieldstate,
      dealstate: options.dealstate,
      supplystate: options.supplystate,
    });

    this.setData({
      fieldperson: options.fieldperson,
      dealperson: options.dealperson,
      supplyperson: options.supplyperson
    });

    this.setData({
      fieldflag: (this.data.fieldstate == 1) ? '已签约' :
        ((this.data.field == wx.getStorageSync("user").openid) ? '签约' : '未签约'),
      dealflag: (this.data.dealstate == 1) ? '已签约' :
        ((this.data.deal == wx.getStorageSync("user").openid) ? '签约' : '未签约'),
      supplyflag: (this.data.supplystate == 1) ? '已签约' :
        ((this.data.supply == wx.getStorageSync("user").openid) ? '签约' : '未签约')
    })

    this.setData({
      fieldrolebtn: (this.data.fieldflag == '已签约') ? 'rolebtn2' :
        ((this.data.fieldflag == '签约') ? 'rolebtn1' : 'rolebtn0'),
      dealrolebtn: (this.data.dealflag == '已签约') ? 'rolebtn2' :
        ((this.data.dealflag == '签约') ? 'rolebtn1' : 'rolebtn0'),
      supplyrolebtn: (this.data.supplyflag == '已签约') ? 'rolebtn2' :
        ((this.data.supplyflag == '签约') ? 'rolebtn1' : 'rolebtn0')

    })

    this.querypercent()

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
// pages/user/user.js
import fetch from '../../utils/fetch.js';

var app = getApp();

var num = 0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cancel: true,
    isSubmit: false,
    avatarUrl: '',
    getComment: "1",
    inputCotent: "",
    score: 0,
    benefit: 0
  },
  //  settleView() {
  //    wx.navigateTo({
  //      url: '../settle/settle',
  //    })
  //  },
  grabShow() {
    
    
    // wx.getSetting({
    //   success(res) {
    //     if (!res.authSetting['scope.userLocation']) {
        
    //       wx.getLocation({
    //         success: function(res) {
    //           console.log(res)
    //         },
    //       })
    //     }else{
    //       wx.navigateTo({
    //         url: '../grab/grab',
    //       })
    //     }
    //   }
    // })

    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userLocation']) {

          wx.authorize({
            scope: 'scope.userLocation',
            success() {
              console.log(111)
            },
            fail() {
              wx.openSetting({
                success: function (data) {
                  if (data) {
                    if (data.authSetting["scope.userInfo"] == true) {
                      // wx.navigateTo({
                      //   url: '../grab/grab',
                      // })
                    }
                  }
                },
                fail: function () {
                  console.info("2授权失败返回数据");

                }
              });
            }
          })
        } else {
          wx.navigateTo({
            url: '../grab/grab',
          })
        }
      }
    })

    
    
    
  },
  querybenefit() {
    fetch({
      url: "/CVS/querywithusersum",
      //   baseUrl: "http://192.168.50.57:9888",
      baseUrl: "https://store.lianlianchains.com",
      data: {
        'openid': wx.getStorageSync("user").openid
      },
      method: "GET",
      noLoading: true,
      header: { 'content-type': 'application/x-www-form-urlencoded' }
    }).then(res => {

      this.setData({
        benefit: (res.data / 100).toFixed(2)
      })

    }).catch(err => {

      wx.showToast({
        title: '出错了',
      })
      console.log(err)

    })
  },
  queryscore() {

    fetch({
      url: "/CVS/score/query",
      // baseUrl: "http://192.168.50.239:9888",
      baseUrl: "https://store.lianlianchains.com",
      data: {
        'unionId': wx.getStorageSync('unionId')
      },
      method: "GET",
      noLoading: true,
      header: { 'content-type': 'application/x-www-form-urlencoded' }
    }).then(res => {


      if (res.ec != '999999') {
        this.setData({
          score: res.data
        })
      }

    }).catch(err => {

      wx.showToast({
        title: '出错了',
      })
      console.log(err)

    })
  },
  benefit() {
    wx.navigateTo({
      url: '../benefit/benefit',
    })
  },
  _getUnionID() {
    let that = this;
    wx.login({
      success: function (res) {
        if (res.code) {

          var l = 'https://store.lianlianchains.com/wx/getopenid?code=' + res.code;
          wx.request({
            url: l,
            data: {},
            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT    
            // header: {}, // 设置请求的 header    
            success: function (res) {
              wx.getUserInfo({
                withCredentials: true,
                success: function (info) {
                  that.setData({
                    avatarUrl: info.userInfo.avatarUrl,
                    nickName: info.userInfo.nickName
                  });
                  wx.request({
                    // url: 'http://192.168.50.239:9888/wx/decodeUserInfo',
                    url: 'https://store.lianlianchains.com/wx/decodeUserInfo',
                    data: {
                      openid: res.data.openid,
                      session_key: res.data.session_key,
                      encryptedData: info.encryptedData,
                      iv: info.iv
                    },
                    method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT    
                    // header: {}, // 设置请求的 header    
                    success: function (secr) {
                      wx.setStorageSync('unionId', secr.data.userInfo.unionId);
                      that.queryscore();
                    }
                  });
                }
              })



              var obj = {};
              obj.openid = res.data.openid;
              obj.expires_in = Date.now() + res.data.expires_in;
              obj.session_key = res.data.session_key;
              wx.setStorageSync('user', obj);//存储openid    
            }
          });

        } else {
          console.log('获取用户登录态失败！' + res.errMsg)

        }
      }
    });
  },
  _Auth() {
    let _this = this;
    wx.showModal({
      content: '快点申请获取用户信息权限',
      success: function (res) {
        if (res.confirm) {
          wx.openSetting({
            success: function (data) {
              if (data) {
                if (data.authSetting["scope.userInfo"] == true) {
                  _this._getUnionID();
                }
              }
            },
            fail: function () {
              console.info("2授权失败返回数据");

            }
          });
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
    

  },
  score() {
    if (!!wx.getStorageSync('unionId')) {
      wx.navigateTo({
        url: '../score/score',
      })
    } else {
      this._Auth();
    }

  },
  apply() {
    wx.navigateTo({
      url: '../settle/settle',
    })
  },
  webShow() {
    wx.navigateTo({
      url: '../webpage/webpage',
    })
  },
  submitComment(e) {
    var comment = e.detail.value.comment;
    this.setData({
      inputCotent: ""
    })
    if (comment == '') {
      this.setData({
        cancel: true
      })
      return
    }

    fetch({
      url: "/CVS/comment",
      //   baseUrl: "http://192.168.50.57:9888", 
      baseUrl: "https://store.lianlianchains.com",
      data: {
        openid: wx.getStorageSync('user').openid,
        storeid: wx.getStorageSync('storeId'),
        comment: comment
      },
      noLoading: true,
      method: "POST",
      header: { 'content-type': 'application/x-www-form-urlencoded' }
      //  header: { 'content-type': 'application/json' }
    }).then(comment => {
      if (comment === "评论成功") {
        this.setData({
          cancel: true
        })
      }
    }).catch(err => {
      console.log("出错了")
      wx.showToast({
        title: '网络繁忙'
      })
      console.log(err)
    });
  },
  commenShow() {
    this.setData({
      cancel: false
    })
  },
  commenCancel() {
    this.setData({
      cancel: true
    })
  },
  commentView() {

  },
  orderView() {
    wx.navigateTo({
      url: '../orderList/orderList'
    })
    // let mobile = wx.getStorageSync('mobile');
    // if (this.data.mobile !== '') {
    //    wx.navigateTo({
    //       url: '../orderList/orderList'
    //    })
    // } else {
    //    wx.navigateTo({
    //       url: '../submit/submit'
    //    })
    // }

  },
  bindSubmitTap() {
    wx.navigateTo({
      url: '../submit/submit'
    })
  },
  cartView(e) {
    let totalnum = e.target.dataset.totalnum;
    if (totalnum > 0) {
      wx.navigateTo({
        url: '../cart/cart',
      })
    }
  },
  _getCartnum() {
    fetch({
      url: "/CVS/cart/querycart",
      //   baseUrl: "http://192.168.50.57:9888", 
      baseUrl: "https://store.lianlianchains.com",
      data: {
        openid: wx.getStorageSync('user').openid,
        storeid: wx.getStorageSync('storeId')
      },
      noLoading: true,
      method: "GET",
      header: { 'content-type': 'application/x-www-form-urlencoded' }
      //  header: { 'content-type': 'application/json' }
    }).then(carts => {
      this.data.totalNum = 0;
      for (var i = 0; i < carts.length; i++) {
        this.data.totalNum += carts[i].amount
      }
      this.setData({
        totalNum: this.data.totalNum
      })
    }).catch(err => {
      console.log("出错了")
      wx.showToast({
        title: '网络繁忙'
      })
      console.log(err)
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let that = this;
    wx.getUserInfo({
      success: function (res) {
        that.setData({
          avatarUrl: res.userInfo.avatarUrl,
          nickName: res.userInfo.nickName
        })
      },
      fail: function (err) {
        that.setData({
          avatarUrl: '../../image/user.png'
        })
      }
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
    var that = this;
    fetch({
      url: "/CVS/user/query",
      //   baseUrl: "http://192.168.50.57:9888",
      baseUrl: "https://store.lianlianchains.com",
      data: {
        openid: wx.getStorageSync('user').openid
      },
      noLoading: true,
      method: "GET",
      header: { 'content-type': 'application/x-www-form-urlencoded' }
      //   header: { 'content-type': 'application/json' }
    }).then(result => {

      if (result) {
        let mobile = result.phoneno.substr(0, 3) + "****" + result.phoneno.substr(7)
        this.setData({
          mobile: mobile
        })
      } else {
        this.setData({
          mobile: ""
        })
      }
    }).catch(err => {
      console.log("出错了")
      console.log(err)
    });
    this._getCartnum();

    if (!!wx.getStorageSync('unionId')) {
      this.queryscore();
    }
    
    this.querybenefit()

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
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  }
})
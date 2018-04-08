// pages/user/user.js
import fetch from '../../utils/fetch.js';

var app = getApp();

let componentBasePath = "../../component/";

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
  walletView() {
    let _this = this;
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userInfo']) {

          wx.showModal({
            content: '快点申请获取用户信息权限',
            success: function (res) {
              if (res.confirm) {
                wx.openSetting({
                  success: function (data) {
                    if (data) {
                      if (data.authSetting["scope.userInfo"] == true) {

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
        } else {
          wx.navigateTo({
            url: componentBasePath + "wallet/wallet",
          })
        }
      }
    })
    
  },
  grabShow() {
    let _this = this;
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userLocation']) {
          wx.showModal({
            content: '快点申请获取用户地理位置权限',
            success: function (res) {
              if (res.confirm) {
                wx.openSetting({
                  success: function (data) {
                    if (data) {
                      if (data.authSetting["scope.userLocation"] == true) {

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

        } else {
          wx.navigateTo({
            url: '../grab/grab',
          })
        }
      }
    })




  },
  benefit() {
    wx.navigateTo({
      url: '../benefit/benefit',
    })
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
    let _this = this;
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userInfo']) {

          wx.showModal({
            content: '快点申请获取用户信息权限',
            success: function (res) {
              if (res.confirm) {
                wx.openSetting({
                  success: function (data) {
                    if (data) {
                      if (data.authSetting["scope.userInfo"] == true) {

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
        } else {
          wx.navigateTo({
            url: '../score/score',
          })
        }
      }
    })

  },
  apply() {
    wx.navigateTo({
      url: '../settle/settle',
    })
  },
  webShow() {
    wx.navigateTo({
      url: '../webpage/webpage?webpage=https://store.lianlianchains.com/',
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
    console.log(1111)
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
        });

      },
      fail: function (err) {
        that.setData({
          avatarUrl: '../../image/user.png'
        })
      }
    });

    wx.authorize({
      scope: 'scope.userLocation',
      success() {

      },
      fail() {

      }
    })

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    this._getCartnum();
  }
})
// pages/score/score.js
import fetch from '../../utils/fetch';

let storeListUser = []
let pageUser = 0
let totalpageUser = 0

let storeList = []
let page = 0
let totalpage = 0

Page({

  /**
   * 页面的初始数据
   */
  data: {
    share: false,
    score: 0,
    mask: true,
    code: false,
    hidden: true,
    transfer: true,
    amount: 0,
    change: true,
    storeListUser: [],
    storeList: [],
    src: "https://store.lianlianchains.com/webpage1.png?v="+ new Date().getTime()
  },
  shareView() {
    this.setData({
      code: true,
      transfer: false
    })
    this.getUuid();
  },
  gainScoreView() {
    wx.navigateTo({
      url: '../gainScore/gainScore',
    })
  },
  exchangeView() {
    wx.scanCode({
      success: (res) => {
        console.log(res);

        wx.navigateTo({
          url: '../pay/pay?unionto=' + res.result,
        })
      }
    })
  },
  shopCardView() {
    wx.navigateTo({
      url: '../shopCard/shopCard',
    })
  },
  detail() {
    wx.navigateTo({
      url: '../../pages/scorelist/scorelist',
    })
  },
  investquit(e) {

    var investtype = e.target.dataset.investtype
    var storeid = e.target.dataset.storeid
    var storename = e.target.dataset.storename
    var score = e.target.dataset.score
    var scorebonus = e.target.dataset.scorebonus

    wx.navigateTo({
      url: '../scoreinvest/scoreinvest?investtype=' + investtype +
      '&storeid=' + storeid + '&storename=' + storename +
      '&score=' + score + '&scorebonus=' + scorebonus,
    })
  },
  investjoin(e) {

    var investtype = e.target.dataset.investtype
    var storeid = e.target.dataset.storeid
    var storename = e.target.dataset.storename

    wx.navigateTo({
      url: '../scoreinvest/scoreinvest?investtype=' + investtype +
      '&storeid=' + storeid + '&storename=' + storename +
      '&curscore=' + this.data.score,
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

      // wx.hideLoading();  

    }).catch(err => {

      wx.showToast({
        title: '出错了',
      })
      console.log(err)

    })
  },
  querystore() {

    fetch({
      url: "/wxpay/increaseall",
      // baseUrl: "http://192.168.50.239:9888",
      baseUrl: "https://store.lianlianchains.com",
      data: {
        'page': page,
        'pagenum': 5
      },
      method: "GET",
      noLoading: true,
      header: { 'content-type': 'application/x-www-form-urlencoded' }
    }).then(res => {


      if (res != '' && res.data && res.data.totalpage) {

        totalpage = res.data.totalpage
        this.setData({
          storeList: this.data.storeList.concat(res.data.increasMoney)
        })

      }

    }).catch(err => {

      wx.showToast({
        title: '出错了',
      })
      console.log(err)

    })

  },
  querystoreuser() {

    fetch({
      url: "/CVS/user/queryfinance",
      // baseUrl: "http://192.168.50.239:9888",
      baseUrl: "https://store.lianlianchains.com",
      data: {
        'page': page,
        'pagenum': 20,
        'openid': wx.getStorageSync("user").openid
      },
      method: "GET",
      noLoading: true,
      header: { 'content-type': 'application/x-www-form-urlencoded' }
    }).then(res => {

      if (res.ec != '999999' && res.data && res.data.totalpage) {
        setTimeout(() => {

          totalpageUser = res.data.totalpage
          this.setData({
            storeListUser: this.data.storeListUser.concat(res.data.increasMoney)
          })

        }, 500);
      }

    }).catch(err => {

      wx.showToast({
        title: '出错了',
      })
      console.log(err)

    })

  },
  loadMore() {

    if (page >= totalpage - 1) {

      console.log("没有更多了")
      page = totalpage

    } else {

      console.log("加载更多")
      page++

      this.querystore()()
    }
  },
  preview() {
    wx.previewImage({
      current: this.data.receiveCode, // 当前显示图片的http链接
      urls: [this.data.receiveCode,] // 需要预览的图片http链接列表
    })
  },
  loulan() {
    wx.navigateTo({
      url: '../../pages/webpage/webpage?webpage=https://loulan.lianlianchains.com/',
    })
  },
  _getUnionID(unionFrom, amount, uuid) {
    
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
                      wx.setStorageSync('userauth', "success");
                      if (!!wx.getStorageSync('unionId')) {

                        that.setData({
                          receiveCode: "https://store.lianlianchains.com/qrcode?data=" + wx.getStorageSync('unionId') + "&width=202&height=202"
                        })

                        console.log("开户之前")

                        fetch({
                          url: "/kd/register?func=account&usr=" + wx.getStorageSync('unionId') + "&acc=" + wx.getStorageSync('unionId'),
                          // baseUrl: "http://192.168.50.239:9888",
                          baseUrl: "https://store.lianlianchains.com",
                          data: {
                            
                          },
                          method: "GET",
                          noLoading: true,
                          header: { 'content-type': 'application/x-www-form-urlencoded' }
                        }).then(res => {
                          console.log("开户之hou")
                            if(res.code == 0) {
                              fetch({
                                url: "/CVS/user/transferquery",
                                // baseUrl: "http://192.168.50.239:9888",
                                baseUrl: "https://store.lianlianchains.com",
                                data: {
                                  unionid : unionFrom,
                                  // unionid: "o57KOvxS0eXTtxv23EobCON__S40",
                                  unionto: wx.getStorageSync('unionId'),
                                  amount: amount
                                },
                                method: "POST",
                                noLoading: true,
                                header: { 'content-type': 'application/x-www-form-urlencoded' }
                              }).then(result => {

                                console.log("查询：", res)
                                console.log("查询2：", JSON.parse(result.data).result == "0", JSON.parse(result.data).result)

                                if (JSON.parse(result.data).result == "0") {
                                  console.log("查询陈宫")
                                  that.transter(unionFrom, amount, uuid);
                                } else if (JSON.parse(result.data).result == "10004") {
                                  wx.showModal({
                                    content: '密码错误',
                                    showCancel: false,
                                    confirmColor: '#0D8FEF'
                                  });
                                } else if (JSON.parse(result.data).result == "10003") {
                                  wx.showModal({
                                    content: '账号余额不足',
                                    showCancel: false,
                                    confirmColor: '#0D8FEF'
                                  });
                                } else if (JSON.parse(result.data).result == "10005") {
                                  wx.showModal({
                                    content: '转账金额不合法',
                                    showCancel: false,
                                    confirmColor: '#0D8FEF'
                                  });
                                } else {
                                  wx.showModal({
                                    content: '网络错误',
                                    showCancel: false,
                                    confirmColor: '#0D8FEF',
                                  });
                                }

                                

                              }).catch(err => {

                                wx.showToast({
                                  title: '出错了',
                                })
                                console.log(err)

                              })
                              
                            }
                        }).catch(err => {

                          wx.showToast({
                            title: '出错了',
                          })
                          console.log(err)

                        })

                        
                      }

                    }
                  });
                },
                fail() {
                  wx.setStorageSync('userauth', "faild");
                  wx.hideLoading();
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
  loading() {
    wx.showToast({
      title: '请稍后...',
      icon: 'success',
      duration: 2000
    })
  },
  transter(unionFrom, amount, uuid) {
    let that = this;
    console.log("start")
    fetch({
      url: "/CVS/user/transfer",
      // baseUrl: "http://192.168.50.239:9888",
      baseUrl: "https://store.lianlianchains.com",
      data: {
        unionid: unionFrom,
        uuid: uuid,
        unionto: wx.getStorageSync('unionId'),
        amount: amount
      },
      method: "POST",
      noLoading: true,
      header: { 'content-type': 'application/x-www-form-urlencoded' }
    }).then(res => {


        
      
      if(res.data == 0) {
        this.setData({
          change: false,
        })
      }else{
        wx.showModal({
          content: '领取过了',
          showCancel: false,
          confirmColor: '#0D8FEF',
        });
      }
      

      var timer = setTimeout(() => {
        this.setData({
          change: true,
        })

        clearTimeout(timer)
      },1000)

      var timer2 = setTimeout(() => {;
        this.setData({
          share: false
        })
        this.queryscore()

        clearTimeout(timer2)
      }, 1050)

      wx.hideLoading()
      
      

      

    }).catch(err => {

      wx.showToast({
        title: '出错了',
      })
      console.log(393,err)

    })
  },
  getScore() {
    wx.showModal({
      title: '提示', 
      content: '恭喜您获得' + this.data.amount+'积分',
      showCancel: false,
      success:  (res) => {
        if (res.confirm) {
          console.log('用户点击确定');
          this.setData({
            mask: true,
            code: false
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let unionto = wx.getStorageSync('unionId');
    let _this = this;

    wx.setStorageSync("options", options);
    console.log(111, options)
    console.log(222,wx.getStorageSync('options'))

    this.setData({
      receiveCode: "https://store.lianlianchains.com/qrcode?data=" + unionto + "&width=202&height=202",
      code: false,
      transfer: true,
    })

    if (options.target == "share") {
      this.setData({
        share: true
      })
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
    wx.hideShareMenu();
    let _this = this;

    let options = wx.getStorageSync('options');
    console.log(333,options)
    

    if (this.data.share == true && options.target == "share" && options.unionId != wx.getStorageSync('unionId') && options.amount && options.unionFrom) {



      this.setData({
        amount: options.amount,
        code: true,
        transfer: true,
        share: true
      })

      wx.showLoading({
        mask: true,
        duration: 0,
        title: '加载中',
      })



      wx.getSetting({
        success(res) {
          if (!res.authSetting['scope.userInfo']) {
            console.log("未授权")
            console.log(wx.getStorageSync('userauth'));
            if (wx.getStorageSync('userauth') == "success") {
              console.log("第二次进入")
              wx.showLoading({
                mask: true,
                duration: 0,
                title: '加载中',
              })
              _this._getUnionID(options.unionFrom, options.amount, options.uuid)
            } else if (wx.getStorageSync('userauth') == "faild") {
              console.log("拒绝后")
              wx.showModal({
                content: '快点申请获取用户信息权限',
                success: function (res) {
                  if (res.confirm) {
                    wx.openSetting({
                      success: function (data) {
                        if (data) {
                          if (data.authSetting["scope.userInfo"] == true) {
                            wx.showLoading({
                              mask: true,
                              duration: 0,
                              title: '加载中',
                            })
                            _this._getUnionID(options.unionFrom, options.amount, options.uuid);
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
              console.log("第一次进入")

              _this._getUnionID(options.unionFrom, options.amount, options.uuid)
            }

          } else {
            console.log("已授权")
            if (!wx.getStorageSync('unionId')) {

              _this._getUnionID(options.unionFrom, options.amount, options.uuid);

              return;
            }

            _this.setData({
              receiveCode: "https://store.lianlianchains.com/qrcode?data=" + wx.getStorageSync('unionId') + "&width=202&height=202"
            })
            _this._getUnionID(options.unionFrom, options.amount, options.uuid);

          }
        }
      })
    }

    // storeListUser = []
    // pageUser = 0
    // totalpageUser = 0

    // storeList = []
    // page = 0
    // totalpage = 0

    this.setData({
      code: false,
    })

    if (!!wx.getStorageSync('unionId')) {
      this.queryscore()
    }

    
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

  amountInput(e) {
    console.log(e.detail.value)
    this.setData({
      amount: e.detail.value
    })
  },

  cancelToast() {
    this.setData({
      code: false,
      transfer: true,
    })
  },
  getUuid() {
    fetch({
      url: "/CVS/user/newredpack",
      // baseUrl: "http://192.168.50.238:9888",
      baseUrl: "https://store.lianlianchains.com",
      data: {
        unionid: wx.getStorageSync('unionId')
      },
      method: "GET",
      noLoading: true,
      header: { 'content-type': 'application/x-www-form-urlencoded' }
    }).then(res => {
      console.log("uuid",res);
      if (res.ec == "000000") {
        this.setData({
          uuid: res.data
        })
        
      }else{
        wx.showToast({
          title: '出错了',
        })
      }
    }).catch(err => {

      wx.showToast({
        title: '出错了',
      })
      console.log(err)

    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }

    let uuid = this.data.uuid;

    return {
      title: '楼兰红包',
      path: '/component/wallet/wallet?target=share&unionFrom=' + wx.getStorageSync('unionId') + '&amount=' + this.data.amount + '&uuid=' + uuid,
      imageUrl: "https://store.lianlianchains.com/share.jpg?v=" + new Date().getTime(),
      success: (res) => {
        // 转发成功

        this.setData({
          code: false,
          transfer: true,
        })
      },
      fail: function (res) {
        // 转发失败
      }
    }

    
  }
})
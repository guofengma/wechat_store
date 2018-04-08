// pages/buy/buy.js
import fetch from '../../utils/fetch.js'
var socketOpen = false
var socketMsgQueue = []

Page({

  /**
   * 页面的初始数据
   */
  data: {
    frt: '',
    money: '',
    codestate: "发 送",
    smsCode: '',
    smsBtn: false,
    password: '',
    loading: false
  },
  
  moneyInput(e) {
    this.setData({
      money: e.detail.value
    })
  },
  passwordInput(e) {
    this.setData({
      password: e.detail.value
    })
  },
  pwdInput(e) {
    this.setData({
      pwd: e.detail.value
    })
  },
  pay() {
    if (!this.data.money) {
      wx.showModal({
        content: '金额不能为空',
        showCancel: false,
        confirmColor: '#0D8FEF'
      });

      return
    }

    if (!this.data.pwd) {
      wx.showModal({
        content: '密码不能为空',
        showCancel: false,
        confirmColor: '#0D8FEF'
      });

      return
    }

    if (this.data.pwd.length != 6) {
      wx.showModal({
        content: '密码为6位数字',
        showCancel: false,
        confirmColor: '#0D8FEF'
      });

      return
    }

    this.transfer();
  },


  transfer() {

    this.setData({
      loading: true
    });
    fetch({
      url: "/kd/invoke",
      baseUrl: "http://192.168.10.100",
      // baseUrl: "https://store.lianlianchains.com",
      data: {
        func:"transeferUsePwd",
        usr: wx.getStorageSync('user').openid,
        acc: wx.getStorageSync('user').openid,
        reacc: this.data.reacc,
        amt:this.data.money,
        pwd:this.data.pwd,
        desc:"转账"
      },
      noLoading: true,
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      }
      // header: { 'content-type': 'application/json' }
    }).then(result => {
      if (result.code == "0") {

        wx.showLoading({
          title: '交易成功',
        })

        this.sendSocketMessage(JSON.stringify({ types: "0", data: wx.getStorageSync('user').openid }));
        
        
      }else{
        wx.showModal({
          content: '交易失败',
          showCancel: false,
          confirmColor: '#0D8FEF',
          success:  (res) => {
            if (res.confirm) {
              console.log('用户点击确定')
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        });
      }
      
    }).catch(err => {
      console.log("出错了")
      console.log(err)

      this.setData({
        loading: false
      });

    });
  },

  getOrderinfo(orderNo) {
    fetch({
      url: "/loulan/chain/queryOrder",
      //   baseUrl: "http://192.168.50.57:9888",
      baseUrl: "https://store.lianlianchains.com",
      data: {
        orderNo: orderNo
      },
      noLoading: true,
      method: "GET",
      //   header: { 'content-type': 'application/x-www-form-urlencoded' }
      header: {
        'content-type': 'application/json'
      }
    }).then(result => {
      console.log(result)

      this.setData({
        reacc: result.data.openid,
        money: result.data.fee
      })
    }).catch(err => {
      console.log(err)
    });
  },

  getopenid() {
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

  sendSocketMessage(msg) {
    if (socketOpen) {
      wx.sendSocketMessage({
        data: msg
      })
    } else {
      socketMsgQueue.push(msg)
    }
  },

  updateOrderState() {
    fetch({
      url: "/loulan/chain/updateOrder",
      //   baseUrl: "http://192.168.50.57:9888",
      baseUrl: "https://store.lianlianchains.com",
      data: {
        state: 1,
        orderNo: this.data.orderNo
      },
      noLoading: true,
      method: "GET",
      //   header: { 'content-type': 'application/x-www-form-urlencoded' }
      header: {
        'content-type': 'application/json'
      }
    }).then(result => {
      console.log(result)

      this.setData({
        loading: false
      });

      if(result.ec == "000000") {
        wx.navigateBack({
          delta: -1
        })
      }

    }).catch(err => {
      console.log(err)
    });
  },

  socket() {
    // wx.closeSocket()

    var self = this;

    console.log("将要连接服务器。");
    wx.connectSocket({
      url: 'wss://store.lianlianchains.com/websocket'
    });

    wx.onSocketOpen(function (res) {
      console.log("连接服务器成功。");

      socketOpen = true


      socketMsgQueue = []

    });

    wx.onSocketMessage(function (res) {
      console.log('收到服务器内容：' + res.data);
      var data = JSON.parse(res.data);
      if (data.types == 1 && data.data == wx.getStorageSync('user').openid) {
        self.sendSocketMessage(JSON.stringify({
          types: "2",
          data: wx.getStorageSync('user').openid
        }));

        self.updateOrderState()
        
        // wx.navigateBack({
        //   delta: -1
        // })
      }

    });
    wx.onSocketClose(function (res) {
      console.log('WebSocket 已关闭！')
      console.log("重新连接")
      wx.connectSocket({
        url: 'wss://store.lianlianchains.com/websocket',
        fail: function (err) {
          console.log(err)
        }
      });
      wx.onSocketOpen(function (res) {
        console.log("连接服务器成功。");

        socketOpen = true


        socketMsgQueue = []

      });

    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getopenid();
    if(options.orderNo) {

      this.getOrderinfo(options.orderNo);
      this.setData({
        orderNo: options.orderNo
      })
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
    this.socket();
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
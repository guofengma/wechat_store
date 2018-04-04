import fetch from '../../utils/fetch';

var socketOpen = false
var socketMsgQueue = []
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hidden: true,
    loading: false,
    loginBtnMsg: "确认登陆"
  },
  login() {
    this.setData({
      loading: true,
      loginBtnMsg: "正在登陆"
    })
    let uuid = this.data.uuid;
    if (uuid) {
      this.sendSocketMessage(JSON.stringify({ types: "0", data: uuid + ""}));
    }
    
  },
  cancel() {
    wx.navigateBack({
      delta: -1
    })
  },
  sendSocketMessage(msg) {
    if(socketOpen) {
      wx.sendSocketMessage({
        data: msg
      })
    } else {
      socketMsgQueue.push(msg)
    }
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
      
      // let unionId = wx.getStorageSync('unionId');
      

      socketMsgQueue = []
      
    });

    wx.onSocketMessage(function (res) {
      console.log('收到服务器内容：' + res.data);
      var data = JSON.parse(res.data);
      if (data.types == 1 && data.data == self.data.uuid) {
        self.sendSocketMessage(JSON.stringify({
          types: "2",
          data: wx.getStorageSync('user').openid
        }));
        self.setData({
          loading: false
        })
        wx.navigateBack({
          delta: -1
        })
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

        // let unionId = wx.getStorageSync('unionId');


        socketMsgQueue = []
        
      });

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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.uuid) {
      this.setData({
        uuid: options.uuid
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
    let _this = this;

    this.socket();
    
    if (!wx.getStorageSync('user').openid) {

        _this._getUnionID();

      return;
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})
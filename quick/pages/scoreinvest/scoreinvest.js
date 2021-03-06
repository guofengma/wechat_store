// pages/scoreinvest/scoreinvest.js
import fetch from '../../utils/fetch';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    scoresum: 0,
    btn: false,
    benifit: 0,
    score: 0,
    extract: false,
    limitNum:0,
    btnContDisable: false
  },
  setScore(e) {
    var inputNum = e.detail.value - 0;
    if (inputNum == '') {
      this.setData({
        scoresum: ""
      });
      return;
    }
    if (inputNum >= this.data.limitNum - 0) {
      inputNum = this.data.limitNum - 0
    }
    this.setData({
      scoresum: inputNum
    })
  },
  initScore(){
    this.setData({
      scoresum: ''
    })
  },
  initbtn(investtype){

    var dt = new Date();
    console.log(dt.getDay())
    console.log(dt.getHours())

    this.setData({
      btn: (dt.getHours() > 9 && dt.getHours() < 15),
      extract: ( dt.getHours() > 9 && dt.getHours() < 12),
      join: (dt.getHours() > 13 && dt.getHours() < 15),
    })

    if (investtype == 0) {
      if (dt.getHours() > 13 && dt.getHours() <= 15) {
        this.setData({
          btnCont: "参与",
          joinBtn: true,
          btnContDisable: false
        });

        this._getLimit();

        return
      }else{
        this.setData({
          btnCont: "参与",
          btnContDisable: true
        })
      }
      this._getLimit();

      return
    } else {
      this.setData({
        btnCont: "提取",
        joinBtn: false
      });

      if (dt.getHours() > 9 && dt.getHours() <= 12) {
        this.setData({
          btnCont: "提取",
          joinBtn: false,
          btnContDisable: false
        });

        return
      } else {
        this.setData({
          btnCont: "提取",
          btnContDisable: true
        })
      }

      return
    }

    console.log(this.data.btn)

  },
  querybenifit(score) {

    fetch({
      url: "/CVS/user/queryalone",
      // baseUrl: "http://192.168.50.239:9888",
      baseUrl: "https://store.lianlianchains.com",
      data: {
        'openid': wx.getStorageSync('user').openid,
        'storeId': this.data.storeid
      },
      method: "GET",
      noLoading: true,
      header: { 'content-type': 'application/x-www-form-urlencoded' }
    }).then(res => {

      console.log(res)

      if (JSON.parse(res.data).code == 0) {

        var benifit = JSON.parse(res.data).result

        this.setData({
          benifit: benifit,
          scoresum: parseInt(score) + parseInt(benifit)
        })
      }

    }).catch(err => {

      wx.showToast({
        title: '出错了',
      })
      console.log(err)

    })
  },  
  quit() {

    if (this.data.scoresum == '' || parseInt(this.data.scoresum) == 0) {
      wx.showToast({
        title: '请输入积分',
      })

      return
    }

    if (parseInt(this.data.scoresum) > parseInt(this.data.curscore)) {
      wx.showToast({
        title: '您的积分不足',
      })

      return
    }

    fetch({
      url: "/CVS/user/deletefinance",
      // baseUrl: "http://192.168.50.239:9888",
      baseUrl: "https://store.lianlianchains.com",
      data: {
        'openid': wx.getStorageSync("user").openid,
        'storeid': this.data.storeid,
        'score': this.data.scoresum
      },
      method: "GET",
      noLoading: true,
      header: { 'content-type': 'application/x-www-form-urlencoded' }
    }).then(res => {

      console.log(res)

      if (res.ec == '000000') {
        wx.navigateBack({
          url: '../../component/wallet/wallet',
        })
      }

    }).catch(err => {

      wx.showToast({
        title: '出错了',
      })
      console.log(err)

    })
  },
  join() {

    console.log(this.data.scoresum)
    console.log(this.data.curscore)

    if (this.data.scoresum=='' || parseInt(this.data.scoresum) == 0) {
      wx.showToast({
        title: '请输入积分',
      })

      return
    }

    if (parseInt(this.data.scoresum) > parseInt(this.data.curscore)) {
      wx.showToast({
        title: '您的积分不足',
      })

      return
    }

    fetch({
      url: "/CVS/user/joinfinance",
      // baseUrl: "http://192.168.50.239:9888",
      baseUrl: "https://store.lianlianchains.com",
      data: {
        'openid': wx.getStorageSync("user").openid,
        'storeid': this.data.storeid,
        'score': this.data.scoresum
      },
      method: "GET",
      noLoading: true,
      header: { 'content-type': 'application/x-www-form-urlencoded' }
    }).then(res => {

      console.log(res)

      if (res.ec == '000000') {
        wx.navigateBack({
          url: '../../component/wallet/wallet',
        })
      }

    }).catch(err => {

      wx.showToast({
        title: '出错了',
      })
      console.log(err)

    })

  },
  //获取投资额度
  _getLimit() {
    fetch({
      url: "/CVS/user/querylimit",
      // baseUrl: "http://192.168.50.239:9888",
      baseUrl: "https://store.lianlianchains.com",
      data: {
        'storeId': this.data.storeid
      },
      method: "GET",
      noLoading: true,
      header: { 'content-type': 'application/x-www-form-urlencoded' }
    }).then(res => {
      var result = JSON.parse(res.data).result;
      var code = JSON.parse(res.data).code;
      
      if(code == 0) {
        this.setData({
          limitNum: result,
          scoresum: ""
        });
      }

      
      return

    }).catch(err => {

      wx.showToast({
        title: '出错了',
      })
      console.log(err)

    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.setData({
      investtype: options.investtype,
      storeid: options.storeid,
      storename: options.storename,
    })

    if (options.investtype == 0) {
      this.setData({
        curscore: options.curscore,
      })
    } else {

      this.setData({
        score: options.score
      })
      this.querybenifit(options.score)
      
    }

    this.initbtn(options.investtype)

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
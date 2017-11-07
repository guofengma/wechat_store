// pages/protocol/protocol.js
import fetch from '../../utils/fetch';

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  goback(){
    wx.redirectTo({
      url: '../apply/apply',
    })
  },
  fieldprotocol(){
    
    if(this.data.fieldflag == '签约'){
      console.log('签约')
      
      fetch({
        url: "/CVS/apply/update",
        //   baseUrl: "http://192.168.50.239:9888",
        baseUrl: "https://store.lianlianchains.com",
        data: {
          'id': this.data.storeid,
          'fieldstate': 1
        },
        method: "POST",
        noLoading: true,
        header: { 'content-type': 'application/x-www-form-urlencoded' }
      }).then(res => {

        if (res.ec == '000000') {
          this.setData({
            fieldflag: '已签约'
          })
        }

      }).catch(err => {
        console.log("出错了")
        wx.showToast({
          title: '出错了',
        })
        console.log(err)
      })

    }
  },

  dealprotocol() {

    if (this.data.dealflag == '签约') {
      console.log('签约')

      fetch({
        url: "/CVS/apply/update",
        //   baseUrl: "http://192.168.50.239:9888",
        baseUrl: "https://store.lianlianchains.com",
        data: {
          'id': this.data.storeid,
          'dealstate': 1
        },
        method: "POST",
        noLoading: true,
        header: { 'content-type': 'application/x-www-form-urlencoded' }
      }).then(res => {

        if (res.ec == '000000') {
          this.setData({
            dealflag: '已签约'
          })
        }

      }).catch(err => {
        console.log("出错了")
        wx.showToast({
          title: '出错了',
        })
        console.log(err)
      })
    }
  },

  supplyprotocol() {

    if (this.data.supplyflag == '签约') {
      console.log('签约')

      fetch({
        url: "/CVS/apply/update",
        //   baseUrl: "http://192.168.50.239:9888",
        baseUrl: "https://store.lianlianchains.com",
        data: {
          'id': this.data.storeid,
          'supplystate': 1
        },
        method: "POST",
        noLoading: true,
        header: { 'content-type': 'application/x-www-form-urlencoded' }
      }).then(res => {

        if (res.ec == '000000') {
          this.setData({
            supplyflag: '已签约'
          })
        }

      }).catch(err => {
        console.log("出错了")
        wx.showToast({
          title: '出错了',
        })
        console.log(err)
      })

    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
      fieldrolebtn: (this.data.fieldflag == '已签约') ?'rolebtn2':
        ((this.data.fieldflag == '签约') ? 'rolebtn1' : 'rolebtn0'),
      dealrolebtn: (this.data.dealflag == '已签约') ? 'rolebtn2' :
        ((this.data.dealflag == '签约') ? 'rolebtn1' : 'rolebtn0'),
      supplyrolebtn: (this.data.supplyflag == '已签约') ? 'rolebtn2' :
        ((this.data.supplyflag == '签约') ? 'rolebtn1' : 'rolebtn0')    
        
    })
      
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
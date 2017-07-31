// pages/submit/submit.js
import fetch from '../../utils/fetch'

Page({

  /**
   * 页面的初始数据
   */
  data: {
      sendmsg: '发送验证码',
      disabled: true,
      mobile:0,
      isPhone: false,
      isPwd: false,
      phoneno:'',
      pwd:'',
      onoff: true,
      num: 60,
      text: ""
  },
  //发短信
  bindPresendTap(){
      if(this.data.onoff){
          if (!this.data.phoneno) {
              this.setData({
                  isPhone: true
              })
              return
          }
          this.setData({
              sendmsg: this.data.num + this.data.text
          })
          var timer = setInterval(() => {
              this.setData({
                  sendmsg: this.data.num + this.data.text
              })
              if (this.data.num >= 2) {
                  this.data.num--
              }
              if (this.data.num < 2) {
                  this.setData({
                      sendmsg: "再次发送",
                      onoff: true,
                      num:60
                  })
                  clearInterval(timer);
              }

          }, 1000);
          this.sendSms(this.data.phoneno);
      }
      this.setData({
          onoff: false
      });
      
  },
  sendSms(mobile){
      fetch({
          url: "/sms/send",
        //   baseUrl: "http://192.168.50.57:9888",
            baseUrl: "https://store.lianlianchains.com",
          data: {
              mobile: mobile
          },
          noLoading: true,
          method: "GET",
        //   header: { 'content-type': 'application/x-www-form-urlencoded' }
          header: { 'content-type': 'application/json' }
      }).then(result => {
          if (result.code != 200) {
              wx.showToast({
                  title: '发送密码失败'
              })

          } else {

          }
      }).catch(err => {
          console.log("出错了")
          console.log(err)
      });
  },
  saveInfo(mobile){
     fetch({
        url: "/CVS/user/save",
        //   baseUrl: "http://192.168.50.57:9888",
        baseUrl: "https://store.lianlianchains.com",
        data: {
           openid: wx.getStorageSync('user').openid,
           phoneno: mobile,
           nickname: ''
        },
        noLoading: true,
        method: "POST",
          header: { 'content-type': 'application/x-www-form-urlencoded' }
      //   header: { 'content-type': 'application/json' }
     }).then(result => {
        wx.showToast({
           title: '登录成功',
           duration: 1500
        })

        var timer = setTimeout(() => {
           wx.switchTab({
              url: '../user/user'
           })
           clearTimeout(timer);
        }, 1500)
     }).catch(err => {
        console.log("出错了")
        console.log(err)
     });
  },
  formSubmit(e){
      console.log(e)
      fetch({
          url: "/sms/verify",
        //   baseUrl: "http://192.168.50.57:9888",
          baseUrl: "https://store.lianlianchains.com",
          data: {
              mobile: e.detail.value.phoneno,
              code: e.detail.value.pwd,
              storeid: wx.getStorageSync('storeId')
          },
          noLoading: true,
          method: "GET",
          header: { 'content-type': 'application/x-www-form-urlencoded' }
          // header: { 'content-type': 'application/json' }
      }).then(result => {
          if (result.code == 200) {
             this.saveInfo(e.detail.value.phoneno)
          }else{
             wx.showToast({
                title: '验证码错误',
                duration: 1500
             })
          }
      }).catch(err => {
          console.log("出错了")
          console.log(err)
          
      });
  },
  bindPhoneTap(e){
    this.setData({
        phoneno: e.detail.value
    })
    if (e.detail.value.length != 11){
        this.setData({
            isPhone: true
        });
    }else{
        this.setData({
            isPhone: false
        });
    }
    if (this.data.isPhone || this.data.isPwd || this.data.phoneno == '' || this.data.pwd == '') {
        this.setData({
            disabled: true
        });
    } 
    if (!this.data.isPhone && !this.data.isPwd && this.data.phoneno != '' && this.data.pwd != '')  {
        this.setData({
            disabled: false
        });
    }
  },
  bindPwdTap(e){
      this.setData({
          pwd: e.detail.value
      })
      if (e.detail.value.length == 0) {
          this.setData({
              isPwd: true
          });
      } else {
          this.setData({
              isPwd: false
          });
      }
      if (this.data.isPhone || this.data.isPwd) {
          this.setData({
              disabled: true
          });
      }
      if (this.data.isPhone == false && this.data.isPwd == false && this.data.phoneno != '' && this.data.pwd != '') {
          this.setData({
              disabled: false
          });
      }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      
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
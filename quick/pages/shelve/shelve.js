// pages/provide/provide.js
import { uploadImage } from '../../utils/uploadImg.js'
import { sendmsg } from '../../utils/sendmsg.js'
import { verifymsg } from '../../utils/verifymsg.js'
import fetch from '../../utils/fetch.js'
var onoff = true

Page({

  /**
   * 页面的初始数据
   */
  data: {
    codestate: "发送",
    codeflag: true,
    buttonActive: false,
    timerOnoff: true,
    apiflag: 0
  },
  setComname(e) {
    this.setData({
      comname: e.detail.value
    })
  },
  setComnum(e) {
    this.setData({
      comnum: e.detail.value
    })
  },
  setFeeinfo(e) {
    this.setData({
      feeinfo: e.detail.value
    })
  },
  setAddress(e) {
    this.setData({
      Address: e.detail.value
    })
  },
  setClassify(e) {
    this.setData({
      Classify: e.detail.value
    })
  },
  setPerson(e) {
    this.setData({
      Person: e.detail.value
    })
  },
  getmobile(e) {
    this.setData({
      mobile: e.detail.value
    })
  },
  setCheck(e) {
    this.setData({
      Check: e.detail.value
    })
  },
  sendmsg(e) {

    var mobile = this.data.mobile;
    var codeflag = this.data.codeflag;
    this.setData({
      mobile: mobile
    })

    if (mobile != "" && codeflag) {
      this.setData({
        codeflag: false
      })
      var currentTime = 60
      var interval = setInterval(() => {
        currentTime--;
        this.setData({
          codestate: '(' + currentTime + ')s'
        })

        if (currentTime == 0) {
          clearInterval(interval)

          this.setData({
            'codestate': '发送',
            codeflag: true
          })
        }
      }, 1000)
    }

    if (mobile != "" && codeflag) {
      sendmsg(mobile).then((result) => {

        if (result.code != 200) {
          console.log(result)
          wx.showToast({
            title: '请输入正确号码'
          })
        } else {

        }
      })
    }

  },
  imageView(e) {

    this.data.apishow = false

    let idx = e.target.dataset.idx;
    uploadImage().then(res => {
    

      let path = res.tempFilePaths[0];
      if (idx === "previewImg1") {
        this.setData({
          previewImg1: path
        })

        wx.uploadFile({
          // url: 'http://192.168.50.115:8123/upload', //仅为示例，非真实的接口地址
          url: 'https://store.lianlianchains.com/CVS/upload', 
          filePath: path,
          name: 'test',
          formData: {
            'openid': wx.getStorageSync('user').openid
          },
          success: (res) => {
            var data = res.data
            //do something
            console.log(data)
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
  // buttonActive() {
  //   var Address = this.data.Address;
  //   return Address
  // },
  formSubmit(e) {

    var address = this.data.Address
    var comname = this.data.comname
    var comnum = this.data.comnum
    var feeinfo = this.data.feeinfo
    var name = this.data.Person
    var mobile = this.data.mobile
    var code = this.data.Check
    var img1 = this.data.image1
    var img2 = this.data.image2
    var img3 = this.data.image3

    // 手机验证码验证
    // verifymsg(mobile, code).then((result) => {

    // if (result.code != 200) {
    //   wx.showToast({
    //     title: '验证码错误'
    //   })
    // } else {
    // 场地申请接口
    fetch({
      url: (this.data.apiflag == 0) ? "/CVS/apply/field/insert" : "/CVS/apply/field/update",
      //   baseUrl: "http://192.168.50.57:9888", 
      baseUrl: "https://store.lianlianchains.com",
      data: {
        openid: wx.getStorageSync('user').openid,
        name: name,
        phone: mobile,
        address: address,
        comname: comname,
        comnum: comnum,
        fee: feeinfo,
        img1: img1,
        img2: img2,
        img3: img3
      },
      noLoading: false,
      method: "GET",
      header: { 'content-type': 'application/x-www-form-urlencoded' }
      //  header: { 'content-type': 'application/json' }
    }).then(result => {
      console.log(result)
      if (result.ec == '000000') {
        wx.navigateBack({
          url: '../apply/apply',
        })
      } else {
        console.log("出错了")
        wx.showToast({
          title: '网络繁忙'
        })
      }
    }).catch(err => {

      console.log("出错了")
      wx.showToast({
        title: '网络繁忙'
      })
      console.log(err)
    })
    // }
    // })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    // 场地申请接口
    fetch({
      url: "/CVS/apply/field/query",
      //   baseUrl: "http://192.168.50.57:9888", 
      baseUrl: "https://store.lianlianchains.com",
      data: {
        openid: wx.getStorageSync('user').openid
      },
      noLoading: false,
      method: "GET",
      header: { 'content-type': 'application/x-www-form-urlencoded' }
      //  header: { 'content-type': 'application/json' }
    }).then(result => {

      console.log(result)
      if (result != "") {
        this.data.apiflag = 1

        this.setData({
          Person: result.name,
          mobile: result.phone,
          Address: result.address,
          comname: result.comname,
          comnum: result.comnum,
          feeinfo: result.fee,
          image1: result.img1,
          image2: result.img2,
          image3: result.img3
        })

        var url = 'https://store.lianlianchains.com/images/'

        this.setData({
          previewImg1: url + result.img1,
          previewImg2: url + result.img2,
          previewImg3: url + result.img3
        })

      } else {

        this.setData({
          previewImg1: "../../image/upload.png",
          previewImg2: "../../image/upload.png",
          previewImg3: "../../image/upload.png"
        })
      }

    }).catch(err => {

      console.log("出错了")
      wx.showToast({
        title: '网络繁忙'
      })
      console.log(err)
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
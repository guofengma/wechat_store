// pages/storedetail/storedetail.js
import fetch from '../../utils/fetch';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    fieldflag: true,
    dealflag: false,
    supplyflag: false,
    fieldimg: '../../image/officeAct.png',
    dealimg: '../../image/manager.png',
    supplyimg: '../../image/truck.png'
  },
  queryfield(user) {

    // 场地申请接口
    fetch({
      url: "/CVS/apply/field/query",
      //   baseUrl: "http://192.168.50.57:9888", 
      baseUrl: "https://store.lianlianchains.com",
      data: {
        openid: user
      },
      noLoading: false,
      method: "GET",
      header: { 'content-type': 'application/x-www-form-urlencoded' }
      //  header: { 'content-type': 'application/json' }
    }).then(result => {

      console.log(result)

      if (result != "") {

        this.setData({
          fieldperson: result.name,
          fieldmobile: result.phone,
          fieldaddress: result.address,
          fieldcomname: result.comname,
          fieldcomnum: result.comnum,
          fieldfee: result.fee,
          fieldpreviewImg1: 'https://store.lianlianchains.com/images/' + result.img1,
          fieldpreviewImg2: 'https://store.lianlianchains.com/images/' + result.img2,
          fieldpreviewImg3: 'https://store.lianlianchains.com/images/' + result.img3
        })

        this.data.field = true

        this.itemshow(0)

      } else {

        this.data.field = false
      }

    }).catch(err => {

      console.log("出错了")
      wx.showToast({
        title: '网络繁忙'
      })
      console.log(err)
    })

  },
  querydeal(user) {

    // 场地申请接口
    fetch({
      url: "/CVS/apply/deal/query",
      //   baseUrl: "http://192.168.50.57:9888", 
      baseUrl: "https://store.lianlianchains.com",
      data: {
        openid: user
      },
      noLoading: false,
      method: "GET",
      header: { 'content-type': 'application/x-www-form-urlencoded' }
      //  header: { 'content-type': 'application/json' }
    }).then(result => {

      console.log(result)

      if (result != "") {

        this.setData({
          dealperson: result.name,
          dealmobile: result.phone,
          dealaddress: result.address,
          dealpreviewImg1: 'https://store.lianlianchains.com/images/' + result.img1,
          dealpreviewImg2: 'https://store.lianlianchains.com/images/' + result.img2
        })

        this.data.deal = true

      } else {

        this.data.deal = false
      }

    }).catch(err => {

      console.log("出错了")
      wx.showToast({
        title: '网络繁忙'
      })
      console.log(err)
    })

  },
  querysupply(user) {

    // 场地申请接口
    fetch({
      url: "/CVS/apply/supply/query",
      //   baseUrl: "http://192.168.50.57:9888", 
      baseUrl: "https://store.lianlianchains.com",
      data: {
        openid: user
      },
      noLoading: false,
      method: "GET",
      header: { 'content-type': 'application/x-www-form-urlencoded' }
      //  header: { 'content-type': 'application/json' }
    }).then(result => {

      console.log(result)

      if (result != "") {

        this.setData({
          supplyperson: result.name,
          supplymobile: result.phone,
          supplyaddress: result.address,
          supplyclassify: result.goodtype,
          supplypreviewImg1: 'https://store.lianlianchains.com/images/' + result.img1,
          supplypreviewImg2: 'https://store.lianlianchains.com/images/' + result.img2
        })

        this.data.supply = true

      } else {

        this.data.deal = false
      }

    }).catch(err => {

      console.log("出错了")
      wx.showToast({
        title: '网络繁忙'
      })
      console.log(err)
    })

  },  
  tapitem(e){

    var idx = e.target.dataset.idx
    this.itemshow(idx)
  },
  itemshow(idx) {

    console.log(idx)
    console.log(this.data.field)
    
    
    this.setData({
      fieldimg: (idx == 0) ? '../../image/officeAct.png' : '../../image/office.png',
      dealimg: (idx == 1) ? '../../image/managerAct.png' : '../../image/manager.png',
      supplyimg: (idx == 2) ? '../../image/truckAct.png' : '../../image/truck.png'
    })
    this.setData({
      fieldflag: (idx == 0 && this.data.field) ? true : false,
      dealflag: (idx == 1 && this.data.deal) ? true : false,
      supplyflag: (idx == 2 && this.data.supply) ? true : false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    console.log(options)

    var field = options.field
    var deal = options.deal
    var supply = options.supply

    this.queryfield(field)
    this.querydeal(deal)
    this.querysupply(supply)

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
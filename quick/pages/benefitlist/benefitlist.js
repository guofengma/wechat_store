// pages/benefitlist/benefitlist.js
import fetch from '../../utils/fetch';

let storeList = []
let page = 0
let totalpage = 0

Page({

  /**
   * 页面的初始数据
   */
  data: {
    storeList: [],
    noorder: false
  },
  querystorelist() {

    wx.showLoading({
      title: '加载中',
    })

    fetch({
      url: "/CVS/querywithuser",
      //   baseUrl: "http://192.168.50.57:9888",
      baseUrl: "https://store.lianlianchains.com",
      data: {
        'page': page,
        'pagenum': 5,
        'openid': wx.getStorageSync("user").openid
      },
      method: "GET",
      noLoading: true,
      header: { 'content-type': 'application/x-www-form-urlencoded' }
    }).then(res => {

      console.log(res)

      if (res != '') {
        setTimeout(() => {

          totalpage = res.data.totalpage
          this.setData({
            storeList: this.data.storeList.concat(res.data.withDrawDay)
          })

        }, 500);
      } else {
        this.setData({
          noorder: true
        })
      }

      setTimeout(function () {
        wx.hideLoading()
      }, 500)

    }).catch(err => {

      wx.showToast({
        title: '出错了',
      })
      console.log(err)

    })
  },
  loadMore() {

    console.log(totalpage)
    console.log(page)

    if (page >= totalpage - 1) {

      console.log("没有更多")
      page = totalpage

      this.setData({
        noorder: true
      })

    } else {

      console.log("加载更多")
      page++

      this.querystorelist()
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    storeList = []
    page = 0
    totalpage = 0

    this.querystorelist()
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

    storeList = []
    page = 0
    totalpage = 0
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
    this.loadMore()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
// pages/search/search.js
import fetch from '../../utils/fetch.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    storename: "",
  },
  input(e) {
    this.setData({
      storename: e.detail.value
    });

    
  },
  reset() {
    this.setData({
      storename: "",
      list: []
    });
  },
  select(e) {
    console.log(e.target.dataset.lat, e.target.dataset.lng)
    var lat = e.target.dataset.lat;
    var lng = e.target.dataset.lng;
    wx.redirectTo({
      url: '../grab/grab?lat=' + lat + "&lng=" + lng,
    })
  },
  search() {
    if(!!this.data.storename) {
      fetch({
        url: "/CVS/queryallname",
        // baseUrl: "http://192.168.50.239:9888",
        baseUrl: "https://store.lianlianchains.com",
        data: {
          StoreName: this.data.storename,
        },
        method: "POST",
        noLoading: true,
        header: { 'content-type': 'application/x-www-form-urlencoded' }
      }).then(res => {

        console.log(res)

        this.setData({
          list: res.data
        })

      }).catch(err => {

      });
    }else{
      this.setData({
        list: []
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },
})
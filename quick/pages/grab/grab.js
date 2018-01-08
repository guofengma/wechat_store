// pages/grab/grab.js
var latitudes = '';
var longitudes = '';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    windowHeight:"",
    city: [
      { name: "北京" },
      { name: "上海" },
      { name: "武汉" },
      { name: "成都" },
      { name: "杭州" },
      { name: "广州" },
      { name: "深圳" },
    ],
    open: false,
    selectCity: "城市",
    markers: [{
      iconPath: "../../image/mapStore.png",
      id: 0,
      latitude: latitudes,
      longitude: longitudes,
      width: 28,
      height: 34
    }],
    

  },
  city() {
    this.setData({
      open: !this.data.open
    })
  },
  chooseCity(e) {
    this.setData({
      selectCity: e.target.dataset.cityname,
      open: !this.data.open
    });

    // this.mapCtx.translateMarker({
    //   markerId: 0,
    //   autoRotate: true,
    //   duration: 1000,
    //   destination: {
    //     latitude: 23.10229,
    //     longitude: 113.3345211,
    //   },
    //   animationEnd() {
    //     console.log('animation end')
    //   }
    // })

    // this.mapCtx.getCenterLocation({
    //   success: (res) => {
    //     console.log(res.longitude)
    //     console.log(res.latitude)

    //     this.mapCtx.includePoints({
    //       padding: [10],
    //       points: [{
    //         latitude: 23.10229,
    //         longitude: 113.3345211,
    //       }, {
    //         latitude: 23.00229,
    //         longitude: 113.3345211,
    //       }]
    //     })
    //   }
    // })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 使用 wx.createMapContext 获取 map 上下文
    this.mapCtx = wx.createMapContext('myMap');
    wx.getSystemInfo({
      success:  (res) => {
        // console.log(res.model)
        // console.log(res.pixelRatio)
        // console.log(res.windowWidth)
        // console.log(res.windowHeight)
        // console.log(res.language)
        // console.log(res.version)

        this.setData({
          windowHeight: res.windowHeight
        })
      }
    })
    wx.getLocation({
      type: 'gcj02',
      altitude:true,
      success: (res) => {
        var latitude = res.latitude;
        var longitude = res.longitude;
        var speed = res.speed;
        var accuracy = res.accuracy;

        latitudes = latitude;
        longitudes = longitude;

        this.setData({
          latitude: latitude,
          longitude:longitude,
          markers: [{
            iconPath: "../../image/mapStore.png",
            id: 0,
            latitude: latitude,
            longitude: longitude,
            width: 28,
            height: 34
          }]
        })
      }
    })
    // wx.getLocation({
    //   type: 'gcj02', //返回可以用于wx.openLocation的经纬度  
    //   success: function (res) {
    //     var latitude = res.latitude
    //     var longitude = res.longitude
    //     wx.openLocation({
    //       latitude: latitude,
    //       longitude: longitude,
    //       name: "东亚银行",
    //       scale: 28
    //     })
    //   }
    // })  
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
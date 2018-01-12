// pages/grab/grab.js
import fetch from '../../utils/fetch.js'
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
    markers: [],
    mapShow: true,
    show: false
  },
  getShelves(lng, lat) {
    fetch({
      url: "/CVS/querybypos",
      //  baseUrl: "http://192.168.50.239:9888", 
      baseUrl: "https://store.lianlianchains.com",
      data: {
        lng: lng,
        lat: lat
      },
      noLoading: true,
      method: "GET",
      header: { 'content-type': 'application/x-www-form-urlencoded' }
      //  header: { 'content-type': 'application/json' }
    }).then(res => {

      console.log(res);


      var data = this._normallizeData(res.data);
      console.log(data)
      this.setData({
        markers: data,
        show: true
      });

      


    }).catch(err => {
      console.log("出错了")
      wx.showToast({
        title: '网络繁忙'
      })
      console.log(err)
    });
  },
  regionChange(e) {
    if(e.type === "end") {
      this.mapCtx.getCenterLocation({
        success: (res) => {
          console.log(res.longitude)
          console.log(res.latitude)

          var lng = res.longitude - 0;
          var lat = res.latitude - 0;

          this.getShelves(lng, lat);
        }
      });
    }
  },
  markertap(e) {
    console.log(e);
    let item = this.data.markers.filter((item, index) => {
      return item.id == e.markerId
    });
    wx.navigateTo({
      url: '../receiveOrder/receiveOrder?item=' + JSON.stringify(item)
    })
  },
  mapChange(e) {
    console.log(e)
  },
  shelveOrderList() {
    wx.navigateTo({
      url: '../shelveOrderList/shelveOrderList',
    })
  },
  searchView() {
    wx.navigateTo({
      url: '../search/search',
    })
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

    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
    });
    if(options.lat && options.lng) {
      this.setData({
        longitude: options.lng,
        latitude: options.lat
      });

      this.getShelves(options.lng - 0, options.lat - 0);

      return
    }
    
    wx.getLocation({
      type: 'gcj02',
      altitude: true,
      success: (res) => {
        var latitude = res.latitude;
        var longitude = res.longitude;
        var speed = res.speed;
        var accuracy = res.accuracy;

        latitudes = latitude - 0;
        longitudes = longitude - 0;

        this.setData({
          longitude: longitudes,
          latitude: latitudes
        })

        console.log(longitudes, latitudes);
        this.getShelves(longitudes, latitudes);


      }
    }); 
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

  },
  _normallizeData(data) {
    let arr = [];
    let obj = {};
    for(let item of data) {
      obj.id = item.storeId;
      obj.latitude = item.lat - 0;
      obj.longitude = item.lng - 0;
      obj.width = 28;
      obj.height = 34;
      obj.iconPath = "../../image/mapStore.png";
      obj.storeName = item.storeName;
      obj.address = item.address;
      
      arr.push(obj);
    }

    return arr;
  }
})
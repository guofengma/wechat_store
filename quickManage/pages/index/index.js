// pages/user/user.js
import fetch from '../../utils/fetch.js';

var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  getLngAndLat() {
    wx.getLocation({
      type: 'gcj02',
      altitude: true,
      success: (res) => {
        var latitude = res.latitude;
        var longitude = res.longitude;
        var speed = res.speed;
        var accuracy = res.accuracy;


        fetch({
          url: "/CVS/address",
          //   baseUrl: "http://192.168.50.57:9888",
          baseUrl: "https://store.lianlianchains.com",
          data: {
            StoreId: wx.getStorageSync('storeid'),
            lat: latitude,
            lng: longitude
          },
          method: "POST",
          noLoading: true,
          header: { 'content-type': 'application/x-www-form-urlencoded' }
        }).then(res => {
          if (res.ec == "000000") {
            wx.showModal({
              content: '位置已更新',
            })
          }else{
            wx.showModal({
              content: '位置更新失败',
            })
          }
            
        }).catch(err => {
          console.log("出错了")
          wx.showToast({
            title: '出错了',
          })
          console.log(err)
        });


      }
    }); 
  },
  getLocation() {
    wx.getSetting({
      success:(res) => {
        if (!res.authSetting['scope.userLocation']) {
          wx.showModal({
            title: '',
            content: '快点Boss申请获得使用你的地理位置权限',
            success: (res) =>{
              if (res.confirm) {
                wx.openSetting({
                  success: (res) => {
                    
                  }
                })
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        }else{
          this.getLngAndLat();
        }
      }
    })
    
  },
  totalStaticView() {
    wx.redirectTo({
      url: '../totalStatic/totalStatic',
    })
  },
  scanCode() {
    wx.scanCode({
      success: (res) => {
        console.log(res);
        wx.setStorageSync('code', res.result)
        console.log(wx.getStorageSync('code'))
        this.infoView();
      }
    })
  },
  skuView() {
    wx.navigateTo({
      url: '../sku/sku'
    })
  },
  acountView() {
    wx.navigateTo({
      url: '../acount/acount'
    })
  },
  infoView() {
    wx.navigateTo({
      url: '../info/info'
    })
  },
  rangeView() {
    wx.navigateTo({
      url: '../range/range'
    })
  },
  reportView() {
    wx.navigateTo({
      url: '../inventory/inventory'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    
    this.setData({
      storename: wx.getStorageSync('storename')
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
    wx.getLocation({
      type: 'gcj02',
      altitude: true,
      success: (res) => {

      }
    }); 
    if (wx.getStorageSync('role') != 'boss') {
      this.setData({
        boss: false
      })
    } else {
      this.setData({
        boss: true
      })
    }
  }
})
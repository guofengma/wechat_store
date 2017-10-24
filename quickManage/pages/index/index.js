// pages/user/user.js
import fetch from '../../utils/fetch.js';

var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {

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

    }
})
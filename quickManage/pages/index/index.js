// pages/user/user.js
import fetch from '../../utils/fetch.js';

var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {

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
    infoView() {
        wx.navigateTo({
            url: '../info/info'
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

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
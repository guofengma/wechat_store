// pages/shelve/shelve.js
import { uploadImage } from '../../utils/uploadImg.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageDefault: "../../image/upload.png",
  },
  imageView(e) {
    console.log(e.target.dataset.idx)
    console.log("好", this)
    let idx = e.target.dataset.idx;
    uploadImage().then(res => {
      console.log(res)
      let path = res.tempFilePaths[0];
      if (idx === "previewImg1") {
        this.setData({
          previewImg1: path
        })
        wx.uploadFile({
          // url: 'http://192.168.50.115:8123/upload', //仅为示例，非真实的接口地址
          url: 'https://store.lianlianchains.com/exchange/upload', //仅为示例，非真实的接口地址
          filePath: path,
          name: 'test',
          formData: {
            'openid': wx.getStorageSync('user').openid
          },
          success: (res) => {
            var data = res.data
            //do something
            console.log("data",data);
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
          url: 'https://store.lianlianchains.com/exchange/upload', //仅为示例，非真实的接口地址
          filePath: path,
          name: 'test',
          formData: {
            'openid': wx.getStorageSync('user').openid
          },
          success: (res) => {
            var data = res.data
            //do something
            console.log(data);
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
          url: 'https://store.lianlianchains.com/exchange/upload', //仅为示例，非真实的接口地址
          filePath: path,
          name: 'test',
          formData: {
            'openid': wx.getStorageSync('user').openid
          },
          success: (res) => {
            var data = res.data
            //do something
            console.log(data);
            this.setData({
              image2: data
            })
          }
        })
      }
    })
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
// pages/detail/detail.js
import fetch from '../../utils/fetch'
import { formattime} from '../../utils/filter'
Page({

   /**
    * 页面的初始数据
    */
   data: {
      details: {}
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
      //查询订单状态是否已扫描过
      fetch({
         url: "/wxpay/queryOrderByNo",
         // baseUrl: "http://192.168.50.57:9888",
         baseUrl: "https://store.lianlianchains.com",
         data: {
            // orderNo: "wcjfgf5leteyrgciqoiiaaxcm5xsk6hw"
            orderNo: wx.getStorageSync('orderNo')
         },
         noLoading: true,
         method: "GET",
         header: { 'content-type': 'application/x-www-form-urlencoded' }
         // header: { 'content-type': 'application/json' }
      }).then(result => {
         result.time = formattime(result.time)
         this.setData({
            detail: result
         })
      }).catch(err => {

      })
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

   }
})
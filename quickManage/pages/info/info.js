// pages/info/info.js
import fetch from '../../utils/fetch'
Page({

  /**
   * 页面的初始数据
   */
  data: {
      disabled: true,
      barCode: "690112130029a",
      info: false,
      spec: false,
      name:'',
      specifi: '',
      stock: '',
      price: ''
  },
  nameHandle(e){
     this.setData({
        name: e.detail.value
     })
      if (e.detail.value){
         if (this.data.name && this.data.specifi && this.data.stock && this.data.price) {
            this.setData({
               disabled: false
            })
         }
      }else{
         this.setData({
            disabled:true
         })
      }
  },
  specHandle(e) {
     this.setData({
        specifi: e.detail.value
     })
     if (e.detail.value) {
        if (this.data.name && this.data.specifi && this.data.stock && this.data.price) {
           this.setData({
              disabled: false
           })
        }
     } else {
        this.setData({
           disabled: true
        })
     }
  },
  stockHandle(e) {
     this.setData({
        stock: e.detail.value
     })
     if (e.detail.value) {
        if (this.data.name && this.data.specifi && this.data.stock && this.data.price) {
           this.setData({
              disabled: false
           })
        }
     } else {
        this.setData({
           disabled: true
        })
     }
  },
  priceHandle(e) {
     this.setData({
        price: e.detail.value
     })
     if (e.detail.value) {
        if (this.data.name && this.data.specifi && this.data.stock && this.data.price) {
           this.setData({
              disabled: false
           })
        }
     } else {
        this.setData({
           disabled: true
        })
     }
  },
  //保存
  save(e){
     console.log(e)
     let code = e.detail.value.code;
     let name = e.detail.value.name;
     let specifi = e.detail.value.specifi;
     let amount = e.detail.value.amount;
     let price = e.detail.value.price;
     fetch({
        url: "/CVS/goodcontrol",
      //   baseUrl: "http://192.168.50.57:9888",
        baseUrl: "https://store.lianlianchains.com",
        data: {
           // code: res.code
           code: wx.getStorageSync('code'),
           storeid: wx.getStorageSync('storeid'),
           name: name,
           specifi: specifi,
           amount: amount,
           price: price

        },
        noLoading: true,
        method: "GET",
        header: { 'content-type': 'application/x-www-form-urlencoded' }
        // header: { 'content-type': 'application/json' }
     }).then(result => {
        console.log(111)
        console.log(result)
        if (result){
         wx.switchTab({
            url: '../index/index',
         })
        }

     }).catch(err => {
        console.log("出错了")
        console.log(err)
     });
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
     this.setData({
        barCode: wx.getStorageSync('code')
     })
     
     //查库
     fetch({
        url: "/CVS/good/querybyCode",
        // baseUrl: "http://192.168.50.57:9888",
        baseUrl: "https://store.lianlianchains.com",
        data: {
         //   code: '9787121273520',
           code: wx.getStorageSync('code'),
           storeid: wx.getStorageSync('storeid')
        },
        noLoading: true,
        method: "GET",
        header: { 'content-type': 'application/x-www-form-urlencoded' }
        // header: { 'content-type': 'application/json' }
     }).then(result => {
        console.log(result)
        if (result){
            console.log(result)
            this.setData({
               code: result.code,
               name: result.name,
               specifi: result.specifi,
               stock: result.amount,
               price: result.price,
               info: true,
               spec: true,
               disabled: false
            })
        }else{
           this.setData({
              info: false,
              spec: false,
              disabled:true
           })
        }

     }).catch(err => {
        console.log("出错了")
        console.log(err)
     });
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
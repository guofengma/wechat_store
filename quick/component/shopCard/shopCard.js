import fetch from '../../utils/fetch.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [
      {
        cardUrl: "../../image/10.png",
        price: 10,
        active: true
      },
      {
        cardUrl: "../../image/200.png",
        price: 200,
        active: false
      },
      {
        cardUrl: "../../image/300.png",
        price: 300,
        active: false
      }
    ],
    img:[
      {
        increaseBlue: "../../image/increaseBlue.png",
        reduceBlue: "../../image/reduceBlue.png"
      },
      {
        increaseGray: "../../image/increaseGray.png",
        reduceGray: "../../image/reduceGray.png"
      }
    ],
    amount: 1,
    idx: 0,
    price: 10,
    total: 0
  },
  buy() {
    console.log(this.data.amount * this.data.price)
  },
  increase() {
    this.data.amount++;
    this.setData({
      amount: this.data.amount
    })
  },
  reduce() {
    if (this.data.amount <= 1) {
      this.data.amount = 1
    }else{
      this.data.amount--;
    }
    
    this.setData({
      amount: this.data.amount
    })
  },
  chooseCard(e) {
    let idx = e.currentTarget.dataset.index;
    this.data.list.forEach((item, index) => {
      if(index == idx) {
        item.active = true
      }else{
        item.active = false
      }
    });

    this.setData({
      list: this.data.list,
      idx: idx,
      amount: 1,
      price: this.data.list[idx].price
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
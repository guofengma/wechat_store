// pages/cart/cart.js
import fetch from '../../utils/fetch'
var list = [{
    price:10,
    amount: 1
},
{
    price: 10,
    amount: 2
},
{
    price: 20,
    amount: 1
}]

function change(_this,types){
    for (var i = 0; i < list.length; i++){
        if(i = index){
            list[i].amount++
            _this.setData
        }
    }
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
      reduceSrc: '../../image/reduce.png',
      increaseSrc: '../../image/increase.png',
      cartList:[
          
      ],
      total:0,
      moveLeft:false,
      hidden:true,
      totalAmount:0
  },
  moveLeft(){
    this.setData({
        moveLeft: true
    })
  },
  homeView(){
     wx.switchTab({
        url: '../index/index',
     })
  },
  checkCart(){
     fetch({
        url: "/CVS/cart/querycart",
        //   baseUrl: "http://192.168.50.57:9888", 
        baseUrl: "https://store.lianlianchains.com",
        data: {
           openid: wx.getStorageSync('user').openid,
           storeid: wx.getStorageSync('storeId')
        },
        noLoading: true,
        method: "GET",
        //   header: { 'content-type': 'application/x-www-form-urlencoded' }
        header: { 'content-type': 'application/json' }
     }).then(carts => {
        console.log("购物车查询成功，输出回调：")
        console.log(carts)

        this.setData({
           cartList: carts
        })
        if (!carts.length) {
           console.log('没有货了')
           wx.switchTab({
              url: '../index/index',
           })
           //  this.setData({
           //     hidden: false
           //  })
        } else {
           if (this.data.hidden == false) {
              this.setData({
                 hidden: true
              })
           }
        }
        for (var i = 0; i < this.data.cartList.length; i++) {
           this.data.total += this.data.cartList[i].price * this.data.cartList[i].amount;
           this.data.totalAmount += this.data.cartList[i].amount
        }
        this.data.total = this.data.total.toFixed(2)
        this.setData({
           total: this.data.total
        })
     }).catch(err => {
        console.log("出错了")

        console.log(err)
     });
  },
  bindDeleteTap(e){
      console.log(e.target.dataset.code)
      var that = this;
     wx.showModal({
        title: '提示',
        content: '您确定要删除该商品吗',
        cancelColor:'#999999',
        confirmColor:'#0D8FEF',
        success: function (res) {
           if (res.confirm) {
              console.log('用户点击确定')
              fetch({
                 url: "/CVS/cart/delete",
                 //   baseUrl: "http://192.168.50.57:9888",
                 baseUrl: "https://store.lianlianchains.com",
                 data: {
                    openid: wx.getStorageSync('user').openid,
                    code: e.target.dataset.code,
                    storeid: wx.getStorageSync('storeId')
                    //   code: wx.getStorageSync('code')
                 },
                 noLoading: true,
                 method: "GET",
                 //   header: { 'content-type': 'application/x-www-form-urlencoded' }
                 header: { 'content-type': 'application/json' }
              }).then(result => {
                 that.checkCart()
                 that.setData({
                    total: (that.data.total - e.target.dataset.price * e.target.dataset.amount).toFixed(2)
                 })
              })
           } else if (res.cancel) {
              console.log('用户点击取消')
           }
        }
     })
  },
  bindReduceTap(e){
     console.log(this.data.totalAmount)
      var param = {};
      var index = e.target.dataset.index;
      if (this.data.cartList[index].amount > 1){
          this.data.cartList[index].amount--;
          this.data.totalAmount--;
          this.setData({
             totalAmount: this.data.totalAmount
          })
      }
      this.data.total = 0;
      for (var i = 0; i < this.data.cartList.length; i++) {
          this.data.total += this.data.cartList[i].price * this.data.cartList[i].amount
      }
      fetch({
         url: "/CVS/cart/edit",
         //   baseUrl: "http://192.168.50.57:9888",
         baseUrl: "https://store.lianlianchains.com",
         data: {
            openid: wx.getStorageSync('user').openid,
            amount: this.data.cartList[index].amount,
            code: e.target.dataset.code,
            //   code: "6901121300298",
            storeid: wx.getStorageSync('storeId')
         },
         noLoading: true,
         method: "POST",
         header: { 'content-type': 'application/x-www-form-urlencoded' }
         //   header: { 'content-type': 'application/json' }
      }).then(carts => {
         
      })
      this.data.total = this.data.total.toFixed(2)
      this.setData({
          cartList: this.data.cartList,
          total: this.data.total
      });
  },
  bindIncreaseTap(e){
     console.log(this.data.totalAmount)
    var param = {};
    var index = e.target.dataset.index;
    if (this.data.totalAmount < 3){
       this.data.totalAmount++;
       this.setData({
          totalAmount: this.data.totalAmount
       })
       this.data.cartList[index].amount++;
    }else{
       
       this.setData({
          totalAmount: this.data.totalAmount
       })
       wx.showToast({
          title: '购物车已达上限',
          duration:1500
       })
       return
    }
    
    this.data.total = 0;
    for (var i = 0; i < this.data.cartList.length; i++) {
        this.data.total += this.data.cartList[i].price * this.data.cartList[i].amount
    }
    fetch({
       url: "/CVS/cart/edit",
       //   baseUrl: "http://192.168.50.57:9888",
       baseUrl: "https://store.lianlianchains.com",
       data: {
          openid: wx.getStorageSync('user').openid,
          amount: this.data.cartList[index].amount,
          code: e.target.dataset.code,
          //   code: "6901121300298",
          storeid: wx.getStorageSync('storeId')
       },
       noLoading: true,
       method: "POST",
       header: { 'content-type': 'application/x-www-form-urlencoded' }
       //   header: { 'content-type': 'application/json' }
    }).then(carts => {
       
    })
    this.data.total = this.data.total.toFixed(2)
    this.setData({ 
        cartList: this.data.cartList,
        total:this.data.total
    });
  },
  //下单
  order(){
     this.prepay(wx.getStorageSync('user').openid, this.data.total)
  },
  prepay(openId, payMoney) {
      console.log("支付钱数：" + payMoney);
      var that = this;
      fetch({
          url: "/wxpay/prepay",
         //  baseUrl: "http://192.168.50.57:9888",
          baseUrl: "https://store.lianlianchains.com",
          data: {
              'openid': openId,
              'fee': payMoney,
              'description': "快点支付",
              'usedScore': 0,
              'mch_id': wx.getStorageSync('storeId'),
              storeid: wx.getStorageSync('storeId')
          },
          method: "POST",
          header: { 'content-type': 'application/x-www-form-urlencoded' }
      }).then(result => {
          console.log(result);
          if(result.returncode){
            wx.showToast({
               title: result.returnmsg,
            })
            return
          }
          var prepay_id = result.prepay_id;
          wx.setStorageSync('orderNo', result.orderNo)
          console.log("统一下单返回 prepay_id:" + prepay_id);
          that.sign(prepay_id, payMoney);
      }).catch(err => {

      });
  },
  //签名
  sign(prepay_id, payMoney) {
      console.log("支付钱数：" + payMoney);
      var that = this;
      fetch({
          url: "/wxpay/sign",
        //   baseUrl: "http://192.168.50.57:9888",
          baseUrl: "https://store.lianlianchains.com",
          data: {
              'repay_id': prepay_id,
              storeid: wx.getStorageSync('storeId')
          },
          method: "POST",
          header: { 'content-type': 'application/x-www-form-urlencoded' }
      }).then(result => {
          that.requestPayment(result, payMoney);
      }).catch(err => {

      });
  },
  //申请支付
  requestPayment: function (obj, payMoney) {
      console.log("支付钱数：" + payMoney);
      wx.requestPayment({
          'timeStamp': obj.timeStamp,
          'nonceStr': obj.nonceStr,
          'package': obj.package,
          'signType': obj.signType,
          'paySign': obj.paySign,
          'success': function (res) {
              console.log(111);
              fetch({
                  url: "/CVS/cart/deleteall",
                //   baseUrl: "http://192.168.50.57:9888",
                    baseUrl: "https://store.lianlianchains.com",
                  data: {
                      openid: wx.getStorageSync('user').openid,
                      storeid: wx.getStorageSync('storeId')
                  },
                  noLoading: true,
                  method: "POST",
                  header: { 'content-type': 'application/x-www-form-urlencoded' }
                  //   header: { 'content-type': 'application/json' }
              }).then(carts => {
                 console.log('输出删除成功信息')
                  console.log(carts)
                  console.log("删除成功")
                  if (carts) {
                      wx.redirectTo({
                          url: '../check/check'
                      })
                  }

              }).catch(err => {
                  console.log("出错了")
                  
                  console.log(err)
              });
          },
          'fail': function (res) {
             console.log('输出失败信息：')
              console.log(res);
              console.log("支付失败")
          }
      })
  },
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
     console.log("购物车查询开始")
      fetch({
          url: "/CVS/cart/querycart",
        //   baseUrl: "http://192.168.50.57:9888", 
          baseUrl: "https://store.lianlianchains.com",
          data: {
              openid: wx.getStorageSync('user').openid,
              storeid: wx.getStorageSync('storeId')
          },
          noLoading: true,
          method: "GET",
          //   header: { 'content-type': 'application/x-www-form-urlencoded' }
          header: { 'content-type': 'application/json' }
      }).then(carts => {
         console.log("购物车查询成功，输出回调：")
         console.log(carts)
         
          this.setData({
              cartList: carts
          })
          for (var i = 0; i < this.data.cartList.length; i++) {
              this.data.total += this.data.cartList[i].price * this.data.cartList[i].amount;
              this.data.totalAmount += this.data.cartList[i].amount
          }
          this.data.total = this.data.total.toFixed(2)
          this.setData({
              total: this.data.total
          })
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
  
  },

  
})
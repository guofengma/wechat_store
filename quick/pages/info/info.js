// pages/info/info.js
import fetch from '../../utils/fetch.js'
Page({

   /**
    * 页面的初始数据
    */
   data: {
      amounts: 0,
      amount: 1, //购物车购买数量
      reduceSrc: '../../image/reduce.png',
      increaseSrc: '../../image/increase.png',
      name: "",
      guige: "100ml",
      price: 9.9, //物品单价
      total: 0,
      result: {}

   },
   bindDeleteTap() {
      //   CVS / cart / delete
      fetch({
         url: "/CVS/cart/delete",
         //   baseUrl: "http://192.168.50.57:9888",
         baseUrl: "https://store.lianlianchains.com",
         data: {
            openid: wx.getStorageSync('user').openid,
            code: wx.getStorageSync('code'),
            storeid: wx.getStorageSync('storeId')
            //   code: wx.getStorageSync('code')
         },
         noLoading: true,
         method: "GET",
         //   header: { 'content-type': 'application/x-www-form-urlencoded' }
         header: { 'content-type': 'application/json' }
      }).then(result => {
         this.ScanCode();
      })

   },
   bindIncreaseTap() {
      this.data.amounts++;
      this.setData({
         amounts: this.data.amounts,
         increaseSrc: '../../image/increaseAct.png',
         total: ((wx.getStorageSync('price') - 0) * this.data.amounts).toFixed(2)
      })
   },
   bindReduleTap() {
      if (this.data.amounts == 1) {
         return
      } else {
         this.data.amounts--
      }
      this.setData({
         amounts: this.data.amounts,
         reduceSrc: '../../image/reduceAct.png',
         total: ((wx.getStorageSync('price') - 0) * this.data.amounts).toFixed(2)
      })
   },
   Toincrease() {
      this.setData({
         increaseSrc: '../../image/increase.png'
      })
   },
   Toredule() {
      this.setData({
         reduceSrc: '../../image/reduce.png'
      })
   },
   ScanCode() {
      wx.scanCode({
         success: (res) => {
            console.log(res);
            wx.setStorageSync('code', res.result);
            //查库
            fetch({
               url: "/CVS/good/querybyCode",
               //   baseUrl: "http://192.168.50.57:9888",
               baseUrl: "https://store.lianlianchains.com",
               data: {
                  code: res.result,
                  //  code: "6901121300298",
                  storeid: wx.getStorageSync('storeId')
               },
               noLoading: true,
               method: "GET",
               //   header: { 'content-type': 'application/x-www-form-urlencoded' }
               header: { 'content-type': 'application/json' }
            }).then(result => {
               console.log(result)
               if (!result) {
                  wx.showToast({
                     title: '该商品暂未上架',
                  })
                  return
               }
               //查询购物车
               wx.setStorageSync('price', result.price);
               wx.setStorageSync('name', result.name);
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
                  console.log(carts)
                  if (carts.length) {
                     console.log(1111)
                     console.log()
                     let index = carts.findIndex((value, index, arr) => {
                        return value.code == res.code;
                     });
                     if (index >= 0) {
                        wx.setStorageSync('already', true);
                        wx.setStorageSync('index', index);
                        wx.redirectTo({
                           url: '../info/info'
                        })
                     } else {
                        wx.setStorageSync('already', false);
                        fetch({
                           url: "/CVS/cart/addtocart",
                           //   baseUrl: "http://192.168.50.57:9888",
                           baseUrl: "https://store.lianlianchains.com",
                           data: {
                              openid: wx.getStorageSync('user').openid,
                              amount: 1,
                              code: res.result,
                              //   code: "6901121300298",
                              storeid: wx.getStorageSync('storeId')
                           },
                           noLoading: true,
                           method: "POST",
                           header: { 'content-type': 'application/x-www-form-urlencoded' }
                           // header: { 'content-type': 'application/json' }
                        }).then(addCarts => {
                           wx.redirectTo({
                              url: '../info/info'
                           })
                        })
                     }
                  } else {
                     console.log(2222)
                     wx.setStorageSync('already', false);
                     fetch({
                        url: "/CVS/cart/addtocart",
                        //   baseUrl: "http://192.168.50.57:9888",
                        baseUrl: "https://store.lianlianchains.com",
                        data: {
                           openid: wx.getStorageSync('user').openid,
                           amount: 1,
                           code: res.result,
                           //  code: "6901121300298",
                           storeid: wx.getStorageSync('storeId')
                        },
                        noLoading: true,
                        method: "POST",
                        header: { 'content-type': 'application/x-www-form-urlencoded' }
                        // header: { 'content-type': 'application/json' }
                     }).then(addCarts => {
                        wx.redirectTo({
                           url: '../info/info'
                        })
                     })
                  }
               })

               console.log(wx.getStorageSync('cartArray'))
               // return

            }).catch(err => {
               // console.log("出错了")
               // wx.showToast({
               //     title: '网络繁忙'
               // })
               // console.log(err)
            });

         }
      })
   },
   //继续购物
   bindScanTap() {
      //查看购物车是否已达上限

      //如果达到上限将提示购物车已满


      //没达到上限情况下继续购物
      fetch({
         url: "/CVS/cart/edit",
         //   baseUrl: "http://192.168.50.57:9888",
         baseUrl: "https://store.lianlianchains.com",
         data: {
            openid: wx.getStorageSync('user').openid,
            amount: this.data.amounts,
            code: wx.getStorageSync('code'),
            //   code: "6901121300298",
            storeid: wx.getStorageSync('storeId')
         },
         noLoading: true,
         method: "POST",
         header: { 'content-type': 'application/x-www-form-urlencoded' }
         //   header: { 'content-type': 'application/json' }
      }).then(carts => {
         this.ScanCode();
      })

   },
   //前往购物车
   bindCartTap() {
      console.log("前往购物车前发送保存商品接口")
      fetch({
         url: "/CVS/cart/edit",
         //   baseUrl: "http://192.168.50.57:9888",
         baseUrl: "https://store.lianlianchains.com",
         data: {
            openid: wx.getStorageSync('user').openid,
            amount: this.data.amounts,
            code: wx.getStorageSync('code'),
            //   code: "6901121300298",
            storeid: wx.getStorageSync('storeId')
         },
         noLoading: true,
         method: "POST",
         header: { 'content-type': 'application/x-www-form-urlencoded' }
         //   header: { 'content-type': 'application/json' }
      }).then(carts => {
         console.log("请求成功")
         console.log("输出成功回调参数：")
         console.log(carts)
         console.log("输出结束")
         wx.navigateTo({
            url: '../cart/cart'
         })
      }).catch(err => {
         console.log("保存商品出错了")
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
      let already = wx.getStorageSync('already');
      let index = wx.getStorageSync('index');
      let name = wx.getStorageSync('name');
      this.setData({
         name: name
      })
      console.log('查询购物车开始');
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
         console.log('查询购物车成功');
         console.log(carts);
         if (already) {
            console.log('已经存在的商品');
            this.setData({
               total: (wx.getStorageSync('price') - 0) * carts[index].amount,
               amounts: carts[index].amount
            })
         } else {
            console.log('新的商品');
            this.setData({
               total: wx.getStorageSync('price') - 0,
               amounts: 1
            })
         }
      }).catch(err => {
         // console.log("出错了")
         // wx.showToast({
         //     title: '网络繁忙'
         // })
         // console.log(err)
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

   /**
    * 用户点击右上角分享
    */
   onShareAppMessage: function () {

   }
})
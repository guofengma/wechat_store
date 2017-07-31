//index.js
import fetch from "../../utils/fetch.js";
let cartArray = [];
var app = getApp();
Page({
   data: {
      store: "../../image/store.png",
      cart: "../../image/cart.png",
      useShadow: false,
      totalNum: 0,
      step: [
         {
            image: "../../image/step1.png",
            tit: '定位门店',
            info: '扫描店铺二维码'
         },
         {
            image: "../../image/step2.png",
            tit: '添加商品',
            info: '扫商品条码并支付'
         },
         {
            image: "../../image/step3.png",
            tit: '前台校验',
            info: '向前台出示订单'
         }
      ]
   },
   ReScanTap() {
      wx.navigateTo({
         url: '../store/store'
      })
   },
   cartView() {
      wx.navigateTo({
         url: '../cart/cart'
      })
   },
   ScancodeTap(){
      wx.scanCode({
         success: (res) => {
            console.log(res);
            wx.setStorageSync('code', res.result);
            var code = res.code;
            console.log("扫码成功");
            console.log("条形码：" + code)

            //查库
            fetch({
               url: "/CVS/good/querybyCode",
               // baseUrl: "http://192.168.50.57:9888",
               baseUrl: "https://store.lianlianchains.com",
               data: {
                  code: res.result,
                  //  code: "6901121300298",
                  storeid: wx.getStorageSync('storeId')
               },
               noLoading: true,
               method: "GET",
               header: { 'content-type': 'application/x-www-form-urlencoded' }
               // header: { 'content-type': 'application/json' }
            }).then(result => {
               console.log(result)
               console.log("查库成功");
               if (!result){
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
                  // baseUrl: "http://192.168.50.57:9888",
                  baseUrl: "https://store.lianlianchains.com",
                  data: {
                     openid: wx.getStorageSync('user').openid,
                     storeid: wx.getStorageSync('storeId')
                  },
                  noLoading: true,
                  method: "GET",
                  header: { 'content-type': 'application/x-www-form-urlencoded' }
                  // header: { 'content-type': 'application/json' }
               }).then(carts => {
                  console.log("输出carts:")
                  console.log(carts)
                  console.log("购物车查询成功")

                  if (carts.length) {

                     console.log("购物车不为空的情况")
                     let index = carts.findIndex((value, index, arr) => {
                        return value.code == res.result;
                     });
                     if (index >= 0) {
                        console.log("购物车不为空的情况，扫描已经存在的商品")
                        wx.setStorageSync('already', true);
                        wx.setStorageSync('index', index);
                        wx.navigateTo({
                           url: '../info/info'
                        })
                     } else {
                        console.log("购物车不为空的情况，扫描新的商品")

                        wx.setStorageSync('already', false);
                        fetch({
                           url: "/CVS/cart/addtocart",
                           // baseUrl: "http://192.168.50.57:9888",
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
                           wx.navigateTo({
                              url: '../info/info'
                           })
                        })
                     }
                  } else {
                     console.log("购物车为空的情况")
                     console.log("条形码：" + res.result)
                     wx.setStorageSync('already', false);

                     fetch({
                        url: "/CVS/cart/addtocart",
                        // baseUrl: "http://192.168.50.57:9888",
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
                        console.log("添加完毕")
                        console.log(addCarts)
                        wx.navigateTo({
                           url: '../info/info'
                        })
                     })
                  }
               }).catch(err => {
                  console.log("输出查询购物车错误：" + err)
               })

               console.log(wx.getStorageSync('cartArray'))
               // return

            }).catch(err => {
               console.log("出错了")
               wx.showToast({
                  title: '网络繁忙'
               })
               console.log(err)
            });

         }
      })
   },
   //扫码
   bindScanTap() {

      if (wx.getStorageSync('storeId')) {
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
            header: { 'content-type': 'application/x-www-form-urlencoded' }
            //  header: { 'content-type': 'application/json' }
         }).then(carts => {
            var totalNum = 0;
            for (var i = 0; i < carts.length; i++) {
               totalNum += carts[i].amount
            }
            if (totalNum >= 3) {
               wx.showToast({
                  title: '购物车已满',
               })
               return
            }
            this.ScancodeTap();
         }).catch(err => {
            console.log("出错了")
            wx.showToast({
               title: '网络繁忙'
            })
            console.log(err)
         });

         
      } else {
         wx.navigateTo({
            url: '../store/store'
         })
      }

   },
   addShadow() {
      this.setData({
         useShadow: true
      });
   },
   removeShadow() {
      this.setData({
         useShadow: false
      });
   },
   onLoad: function (options) {
      var that = this;
      console.log(options)
      console.log(wx.getStorageSync('user').openid)
      app.getUserInfo(function (userInfo) {
         //更新数据
         that.setData({
            userInfo: userInfo
         })
      })
   },
   onShow: function () {
      console.log(getApp().globalData.storeid)
      var storeId = wx.getStorageSync('storeId');
      console.log(storeId)
      console.log("获取商户ID成功")
      if (storeId) {
         this.setData({
            'storeId': storeId,
            'storeName': wx.getStorageSync('storeName')
         })
      }

   },
   /**
  * 用户点击右上角分享
  */
   onShareAppMessage: function () {

   }
})

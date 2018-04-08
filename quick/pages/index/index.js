//index.js
import fetch from "../../utils/fetch.js";
import { mapStoreName } from '../../utils/filter'
let cartArray = [];
var app = getApp();

import {recharge, query, transfer} from '../../utils/score'
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
   searchView() {
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
         if (totalNum >= 5) {
           wx.showToast({
             title: '购物车已满',
           })
           return
         }
         wx.navigateTo({
           url: '../../component/product/product',
         })
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
   saveUnion(){
     fetch({
       url: "/wx/account",
        //  baseUrl: "http://192.168.50.239:9888", 
       baseUrl: "https://store.lianlianchains.com",
       data: {
         openid: wx.getStorageSync('user').openid
       },
       noLoading: true,
       method: "GET",
       header: { 'content-type': 'application/x-www-form-urlencoded' }
       //  header: { 'content-type': 'application/json' }
     }).then(res => {

      //  console.log(res)

     }).catch(err => {
       console.log("出错了")
       wx.showToast({
         title: '网络繁忙'
       })
       console.log(err)
     });
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
            // console.log(res);
            wx.setStorageSync('code', res.result);
            var code = res.code;
            // console.log("扫码成功");
            // console.log("条形码：" + code)

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
              //  console.log(result)
              //  console.log("查库成功");
               if (!result){
                  wx.showToast({
                     title: '该商品暂未上架',
                  })
                  return
               }
               //查询购物车
               wx.setStorageSync('price', result.price);
               wx.setStorageSync('name', result.name);
               wx.setStorageSync('specifi', result.specifi);
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
                  console.log("输出carts:",carts)
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
            if (totalNum >= 5) {
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
      if(options.t && options.t == "award") {
        wx.navigateTo({
          url: '../../component/award/award',
        })
      }
      console.log(options.StoreId == "000001")
      if (!!options.StoreId) {
        wx.setStorageSync('storeId', options.StoreId)
        wx.setStorageSync('storeName', options.StoreName)
        this.setData({
          'storeId': options.StoreId,
          'storeName': options.StoreName
        })
      }
      



   },
   onShow: function () {
      var storeId = wx.getStorageSync('storeId');
      let storeNames = wx.getStorageSync('storeName');

      if (storeId) {
         this.setData({
            'storeId': storeId,
            'storeName': storeNames
         })
      }

      if (!!wx.getStorageSync('user').openid) {
        this.saveUnion();
      }

      fetch({
        url: "/CVS/discount",
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
      }).then(res => {

        wx.setStorageSync('percent', res.data)
      }).catch(err => {
        console.log("出错了")
        wx.showToast({
          title: '网络繁忙'
        })
        console.log(err)
      });
   }
})

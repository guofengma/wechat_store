import fetch from '../../utils/fetch.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    result:[]
  },
  input(e) {
    console.log(e.detail.value)
    let product = e.detail.value;
    this.setData({
      product: e.detail.value
    })
  },
  bindconfirm(e) {
    console.log(e.detail.value)
    let product = e.detail.value;

    fetch({
      url: "/CVS/good/queryname",
      // baseUrl: "http://192.168.50.238:9888",
      baseUrl: "https://store.lianlianchains.com",
      data: {
        name: product,
        storeid: wx.getStorageSync('storeId')
      },
      noLoading: true,
      method: "GET",
      //   header: { 'content-type': 'application/x-www-form-urlencoded' }
      header: {
        'content-type': 'application/json'
      }
    }).then(result => {
      this.setData({
        result: result
      })
    }).catch(err => { 
      console.log(err)
    });
  },
  search() {
    fetch({
      url: "/CVS/good/queryname",
        // baseUrl: "http://192.168.50.238:9888",
      baseUrl: "https://store.lianlianchains.com",
      data: {
        name: this.data.product,
        storeid: wx.getStorageSync('storeId')
      },
      noLoading: true,
      method: "GET",
      //   header: { 'content-type': 'application/x-www-form-urlencoded' }
      header: {
        'content-type': 'application/json'
      }
    }).then(result => {
      this.setData({
        result: result
      })
    }).catch(err => {
      console.log(err)
    });
  },
  ScancodeTap(code) {

    //查库
    fetch({
      url: "/CVS/good/querybyCode",
      // baseUrl: "http://192.168.50.57:9888",
      baseUrl: "https://store.lianlianchains.com",
      data: {
        code: code,
        storeid: wx.getStorageSync('storeId')
      },
      noLoading: true,
      method: "GET",
      header: { 'content-type': 'application/x-www-form-urlencoded' }
      // header: { 'content-type': 'application/json' }
    }).then(result => {
      //  console.log(result)
      //  console.log("查库成功");
      if (!result) {
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
        console.log("输出carts:", carts)
        console.log("购物车查询成功")

        if (carts.length) {

          console.log("购物车不为空的情况")
          let index = carts.findIndex((value, index, arr) => {
            return value.code == code;
          });
          if (index >= 0) {
            console.log("购物车不为空的情况，扫描已经存在的商品")
            wx.setStorageSync('already', true);
            wx.setStorageSync('index', index);
            wx.navigateTo({
              url: '../../pages/info/info'
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
                code: code,
                //   code: "6901121300298",
                storeid: wx.getStorageSync('storeId')
              },
              noLoading: true,
              method: "POST",
              header: { 'content-type': 'application/x-www-form-urlencoded' }
              // header: { 'content-type': 'application/json' }
            }).then(addCarts => {
              wx.navigateTo({
                url: '../../pages/info/info'
              })
            })
          }
        } else {
          console.log("购物车为空的情况")
          console.log("条形码：" + code)
          wx.setStorageSync('already', false);

          fetch({
            url: "/CVS/cart/addtocart",
            // baseUrl: "http://192.168.50.57:9888",
            baseUrl: "https://store.lianlianchains.com",
            data: {
              openid: wx.getStorageSync('user').openid,
              amount: 1,
              code: code,
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
              url: '../../pages/info/info'
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
  },

  choose(e) {
    let code = e.currentTarget.dataset.info;

    this.ScancodeTap(code)
    
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
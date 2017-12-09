// pages/apply/apply.js
import fetch from '../../utils/fetch';

let storeList = []
let page = 0
let totalpage = 0

Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: wx.getStorageSync("user").openid,
    hasOrder: true,
    storeList: [],
    storeid: '',
    address: '',
    storetitle: 'NO-pengding',
    iconlist: [
      {
        titleimg: "../../image/office.png",
        titleicon: "roleimg-office",
        iconflag: false,
        img: '../../image/join.png',
        icon: 'roleimg-join',
        role: '场地方'
      },
      {
        titleimg: "../../image/manager.png",
        titleicon: "roleimg-manager",
        iconflag: false,
        img: '../../image/join.png',
        icon: 'roleimg-join',
        role: '经营方'
      },
      {
        titleimg: "../../image/truck.png",
        titleicon: "roleimg-truck",
        iconflag: false,
        img: '../../image/join.png',
        icon: 'roleimg-join',
        role: '供货方'
      }
    ]
  },
  provideView() {
    wx.navigateTo({
      url: '../providenav/providenav',
    })
  },
  manageView() {
    wx.navigateTo({
      url: '../managenav/managenav',
    })
  },
  shelveView() {
    wx.navigateTo({
      url: '../shelvenav/shelvenav',
    })
  },
  isEmpty(item) {

    if (null == item || '' == item) {
      return true
    } else {
      return false
    }
  },
  delstore(e){
    wx.showModal({
      title: '删除货架',
      content: '是否删除货架？',
      success: function (sm) {

      }
      })

  },
  storedetail(e) {

    console.log(e)

    var storeid = e.currentTarget.dataset.storeid

    var field = e.currentTarget.dataset.field
    var deal = e.currentTarget.dataset.deal
    var supply = e.currentTarget.dataset.supply

    if (this.isEmpty(field) && this.isEmpty(deal) && this.isEmpty(supply)) {
      console.log('没有用户')
      wx.showToast({
        title: '还未有用户加入',
      })
      return
    }

    var fieldstate = e.currentTarget.dataset.fieldstate
    var dealstate = e.currentTarget.dataset.dealstate
    var supplystate = e.currentTarget.dataset.supplystate

    // open
    if (fieldstate == 1 && dealstate == 1 && supplystate == 1 &&
      deal == this.data.user) {

      fetch({
        url: "/CVS/apply/registerquery",
        //   baseUrl: "http://192.168.50.57:9888", 
        baseUrl: "https://store.lianlianchains.com",
        data: {
          id: storeid
        },
        noLoading: false,
        method: "GET",
        header: { 'content-type': 'application/x-www-form-urlencoded' }
        //  header: { 'content-type': 'application/json' }
      }).then(result => {

        console.log(result)
        if (!result) {

          wx.showModal({
            title: '开户申请',
            content: '参与方均签约，是否申请开户？',
            success: function (sm) {

              if (sm.confirm) {
                console.log('用户点击确定')

                // 场地申请接口
                fetch({
                  url: "/CVS/apply/deal/query",
                  //   baseUrl: "http://192.168.50.57:9888", 
                  baseUrl: "https://store.lianlianchains.com",
                  data: {
                    openid: deal
                  },
                  noLoading: false,
                  method: "GET",
                  header: { 'content-type': 'application/x-www-form-urlencoded' }
                  //  header: { 'content-type': 'application/json' }
                }).then(result => {

                  console.log(result)
                  wx.navigateTo({
                    url: '../open/open?' + 'mobile=' + result.phone +
                    '&id=' + storeid
                  })

                }).catch(err => {

                  console.log("出错了")
                  wx.showToast({
                    title: '网络繁忙'
                  })
                  console.log(err)
                })

              } else if (sm.cancel) {
                console.log('用户点击取消')

                wx.navigateTo({
                  url: '../storedetail/storedetail?' + 'storeid=' + storeid +
                  '&field=' + field + '&deal=' + deal + '&supply=' + supply +
                  '&fieldstate=' + fieldstate +
                  '&dealstate=' + dealstate +
                  '&supplystate=' + supplystate
                })
              }

            }
          })
        } else {

          wx.navigateTo({
            url: '../storedetail/storedetail?' + 'storeid=' + storeid +
            '&field=' + field + '&deal=' + deal + '&supply=' + supply +
            '&fieldstate=' + fieldstate +
            '&dealstate=' + dealstate +
            '&supplystate=' + supplystate
          })

        }

      }).catch(err => {

        console.log("出错了")
        wx.showToast({
          title: '网络繁忙'
        })
        console.log(err)
      })


    } else {

      wx.navigateTo({
        url: '../storedetail/storedetail?' + 'storeid=' + storeid +
        '&field=' + field + '&deal=' + deal + '&supply=' + supply +
        '&fieldstate=' + fieldstate +
        '&dealstate=' + dealstate +
        '&supplystate=' + supplystate
      })

    }


  },
  setItemStorename(e) {

    var idx = e.target.dataset.idx
    // this.data.storeList[idx].storename = e.detail.value

    // 更新地址


  },
  setAddress(e) {
    this.setData({
      address: e.detail.value
    })
  },
  checkrole(roletype) {

    if (roletype == 0) {

      // 角色
      if (!this.data.field) {
        wx.showToast({
          title: '请先申请提供场地',
        })
        return false
      }
    } else if (roletype == 1) {

      // 角色
      if (!this.data.deal) {
        wx.showToast({
          title: '请先申请经营货架',
        })
        return false
      }

    } else {

      // 角色
      if (!this.data.supply) {
        wx.showToast({
          title: '请先申请货架供货',
        })
        return false
      }

    }

    return true
  },
  searchstore() {

    page = 0
    storeList = []
    totalpage = 0
    this.setData({
      storeList: storeList,
      hasOrder: true
    })

    this.querystore()
  },
  querystore() {

    console.log('user===' + this.data.user)
    console.log('user2===' + wx.getStorageSync("user").openid)

    this.setData({
      hasOrder: true
    })

    fetch({
      url: "/CVS/apply/queryapply",
      //   baseUrl: "http://192.168.50.57:9888",
      baseUrl: "https://store.lianlianchains.com",
      data: {
        'page': page,
        'pagenum': 5,
        'address': this.data.address
      },
      method: "GET",
      noLoading: true,
      header: { 'content-type': 'application/x-www-form-urlencoded' }
    }).then(res => {

      console.log(res.apply)
      if (res.apply != '') {
        setTimeout(() => {

          totalpage = res.totalpage
          this.setData({
            storeList: this.data.storeList.concat(res.apply)
          })

          this.setData({
            hasOrder: false
          })

        }, 500);
      } else {

        this.setData({
          hasOrder: false
        })
      }

    }).catch(err => {

      wx.showToast({
        title: '出错了',
      })
      console.log(err)

      this.data.hasOrder = true
    })
  },
  loadMore() {

    console.log(totalpage)
    console.log(page)

    if (page >= totalpage - 1) {

      console.log("没有更多了")
      page = totalpage

      this.setData({
        hasOrder: false
      })
    } else {

      console.log("加载更多")
      page++

      this.querystore(this.data.address)
    }
  },
  inittapicon(e) {

    // 0 场地 1 经营 2 供货
    var roletype = parseInt(e.target.dataset.roletype)

    if (!this.checkrole(roletype)) {
      console.log('role error')
      return
    }

    (this.data.storeid == '') ?
      (this.initShelve(roletype)) :
      (this.jOrqShelve(roletype, this.data.storeid))

  },
  changeIcon(roletype) {

    var iconflag = "iconlist[" + roletype + "].iconflag"
    var img = "iconlist[" + roletype + "].img"
    var icon = "iconlist[" + roletype + "].icon"

    var flag = this.data.iconlist[roletype].iconflag

    this.setData({

      [img]: (!flag) ? '../../image/quit.png' : '../../image/join.png',
      [icon]: (!flag) ? 'roleimg-quit' : 'roleimg-join',
      [iconflag]: (!flag)
    })

  },
  roleQuery() {

    fetch({
      url: "/CVS/apply/Role",
      //   baseUrl: "http://192.168.50.239:9888",
      baseUrl: "https://store.lianlianchains.com",
      data: {
        'openid': wx.getStorageSync("user").openid
      },
      method: "POST",
      noLoading: true,
      header: { 'content-type': 'application/x-www-form-urlencoded' }
    }).then(res => {

      console.log(res)
      if (res.ec == '000000') {
        this.setData({
          field: res.data.field,
          deal: res.data.deal,
          supply: res.data.supply
        })
      }

    }).catch(err => {

      wx.showToast({
        title: '出错了',
      })
      console.log(err)
    })
  },
  tapitem(e) {

    // console.log(e)
    var user = e.target.dataset.user

    if (null != user && '' != user && this.data.user != user) {
      console.log('角色非本人')
      return
    }

    var storeid = e.target.dataset.storeid
    var idx = e.target.dataset.idx
    var roletype = parseInt(e.target.dataset.roletype)

    if (this.data.storeList[idx].fieldstate == 1 &&
        this.data.storeList[idx].dealstate == 1 &&
        this.data.storeList[idx].supplystate == 1) {

      wx.showToast({
        title: '签约后不能修改',
      })

      return

    }

    if (!this.checkrole(roletype)) {
      console.log('role error')
      return
    } else {
      this.modifyicon(user, storeid, idx, roletype)
    }

  },
  modifyicon(user, storeid, idx, roletype) {

    var optype = (user == this.data.user) ? 'quit' : 'join'

    fetch({
      url: "/CVS/apply/opapply",
      //   baseUrl: "http://192.168.50.239:9888",
      baseUrl: "https://store.lianlianchains.com",
      data: {
        'openid': wx.getStorageSync("user").openid,
        'id': storeid,
        'roletype': roletype,
        'optype': optype
      },
      method: "POST",
      noLoading: true,
      header: { 'content-type': 'application/x-www-form-urlencoded' }
    }).then(res => {

      if (res.ec == '000000') {

        var item = "storeList[" + idx + "]." + ((roletype == 0) ? 'field' :
          ((roletype == 1) ? 'deal' : 'supply'))
        this.setData({
          [item]: (optype == 'quit') ? '' : this.data.user
        })

        // if (optype == 'quit'){

        //   wx.showToast({
        //     title: '退出成功',
        //   })

        // }else{

        //   wx.showToast({
        //     title: '加入成功',
        //   })

        // }
        
        this.searchstore()

      }

    }).catch(err => {
      console.log("出错了")
      wx.showToast({
        title: '出错了',
      })
      console.log(err)
    })

  },
  initShelve(roletype) {

    fetch({
      url: "/CVS/apply/insert",
      //   baseUrl: "http://192.168.50.57:9888",
      baseUrl: "https://store.lianlianchains.com",
      data: {
        // 'openid': wx.getStorageSync("user").openid,
        'field': (roletype == 0) ? wx.getStorageSync("user").openid : '',
        'deal': (roletype == 1) ? wx.getStorageSync("user").openid : '',
        'supply': (roletype == 2) ? wx.getStorageSync("user").openid : ''
      },
      method: "POST",
      noLoading: true,
      header: { 'content-type': 'application/x-www-form-urlencoded' }
    }).then(res => {

      console.log(res)
      setTimeout(() => {

        wx.showToast({
          title: '货架创建成功',
        })

      }, 800);

      // console.log(res)
      this.data.storeid = res
      this.changeIcon(roletype)
      // refresh store
      this.searchstore()

    }).catch(err => {

      wx.showToast({
        title: '出错了',
      })
      console.log(err)
    })

  },
  jOrqShelve(roletype, storeid) {

    var optype = (this.data.iconlist[roletype].iconflag) ? 'quit' : 'join'
    fetch({
      url: "/CVS/apply/opapply",
      //   baseUrl: "http://192.168.50.239:9888",
      baseUrl: "https://store.lianlianchains.com",
      data: {
        'openid': wx.getStorageSync("user").openid,
        'id': this.data.storeid,
        'roletype': roletype,
        'optype': optype
      },
      method: "POST",
      noLoading: true,
      header: { 'content-type': 'application/x-www-form-urlencoded' }
    }).then(res => {
      // console.log(res)
      if (res.ec == '000000') {
        this.changeIcon(roletype, optype)
        this.searchstore()
      }

    }).catch(err => {
      console.log("出错了")
      wx.showToast({
        title: '出错了',
      })
      console.log(err)
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    console.log('onload')

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

    console.log('onshow')
    this.setData({
      user: wx.getStorageSync("user").openid
    })

    // 角色
    this.roleQuery()

    // 店铺
    this.searchstore()

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
    this.loadMore()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
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
    hidden: true,
    storeid: '',
    address: '',
    iconlist: [
      {
        titleimg: "../../image/office.png",
        titleicon: "roleimg-office",
        iconflag: false,
        img: '../../image/join.png',
        icon: 'roleimg-join'
      },
      {
        titleimg: "../../image/manager.png",
        titleicon: "roleimg-manager",
        iconflag: false,
        img: '../../image/join.png',
        icon: 'roleimg-join'
      },
      {
        titleimg: "../../image/truck.png",
        titleicon: "roleimg-truck",
        iconflag: false,
        img: '../../image/join.png',
        icon: 'roleimg-join'
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
        return
      }
    } else if (roletype == 1) {

      // 角色
      if (!this.data.field) {
        wx.showToast({
          title: '请先申请经营管理',
        })
        return
      }

    } else {

      // 角色
      if (!this.data.field) {
        wx.showToast({
          title: '请先申请货架供货',
        })
        return
      }

    }
  },
  searchstore() {

    storeList = []
    this.data.storeList = []
    page = 0
    this.querystore()
  },
  querystore() {

    this.data.hasOrder = false

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

      // console.log(res.apply)

      totalpage = res.totalpage
      this.setData({
        storeList: this.data.storeList.concat(res.apply)
      })
      this.data.hasOrder = true

    }).catch(err => {

      wx.showToast({
        title: '出错了',
      })
      console.log(err)
    })
  },
  loadMore() {

    // console.log(totalpage)
    // console.log(page)

    if (page >= totalpage / 5 + 1) {

      console.log("没有更多了")
      page = totalpage

      this.setData({
        hidden: false
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

    this.checkrole(roletype);

    (this.data.storeid == '') ? 
    (this.initShelve(roletype)) : 
    (this.jOrqShelve(roletype, this.data.storeid))

  },
  changeIcon(roletype) {

    var iconflag = "iconlist[" + roletype + "].iconflag"
    var img =      "iconlist[" + roletype + "].img"
    var icon =     "iconlist[" + roletype + "].icon"

    var flag = this.data.iconlist[roletype].iconflag

    this.setData({

      [img]: (!flag) ? '../../image/quit.png' :'../../image/join.png',
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

      // console.log(res)
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

    var user = e.target.dataset.user
    var storeid = e.target.dataset.storeid
    var idx = e.target.dataset.idx
    var roletype = parseInt(e.target.dataset.roletype)

    this.checkrole(roletype)

    this.modifyicon(user, storeid, idx, roletype)

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
      // console.log(res)
      this.data.storeid = res
      this.changeIcon(roletype)

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

    // 角色
    this.roleQuery()

    // 店铺
    this.querystore()

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
    this.loadMore()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
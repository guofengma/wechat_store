// pages/apply/apply.js
import fetch from '../../utils/fetch';

let storeList = [];
let page = 0;
let totalpage = 0;
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
  querystore(address) {

    fetch({
      url: "/CVS/apply/queryapply",
      //   baseUrl: "http://192.168.50.57:9888",
      baseUrl: "https://store.lianlianchains.com",
      data: {
        'page': page,
        'pagenum': 5,
        'address': address
      },
      method: "GET",
      noLoading: true,
      header: { 'content-type': 'application/x-www-form-urlencoded' }
    }).then(res => {

      console.log("res====" + res.totalpage)
      console.log("res====" + res.apply)

      this.setData({
        storeList: res.apply
      })

    }).catch(err => {

      wx.showToast({
        title: '出错了',
      })
      console.log(err)
    })
  },
  loadMore() {

    console.log(totalpage)

    if (page >= totalpage - 1) {

      console.log("没有更多了")
      page = totalpage

      this.setData({
        hidden: true
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

    (this.data.storeid == '') ? (this.initShelve(roletype)) : (this.jOrqShelve(roletype, this.data.storeid))

  },
  changeIcon(roletype) {

    var iconflag = {};
    var img = {}
    var icon = {}

    var iconflagname = "iconlist[" + roletype + "].iconflag"
    var imgname = "iconlist[" + roletype + "].img"
    var iconname = "iconlist[" + roletype + "].icon"

    var flag = this.data.iconlist[roletype].iconflag
    iconflag[iconflagname] = !flag

    console.log(flag)

    if (flag) {

      img[imgname] = '../../image/join.png'
      icon[iconname] = 'roleimg-join'
    } else {

      img[imgname] = '../../image/quit.png'
      icon[iconname] = 'roleimg-quit'
    }

    this.setData(iconflag)
    this.setData(img)
    this.setData(icon)

    console.log(this.data.iconlist)

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
  tapfield(e) {

    var storeid = e.target.dataset.storeid
    var idx = e.target.dataset.idx
    this.modifyfield(idx)

  },
  tapdeal(e) {

    var storeid = e.target.dataset.storeid
    var idx = e.target.dataset.idx
    this.jOrqShelvelist(1, storeid, idx)

  },
  tapsupply(e) {

    var storeid = e.target.dataset.storeid
    var idx = e.target.dataset.idx
    this.jOrqShelvelist(2, storeid, idx)

  },
  modifyfield(idx) {

    var field = this.data.storeList[idx].field
    var optype = (user == field)?'join':'quit'
    
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
      
      if (res.ec == '000000') {
          
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
      console.log(res)
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
    this.querystore(this.data.address)

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
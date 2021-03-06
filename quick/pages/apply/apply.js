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
    limit: "all",
    user: wx.getStorageSync("user").openid,
    hasOrder: true,
    storeList: [],
    storeid: '',
    address: '',
    storetitle: 'NO-pengding',
    iconlist: [
      {
        titleimg: "http://store.lianlianchains.com/xiaolian/office.png",
        titleicon: "roleimg-office",
        iconflag: false,
        img: '../../image/join.png',
        icon: 'roleimg-join',
        role: '场地方'
      },
      {
        titleimg: "http://store.lianlianchains.com/xiaolian/manager.png",
        titleicon: "roleimg-manager",
        iconflag: false,
        img: '../../image/join.png',
        icon: 'roleimg-join',
        role: '经营方'
      },
      {
        titleimg: "http://store.lianlianchains.com/xiaolian/truck.png",
        titleicon: "roleimg-truck",
        iconflag: false,
        img: '../../image/join.png',
        icon: 'roleimg-join',
        role: '供货方'
      }
    ]
  },
  progressView() {
    wx.navigateTo({
      url: '../../component/progress/progress',
    })
  },
  bindLimitTap(e) {
    page = 0;
    this.setData({
      limit: e.target.dataset.limit,
      storeList: []
    });

    this.querystore()

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
  storedetail(e) {

    var that = this

    if (e.target.dataset.del == 0) {
      wx.showModal({
        title: '删除货架',
        content: '是否删除货架？',
        success: function (sm) {

          if (sm.confirm) {

            // 货架删除接口
            fetch({
              url: "/CVS/apply/delete",
              // baseUrl: "http://192.168.50.239:9888",
              baseUrl: "https://store.lianlianchains.com",
              data: {
                id: e.currentTarget.dataset.storeid
              },
              noLoading: false,
              method: "GET",
              header: { 'content-type': 'application/x-www-form-urlencoded' }
              //  header: { 'content-type': 'application/json' }
            }).then(result => {

              that.searchstore();

            }).catch(err => {

              console.log("出错了")
              wx.showToast({
                title: '网络繁忙'
              })
              console.log(err)
            })

          } else if (sm.cancel) {
            console.log('用户点击取消')

          }

        }
      })

      return
    }

    var storeid = e.currentTarget.dataset.storeid

    var field = e.currentTarget.dataset.field
    var deal = e.currentTarget.dataset.deal
    var supply = e.currentTarget.dataset.supply

    if (this.isEmpty(field) && this.isEmpty(deal) && this.isEmpty(supply)) {
      // console.log('没有用户')
      wx.showToast({
        title: '还未有用户加入',
      })
      return
    }

    var fieldstate = e.currentTarget.dataset.fieldstate
    var dealstate = e.currentTarget.dataset.dealstate
    var supplystate = e.currentTarget.dataset.supplystate
    var fieldname = e.currentTarget.dataset.fieldname
    var dealname = e.currentTarget.dataset.dealname
    var supplyname = e.currentTarget.dataset.supplyname
    var canedit = e.currentTarget.dataset.canedit;

    //签约
    if (field && deal && supply && (fieldstate == 0 || dealstate == 0 || supplystate == 0) && (field == this.data.user || deal == this.data.user || supply == this.data.user)) {
      wx.showModal({
        title: '签约申请',
        content: '合伙人已满员，是否申请签约？',
        success: function (sm) {

          if (sm.confirm) {
            wx.navigateTo({
              url: '../protocol/protocol?' + 'storeid=' + storeid +
              '&fielduser=' + field +
              '&dealuser=' + deal +
              '&supplyuser=' + supply +
              '&fieldstate=' + fieldstate +
              '&dealstate=' + dealstate +
              '&supplystate=' + supplystate +
              '&fieldperson=' + fieldname +
              '&dealperson=' + dealname +
              '&supplyperson=' + supplyname
            })
            
          } else if (sm.cancel) {
            console.log('用户点击取消')

            wx.navigateTo({
              url: '../storedetail/storedetail?' + 'storeid=' + storeid +
              '&field=' + field + '&deal=' + deal + '&supply=' + supply +
              '&fieldstate=' + fieldstate +
              '&dealstate=' + dealstate +
              '&supplystate=' + supplystate +
              '&canedit=' + canedit +
              '&user=' + that.data.user
            })
          }

        }
      });

      return;
    }
      

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
                  '&supplystate=' + supplystate +
                  '&canedit=' + false +
                  '&user=' + that.data.user
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
            '&supplystate=' + supplystate +
            '&canedit=' + canedit +
            '&user=' + that.data.user
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
        '&supplystate=' + supplystate + 
        '&canedit=' + canedit +
        '&user=' + that.data.user
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
    console.log(roletype)

    if (roletype == 0) {
      // 角色
      if (!this.data.field) {
        wx.navigateTo({
          url: '../providenav/providenav',
        })
        return false
      }
    } else if (roletype == 1) {

      // 角色
      if (!this.data.deal) {
        wx.navigateTo({
          url: '../managenav/managenav',
        })
        return false
      }

    } else {
      // 角色
      if (!this.data.supply) {
        wx.navigateTo({
          url: '../shelvenav/shelvenav',
        });
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

    // console.log('user===' + this.data.user)
    // console.log('user2===' + wx.getStorageSync("user").openid)

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
        'address': this.data.address,
        openid: this.data.limit == "all" ? "" : wx.getStorageSync('user').openid
      },
      method: "GET",
      noLoading: true,
      header: { 'content-type': 'application/x-www-form-urlencoded' }
    }).then(res => {

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

    this.setData({
      roletype: e.target.dataset.roletype
    });

    if (!this.checkrole(roletype)) return;
    this.initShelve(roletype)
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
        // baseUrl: "http://192.168.50.239:9888",
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
        // baseUrl: "http://192.168.50.239:9888",
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

      // setTimeout(() => {

      //   wx.showToast({
      //     title: '货架创建成功',
      //   })

      // }, 800);

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
        // baseUrl: "http://192.168.50.239:9888",
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


  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

    this.setData({
      user: wx.getStorageSync("user").openid
    })

    // 角色
    this.roleQuery()

    // 店铺
    this.searchstore()

  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.loadMore()
  }
})
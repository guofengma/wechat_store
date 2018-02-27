// pages/storedetail/storedetail.js
import { uploadImage } from '../../utils/uploadImg.js'
import fetch from '../../utils/fetch';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: wx.getStorageSync("user").openid,
    fieldflag: true,
    dealflag: false,
    supplyflag: false,
    field: false,
    deal: false,
    supply: false,
    fieldimg: '../../image/office.png',
    dealimg: '../../image/managerAct.png',
    supplyimg: '../../image/truckAct.png'
  },
  dealedit() {
    wx.redirectTo({
      url: '../managenav/managenav',
    })
  },
  previewImage(e) {

    var img = e.target.dataset.img
    // console.log(img)
    wx.previewImage({
      urls: [img],
    })
  },
  protocol() {

    wx.redirectTo({
      url: '../protocol/protocol?' + 'storeid=' + this.data.storeid +
      '&fielduser=' + this.data.fielduser +
      '&dealuser=' + this.data.dealuser +
      '&supplyuser=' + this.data.supplyuser +
      '&fieldstate=' + this.data.fieldstate +
      '&dealstate=' + this.data.dealstate +
      '&supplystate=' + this.data.supplystate +
      '&fieldperson=' + this.data.fieldperson +
      '&dealperson=' + this.data.dealperson +
      '&supplyperson=' + this.data.supplyperson
    })
  },
  queryfield(storeid) {

    // 场地申请接口
    fetch({
      url: "/CVS/apply/field/querynow",
      // baseUrl: "http://192.168.50.239:9888",
      baseUrl: "https://store.lianlianchains.com",
      data: {
        id: storeid
      },
      noLoading: false,
      method: "GET",
      header: { 'content-type': 'application/x-www-form-urlencoded' }
      //  header: { 'content-type': 'application/json' }
    }).then(result => {

      // console.log('fieldresult=' + result)

      if (result.address != "") {

        var person;
        if (result.name.length == 2) {
          person = result.name.substring(0, 1) + '*'
        } else {
          person = result.name.substring(0, 1) + '**'
        }

        this.setData({
          // fielduser: result.openid,
          fieldperson: result.name,
          fieldpersontemp: person,
          fieldmobile: result.phone,
          fieldaddress: result.address,
          fieldcomname: result.comname,
          fieldcomnum: result.comnum,
          fieldfee: result.fee,
          fieldpreviewImg1: 'https://store.lianlianchains.com/images/' + result.img1,
          fieldpreviewImg2: 'https://store.lianlianchains.com/images/' + result.img2,
          fieldpreviewImg3: 'https://store.lianlianchains.com/images/' + result.img3,
          image1: result.img1,
          image2: result.img2,
          image3: result.img3
        })

        this.setData({
          field: true
        })

      } else {

        this.setData({
          field: false
        })
      }

    }).catch(err => {

      console.log("出错了")
      wx.showToast({
        title: '网络繁忙'
      })
      console.log(err)
    })

  },
  querydeal(storeid) {

    // 场地申请接口
    fetch({
      url: "/CVS/apply/deal/querynow",
      // baseUrl: "http://192.168.50.239:9888",
      baseUrl: "https://store.lianlianchains.com",
      data: {
        id: storeid
      },
      noLoading: false,
      method: "GET",
      header: { 'content-type': 'application/x-www-form-urlencoded' }
      //  header: { 'content-type': 'application/json' }
    }).then(result => {

      // console.log('dealresult=' + result)

      if (result.address != "") {

        var person;
        if (result.name.length == 2) {
          person = result.name.substring(0, 1) + '*'
        } else {
          person = result.name.substring(0, 1) + '**'
        }

        this.setData({
          // dealuser: result.openid,
          dealperson: result.name,
          dealpersontemp: person,
          dealmobile: result.phone,
          dealaddress: result.address,
          dealpreviewImg1: 'https://store.lianlianchains.com/images/' + result.img1,
          dealpreviewImg2: 'https://store.lianlianchains.com/images/' + result.img2
        })

        this.setData({
          deal: true
        })

      } else {

        this.setData({
          deal: false
        })
      }

    }).catch(err => {

      console.log("出错了")
      wx.showToast({
        title: '网络繁忙'
      })
      console.log(err)
    })

  },
  querysupply(storeid) {

    // 场地申请接口
    fetch({
      url: "/CVS/apply/supply/querynow",
      // baseUrl: "http://192.168.50.239:9888",
      baseUrl: "https://store.lianlianchains.com",
      data: {
        id: storeid
      },
      noLoading: false,
      method: "GET",
      header: { 'content-type': 'application/x-www-form-urlencoded' }
      //  header: { 'content-type': 'application/json' }
    }).then(result => {

      // console.log('supplyresult=' + result)

      if (result.address != "") {

        var person;
        if (result.name.length == 2) {
          person = result.name.substring(0, 1) + '*'
        } else {
          person = result.name.substring(0, 1) + '**'
        }

        this.setData({
          // supplyuser: result.openid,
          supplyperson: result.name,
          supplypersontemp: person,
          supplymobile: result.phone,
          supplyaddress: result.address,
          supplyclassify: result.goodtype,
          supplypreviewImg1: 'https://store.lianlianchains.com/images/' + result.img1,
          supplypreviewImg2: 'https://store.lianlianchains.com/images/' + result.img2
        })

        this.setData({
          supply: true
        })

      } else {

        this.setData({
          supply: false
        })
      }

    }).catch(err => {

      console.log("出错了")
      wx.showToast({
        title: '网络繁忙'
      })
      console.log(err)
    })

  },
  tapitem(e) {

    var idx = e.target.dataset.idx
    this.itemshow(idx)
  },
  itemshow(idx) {
    if (idx == 0) {
      if (this.data.user != this.data.fielduser) {
        this.setData({
          canedit: 'false'
        })
      }else{
        this.setData({
          canedit: 'true'
        })
      }
    } else if (idx == 1) {
      if (this.data.user != this.data.dealuser) {
        this.setData({
          canedit: 'false'
        })
      } else {
        this.setData({
          canedit: 'true'
        })
      }
    } else if (idx == 2) {
      if (this.data.user != this.data.supplyuser) {
        this.setData({
          canedit: 'false'
        })
      } else {
        this.setData({
          canedit: 'true'
        })
      }
    }
    console.log(this.data.user, this.data.dealuser, this.data.user == this.data.dealuser)
    console.log(idx,this.data.canedit)

    this.setData({
      fieldimg: (idx == 0) ? '../../image/office.png' : '../../image/officeAct.png',
      dealimg: (idx == 1) ? '../../image/manager.png' : '../../image/managerAct.png',
      supplyimg: (idx == 2) ? '../../image/truck.png' : '../../image/truckAct.png',
      fieldflag: idx == 0 ? true : false,
      dealflag: idx == 1 ? true : false,
      supplyflag: idx == 2 ? true : false
    })

  },

  //场地输入
  fieldInput(e) {
    console.log(e.target.dataset.field)
    if (e.target.dataset.field == "fieldpersontemp") {
      this.setData({
        fieldname: e.detail.value,
        fieldpersontemp: e.detail.value
      })
    }else{
      this.setData({
        [e.target.dataset.field]: e.detail.value
      })
    }
    
    console.log(this.data.fieldaddress)
  },
  fieldblur() {
    fetch({
      url: "/CVS/apply/opupdate",
      // baseUrl: "http://192.168.50.239:9888",
      baseUrl: "https://store.lianlianchains.com",
      data: {
        id: this.data.storeid,
        openid: wx.getStorageSync('user').openid,
        roletype: 0,
        address: this.data.fieldaddress,
        comname: this.data.fieldcomname,
        comnum: this.data.fieldcomnum,
        fee: this.data.fieldfee,
        name: this.data.fieldname ? this.data.fieldname : this.data.fieldperson,
        phone: this.data.fieldmobile,
        img1: this.data.image1,
        img2: this.data.image2,
        img3: this.data.image3 
      },
      noLoading: false,
      method: "GET",
      header: { 'content-type': 'application/x-www-form-urlencoded' }
      //  header: { 'content-type': 'application/json' }
    }).then(result => {



    }).catch(err => {

      console.log("出错了")
      wx.showToast({
        title: '网络繁忙'
      })
      console.log(err)
    })
  },

  //经营输入
  dealInput(e) {
    if (e.target.dataset.deal == "dealpersontemp") {
      this.setData({
        dealname: e.detail.value,
        dealpersontemp: e.detail.value
      })
    } else {
      this.setData({
        [e.target.dataset.deal]: e.detail.value
      })
    }

    console.log(this.data.fieldaddress)
  },
  dealblur() {
    fetch({
      url: "/CVS/apply/opupdate",
      // baseUrl: "http://192.168.50.239:9888",
      baseUrl: "https://store.lianlianchains.com",
      data: {
        id: this.data.storeid,
        openid: wx.getStorageSync('user').openid,
        roletype: 1,
        address: this.data.dealaddress,
        name: this.data.dealname ? this.data.dealname : this.data.dealperson,
        phone: this.data.dealmobile
      },
      noLoading: false,
      method: "GET",
      header: { 'content-type': 'application/x-www-form-urlencoded' }
      //  header: { 'content-type': 'application/json' }
    }).then(result => {



    }).catch(err => {

      console.log("出错了")
      wx.showToast({
        title: '网络繁忙'
      })
      console.log(err)
    })
  },

  //供货输入
  supplyInput(e) {
    console.log(e.detail.value)
    console.log(e)
    if (e.target.dataset.supply == "supplypersontemp") {
      this.setData({
        supplyname: e.detail.value,
        supplypersontemp: e.detail.value
      })
    } else {
      this.setData({
        [e.target.dataset.supply]: e.detail.value
      })
    }

  },
  supplyblur() {
    fetch({
      url: "/CVS/apply/opupdate",
      // baseUrl: "http://192.168.50.239:9888",
      baseUrl: "https://store.lianlianchains.com",
      data: {
        id: this.data.storeid,
        openid: wx.getStorageSync('user').openid,
        roletype: 2,
        address: this.data.supplyaddress,
        name: this.data.supplyname ? this.data.supplyname : this.data.supplyperson,
        phone: this.data.supplymobile,
        goodtype: this.data.supplyclassify
      },
      noLoading: false,
      method: "GET",
      header: { 'content-type': 'application/x-www-form-urlencoded' }
      //  header: { 'content-type': 'application/json' }
    }).then(result => {



    }).catch(err => {

      console.log("出错了")
      wx.showToast({
        title: '网络繁忙'
      })
      console.log(err)
    })
  },
  imageView(e) {
    let _this = this;
    this.data.apishow = false

    let idx = e.target.dataset.idx;
    uploadImage().then(res => {

      let path = res.tempFilePaths[0];
      if (idx === "previewImg1") {
        this.setData({
          previewImg1: path
        })
        wx.uploadFile({
          // url: 'http://192.168.50.115:8123/upload', //仅为示例，非真实的接口地址
          url: 'https://store.lianlianchains.com/CVS/upload',
          filePath: path,
          name: 'test',
          formData: {
            'openid': wx.getStorageSync('user').openid
          },
          success: (res) => {
            var data = res.data
            //do something
            this.setData({
              image1: data,
              fieldpreviewImg1:"https://store.lianlianchains.com/images/" + data
            })
            fetch({
              url: "/CVS/apply/opupdate",
              // baseUrl: "http://192.168.50.239:9888",
              baseUrl: "https://store.lianlianchains.com",
              data: {
                id: _this.data.storeid,
                openid: wx.getStorageSync('user').openid,
                roletype: 0,
                address: _this.data.fieldaddress,
                comname: _this.data.fieldcomname,
                comnum: _this.data.fieldcomnum,
                fee: _this.data.fieldfee,
                name: _this.data.fieldname ? _this.data.fieldname : _this.data.fieldperson,
                phone: _this.data.fieldmobile,
                img1: _this.data.image1,
                img2: _this.data.image2,
                img3: _this.data.image3
              },
              noLoading: false,
              method: "GET",
              header: { 'content-type': 'application/x-www-form-urlencoded' }
              //  header: { 'content-type': 'application/json' }
            }).then(result => {



            }).catch(err => {

              console.log("出错了")
              wx.showToast({
                title: '网络繁忙'
              })
              console.log(err)
            })
          }
        })
      } else if (idx === "previewImg2") {
        this.setData({
          previewImg2: path
        })
        wx.uploadFile({
          // url: 'http://192.168.50.115:8123/upload', //仅为示例，非真实的接口地址
          url: 'https://store.lianlianchains.com/CVS/upload', //仅为示例，非真实的接口地址
          filePath: path,
          name: 'test',
          formData: {
            'openid': wx.getStorageSync('user').openid
          },
          success: (res) => {
            var data = res.data
            //do something

            this.setData({
              image2: data,
              fieldpreviewImg2: "https://store.lianlianchains.com/images/" + data
            })

            fetch({
              url: "/CVS/apply/opupdate",
              // baseUrl: "http://192.168.50.239:9888",
              baseUrl: "https://store.lianlianchains.com",
              data: {
                id: _this.data.storeid,
                openid: wx.getStorageSync('user').openid,
                roletype: 0,
                address: _this.data.fieldaddress,
                comname: _this.data.fieldcomname,
                comnum: _this.data.fieldcomnum,
                fee: _this.data.fieldfee,
                name: _this.data.fieldname ? _this.data.fieldname : _this.data.fieldperson,
                phone: _this.data.fieldmobile,
                img1: _this.data.image1,
                img2: _this.data.image2,
                img3: _this.data.image3
              },
              noLoading: false,
              method: "GET",
              header: { 'content-type': 'application/x-www-form-urlencoded' }
              //  header: { 'content-type': 'application/json' }
            }).then(result => {



            }).catch(err => {

              console.log("出错了")
              wx.showToast({
                title: '网络繁忙'
              })
              console.log(err)
            })
          }
        })
      } else if (idx === "previewImg3") {
        this.setData({
          previewImg3: path
        })
        wx.uploadFile({
          // url: 'http://192.168.50.115:8123/upload', //仅为示例，非真实的接口地址
          url: 'https://store.lianlianchains.com/CVS/upload', //仅为示例，非真实的接口地址
          filePath: path,
          name: 'test',
          formData: {
            'openid': wx.getStorageSync('user').openid
          },
          success: (res) => {
            var data = res.data
            //do something

            this.setData({
              image3: data
            })
          }
        })
      }

    })
  },
  checkCanedit() {
    if (this.data.user != this.data.fielduser) {
      this.setData({
        canedit: 'false'
      })
    } else {
      this.setData({
        canedit: 'true'
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    console.log(options)

    this.queryfield(options.storeid)
    this.querydeal(options.storeid)
    this.querysupply(options.storeid)

    this.setData({
      storeid: options.storeid,
      fieldstate: options.fieldstate,
      dealstate: options.dealstate,
      supplystate: options.supplystate,
    })

    this.setData({
      fielduser: options.field,
      dealuser: options.deal,
      supplyuser: options.supply,
      canedit: options.canedit,
      user: options.user
    })

    this.checkCanedit();
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

    this.setData({
      user: wx.getStorageSync("user").openid
    })
  },

  
})
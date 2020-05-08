// pages/subscribe_rinse/subscribe_rinse.js
const app = getApp();
import { Appointment_cleaning, codes, atOnceOrder, process_Wx_pay, Coupons_available, wx_notify_dec, item_list, item_info, by_item_list } from '../../config/https.js'
var WxParse = require('../../wxParse/wxParse.js');
import Toast from '../../miniprogram_npm/_vant-weapp@0.5.7@vant-weapp/toast/toast';
const tool = require('../../config/tool.js');
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    oppt:1,
    couponIndex:0,
    codeIndex:0,
    opp:2,
    dat:{},//数据
    window:false,//弹窗
    yhq: [],//优惠劵
    iconId:0, //优惠劵的下标
    coupon:'',//优惠劵
    date: '', //服务时间
    code: '', //优惠码
    options:{},
    id:'',//优惠劵id
    windows:false,
    zj:'',
    price:"",
    order_info:{},//订单生成数据
    codesBox:{},//优惠吗数据
    info:[],


    shop_box:false,
    shop_dat:{},
    shop_guige:{},
    shopId:"",//商品id
    onId: "",//商品规格id
    onIndex:0,
    printIndex:0,
    yhqArr:[],
    time:"",
    memos:"",
    discount:null,
    codesId:"",
    listBox:null,
    formId:"",
  },

  submitInfo: function (e) {//获取formid
    console.log(e)
    this.setData({ formId: e.detail.formId })
  },

  bindDateChange: function (e) { //服务时间
    console.log(e)
    var start = new Date(this.data.time.replace(/-/g, "/")).getTime()/1000
    var end = new Date(e.detail.value.replace(/-/g, "/")).getTime()/1000
    if (end >= start){
      this.setData({
        date: e.detail.value
      })
    }else{
      wx.showToast({
        title: '所选时间不能小于今天',
        icon:'none'
      })
    }
    
  },

  oninput(e){ //备注
   console.log(e)
    this.setData({ memos: e.detail.value, mem: e.detail.cursor})
  },

  inpu(e){ //二维码
   console.log(e)
    this.setData({code: e.detail.value})
  },

  minus(e) { //商品数量减
    var index = e.currentTarget.dataset.index
    var info = this.data.info
    var price = 0
    info[index].num--
    for (var i = 0; i < info.length; i++) {
      price += info[i].num * info[i].price
    }
    if (info[index].num>=1){
      this.setData({ info: info, price: price.toFixed(2), zj: price.toFixed(2), discount: null, couponIndex: 0, codeIndex: 0, id: '', codesBox: {}, codesId:""})
   }else{
      info[index].num=1
      this.setData({ info: info, discount: null, couponIndex: 0, id: '', codesBox: {}, codesId:"", codeIndex: 0,})
   }
  },

  plus(e){ //商品数量加
    var index=e.currentTarget.dataset.index
    var info=this.data.info
    var price = 0
    info[index].num++
    for(var i=0; i<info.length; i++){
      price += info[i].num * info[i].price
    }
    this.setData({ info: info, price: price.toFixed(2), zj: price.toFixed(2), discount: null, couponIndex: 0, codeIndex: 0, id: '', codesBox: {}, codesId:""})
  },

  delete(e) { //商品删除
    var index = e.currentTarget.dataset.index
    var info = this.data.info, price=0
    info.splice(index, 1)
    for(var i=0; i<info.length; i++){
      price += info[i].price * info[i].num
    }
    this.setData({ info: info, price: price.toFixed(2), zj: price.toFixed(2), coupon: "", discount: null, couponIndex: 0, codeIndex: 0, id: '', codesBox: {}, codesId:"" })
  },


  present() {//提交优惠码
    var aoo=[], info=this.data.info
    info.forEach(res=>{
      aoo.push(res.item_id)
    })
    codes({
      codes:this.data.code,
      item_list: JSON.stringify(aoo),
      price: this.data.zj
    }).then(res=>{
      console.log(res)
      this.setData({ codesBox: res.codes, codesId: res.codes.id, id:'',  discount: res.codes.price})
      wx.showToast({
        title:res.msg,
        icon:'none'
      })
      setTimeout(() => {
        var zjs = this.data.price - this.data.discount
        this.setData({ zj: zjs.toFixed(2) })
      }, 500)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({ options})
    var time = util.formatTime(new Date());
    console.log(time)
    // 再通过setData更改Page()里面的data，动态更新页面的数据
    this.setData({
      time: time
    });
  },

  getList(){//所调数据
    Appointment_cleaning({
      user_id: app.globalData.userId,
      item_id: this.data.options.id,
      num: 1,
      guige_id:this.data.options.onId
    }).then(res => {
      this.setData({ dat: res.data, info: res.info, price: res.info[0].price, zj: res.info[0].price})
    }).catch(res=>{
      console.log(res)
    })
  },

  site(){ //地址
   if(this.data.dat.address==null){
     wx.navigateTo({
       url: '/pages/address_es/address_es',
     })
   }else{
     wx.navigateTo({
       url: '/pages/address/address?qz=1',
     })
   } 
   
  },

  coupon(e){ //优惠卷
    console.log(e)
    if (this.data.window!=true){
      if (e.currentTarget.dataset.id == 1) {
        Coupons_available({
          user_id: app.globalData.userId,
          item_id: this.data.options.id,
          price: this.data.price
        }).then(res => {
          console.log(res)
          var yhq = res.list, yhqArr = []
          yhq.forEach(item => {
            yhqArr.push(item.merge)
          })
          this.setData({
            window: true,
            codeIndex: 0,
            codesBox: {},codesId:"", discount:null,
            couponIndex: e.currentTarget.dataset.id,
            yhq: yhq,
            yhqArr: yhqArr
          })
        }).catch(res => {
          wx.showToast({
            title: res.msg,
            icon: 'none'
          })
          this.setData({
            couponIndex: 0
          })
        })
      } else {
        this.setData({
          couponIndex: e.currentTarget.dataset.id,
          yhq: '', codesBox: {}, codesId: "", id:'',
          discount: null,
          zj: this.data.price
        })
      }
    }
    
  },


  onConfirm(e) {//选择优惠劵确定
    console.log(e)
    var yhq = this.data.yhq
    var iconId = e.detail.index
    this.setData({
      window: false,
      coupon: yhq[iconId],
      discount: yhq[iconId].price,
      id: yhq[iconId].id,
      codeIndex: 0,
      codesBox: {}, codesId: "",
    }) 
    setTimeout(()=>{
      var zjs = this.data.price - this.data.coupon.price
      this.setData({ zj: zjs.toFixed(2)})
    }, 500)
  },

  onCancel(e) { //选择优惠劵取消
  console.log(e)
    this.setData({
      window: false,
      couponIndex:0
    }) 
  },
 
  cancelES(){ //支付取消
    this.setData({
      windows:false
    })
  },
  payType(){ //确定支付
    console.log(this.data.order_info.id)
    var id = this.data.order_info.id
    process_Wx_pay({
      user_id: app.globalData.userId,
      total_price:this.data.zj,
      order_number: this.data.order_info.order_number
    }).then(res=>{
      console.log(res)
      wx.requestPayment({
        timeStamp: res.res.timeStamp,
        nonceStr: res.res.nonceStr,
        package: res.res.package,
        signType: res.res.signType,
        paySign: res.res.paySign,
        success(res) {
          console.log(res)
          var that=this
        // setTimeout(()=>{
          wx.redirectTo({
            url: '/pages/order_result/order_result?id='+id,
          })
        // }, 500)
        },
        fail(err) { 
          wx.showToast({
            title: err.msg,
            icon:'none'
          })
          setTimeout(()=>{
          wx.redirectTo({
            url: '/pages/order_result/order_result?err=404',
          })
        }, 500)
        }
      })
    })
  },
  
  promotion_code(e) { //优惠码
    console.log(e)
    this.setData({
      codeIndex: e.currentTarget.dataset.id,
      couponIndex: 0,
      discount: null,id:"",
      codesBox: {}, codesId: "",
      zj: this.data.price
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    if (app.globalData.userId) {
      this.getList()
      this.getAugment()
    }
  },

  mag(msg){
    wx.showToast({
      title: msg,
      icon:'none'
    })
  },
  
  refer(){
    console.log(this.data.info)
    var info = this.data.info
    console.log(info)
    if (this.data.dat.address== null){
     this.mag("请选择地址")
     return
    }else if(this.data.date==''){
      this.mag("请选择服务时间")
      return
    } else if (this.data.info == ''){
      this.mag("商品不能为空")
      return
    }else{
      var date =new Date(this.data.date.replace(/-/g, "/")).getTime()/1000
      atOnceOrder({
        item_list: JSON.stringify(info),
        address_id: this.data.dat.address.id,
        yhq_id: this.data.id,
        codes_id: this.data.codesId,
        user_id: app.globalData.userId,
        memos: this.data.memos,
        form_id: this.data.formId,
        service_time:date
      }).then(res => {
        console.log(res)
        this.setData({ windows: true, order_info: res.order_info,})
      })
    }
    
    
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var dat=this.data.dat 
    var listBox = wx.getStorageSync('listBox')
    dat.address = listBox
    this.setData({ dat, listBox:listBox})
    wx.removeStorageSync('listBox')
    this.getUrseinfo()
    if (!listBox) {
      console.log(1111111)
      this.getList()
      this.getAugment()
    }
  },

  getUrseinfo() {
    var key = wx.getStorageSync('key') //登录成功返回id
    if (!key) {
      wx.showModal({
        content: '你还没有授权登录，不能获取个人资料？',
        showCancel: true,//是否显示取消按钮
        cancelColor: 'skyblue',//取消文字的颜色
        confirmColor: 'skyblue',//确定文字的颜色
        success: function (res) {
          if (res.cancel) {
            //点击取消,默认隐藏弹框
          } else {
            //点击确定
            wx.navigateTo({
              url: '/pages/wx_login/wx_login',
            })
          }
        },
      })
    } else {
      app.globalData.userId = key //登录成功返回id赋值给全局 
    }
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  augment(){ //商品添加按钮
    this.setData({
      shop_box:true
    })
  },

  cancel() { //商品取消按钮
    this.setData({
      shop_box: false
    })
  },
  getAugment(){ //接口数据
    item_list({
    }).then(res => {
      console.log(res)
      this.setData({ shop_dat: res.data, shopId: res.data[0].id })
      item_info({
        id: res.data[0].id
      }).then(res => {
        console.log(res)
        this.setData({ shop_guige: res.data })
      })
      console.log(this.data.shop_guige)
    })
  },

  print(e) { //商品按钮点击
    var that = this
    var id = e.currentTarget.dataset.id
    this.setData({ printIndex: e.currentTarget.dataset.index, onIndex:0})
    item_info({
      id: id
    }).then(res => {
      that.setData({ shop_guige: res.data, shopId: id })
      console.log(that.data.shopId)
    })
  },

  specification(e) {  //规格点击事件
    console.log(e)
    this.setData({
      onIndex: e.currentTarget.dataset.index,
      onId: e.currentTarget.dataset.onid,
    })
    console.log(this.data.onId)
  },

  mag(msg) {
    wx.showToast({
      title: msg,
      icon: 'none'
    })
  },

  add(){ // 确认添加
    if (this.data.printIndex == null) {
      this.mag('请选择商品')
      return
    } else if (this.data.onIndex == null) {
      this.mag('请选择商品规格')
      return
    } else {
      var info = this.data.info
      by_item_list({
        item_id: this.data.shopId ? this.data.shopId : this.data.shop_dat[0].id,
        guige_id: this.data.onId ? this.data.onId : this.data.shop_guige.guige[0].id
      }).then(res => {
        console.log(res)
        var price = 0
        price = Number(res.data.price) + Number(this.data.price)
        info.push(res.data)
        this.setData({ shop_box: false, info: info, price: price, zj: price, discount: null, couponIndex: 0, codeIndex: 0, id: "", codesBox: {}, codesId: ""})
      })
    }
    
    
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
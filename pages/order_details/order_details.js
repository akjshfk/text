// pages/order_details/order_details.js
const app = getApp();
import { checkOrder, tel, process_Wx_pay, delete_es, cancel_order } from '../../config/https.js'
const tool = require('../../config/tool.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info:{},
    windows:false,
    tel:"",
    options:{},
    staff:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({ options})
    checkOrder({
      order_id: options.id
    }).then(res=>{
      console.log(res)
      var info = res.info
      var staff = res.staff
      info.order.add_time = tool.u_formatTimestamp(info.order.add_time * 1000, { type: 'ymdhms' })
      info.order.service_time = tool.u_formatTimestamp(info.order.service_time * 1000, { type: 'ymd' })
      staff.repair_time = tool.u_formatTimestamp(staff.repair_time * 1000, { type: 'ymd' })
      this.setData({
        info: info, staff: staff
      })
      console.log(this.data.info)
    })
  },
  
  kefu(){ //客服
   tel({
   }).then(res=>{
     console.log(res)
     this.setData({
       windows:true,
       tel:res.tel
     })
   })
  },

  remove(e) {  //删除订单
    delete_es({
      user_id: app.globalData.userId,
      order_id: e.currentTarget.dataset.id
    }).then(res => {
      wx.showToast({
        title: res.info,
        icon: 'none'
      })
      setTimeout(()=>{
        wx.navigateBack({})
      }, 500)
    }).catch(err => {
      wx.showToast({
        title: err.info,
        icon: 'none'
      })
    })
  },

  cancel_order(e) { //取消订单 
    cancel_order({
      user_id: app.globalData.userId,
      order_id: e.currentTarget.dataset.id
    }).then(res => {
      console.log(res)
      wx.showToast({
        title: res.msg,
        icon:'none'
      })
      setTimeout(()=>{
       wx.navigateBack({})
      }, 500)
    })
  },

  confirm(){
    this.setData({windows: false,}) 
    wx.makePhoneCall({
      phoneNumber: this.data.tel,
    })
  },

  cancel(){
    this.setData({
      windows: false,
    }) 
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

  toPay(e) { //去支付
    console.log(e)
    process_Wx_pay({
      user_id: app.globalData.userId,
      total_price: e.currentTarget.dataset.realprices,
      order_number: e.currentTarget.dataset.order_number
    }).then(res => {
      console.log(res)
      wx.requestPayment({
        timeStamp: res.res.timeStamp,
        nonceStr: res.res.nonceStr,
        package: res.res.package,
        signType: res.res.signType,
        paySign: res.res.paySign,
        success(res) {
          console.log(res)
        }
      })
    })
  },

  checr(e) { //去评价
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/service_evaluation/service_evaluation?id=' + id,
    })
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
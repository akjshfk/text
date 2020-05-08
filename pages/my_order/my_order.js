// pages/my_order/my_order.js
const app = getApp();
import { AppointmentList, process_Wx_pay, cancel_order, delete_es } from '../../config/https.js'
const tool = require('../../config/tool.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listIndex:'',
    list:[],
    options:{},
    windows:false,
  },
  mag(msg){
  wx.showToast({
    title: msg,
    icon:'none'
  })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({ listIndex: options.id, options})
    // this.getlist()
  },
  getlist(){
    AppointmentList({
      user_id: app.globalData.userId,
      status: this.data.listIndex
    }).then(res => {
      console.log(res)
      var list= res.list, liso=[], nums=0
      for(let key in list){
        liso.push(list[key])
      }
      console.log(liso)
      this.setData({
        list: liso,
        nums: nums
      })
    })
  },

  kefu(){ //客服
    this.setData({windows:true})
  },

  cancel_order(e){ //取消订单 
    cancel_order({
      user_id: app.globalData.userId,
      order_id:e.currentTarget.dataset.id
    }).then(res=>{
      console.log(res)
      this.getlist()
    })
  },

  remove(e){  //删除订单
    var list = this.data.list, index = e.currentTarget.dataset.index
    delete_es({
      user_id: app.globalData.userId,
      order_id: e.currentTarget.dataset.id
    }).then(res => {
      wx.showToast({
        title: res.info,
        icon:'none'
      })
      list.splice(index,1)
      this.getlist()
    }).catch(err=>{
      wx.showToast({
        title: err.info,
        icon: 'none'
      })
    })
  },

  confirm() {
    var tel = this.data.options.tel
    this.setData({ windows: false, })
    wx.makePhoneCall({
      phoneNumber:tel,
    })
  },

  cancel() {
    this.setData({
      windows: false,
    })
  },

  checkt(e){  //去查看详情
    console.log(e)
    var id = e.currentTarget.dataset.id
    var status = e.currentTarget.dataset.status
      wx.navigateTo({
        url: '/pages/order_details/order_details?id=' + id + '&status=' + status,
      })
  },

  toPay(e){ //去支付
  console.log(e)
    process_Wx_pay({
      user_id: app.globalData.userId,
      total_price: e.currentTarget.dataset.realprices,
      order_number: e.currentTarget.dataset.order_number
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

  onClick(e) {
    console.log(e)
    this.setData({
      listIndex: e.currentTarget.dataset.id
    })
    this.getlist()
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
    this.getlist()
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
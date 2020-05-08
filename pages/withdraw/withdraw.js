// pages/withdraw/withdraw.js
const app = getApp();
import { show, commission_request } from '../../config/https.js';
const tool = require('../../config/tool.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    check: false, //银行卡取反
    checkes: true, //微信取反
    bank: false,  //选择银行卡取反
    name:"",//银行名字
    bankId: '',//银行id
    inp:"",//提现金额
    id:1,
    map:{},//数据
  },


  bank(e) {   //银行卡点击事件
  console.log(e)
    this.setData({ id: e.currentTarget.dataset.id })
    if (this.data.checkes == false) {
      this.setData({
        checkes: false
      })
    } else {
      this.setData({
        check: !this.data.check,
        checkes: !this.data.checkes,
        bank: !this.data.bank
      })
    }
  },

  WeChat(e) { //微信点击事件
    this.setData({ id: e.currentTarget.dataset.id })
    if (this.data.check == false) {
      this.setData({
        check: false
      })
    } else {
      this.setData({
        check: !this.data.check,
        checkes: !this.data.checkes,
        bank: !this.data.bank
      })
    }
  },

  moneys(e){ //输入要提现的金额
   console.log(e)
   this.setData({
     inp: e.detail.value
   })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    if (options.name!=undefined & options.id!=undefined){
      this.setData({ name: options.name, bankId: options.id, checkes: false, check: true, bank: true, id:2})
    }
    show({
      user_id: app.globalData.userId,
    }).then(res=>{
      console.log(res)
      this.setData({
        map:res.map
      })

    })
  },
  banks(){
    wx.redirectTo({
      url: '/pages/bank_es/bank_es',
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

  mag(msg){
   wx.showToast({
     title: msg,
     icon:'none'
   })
  },
  
  ensure() { //确定
    if (this.data.inp==''){
     this.mag('请输入提现金额')
     return
   }else{
    commission_request({
      user_id: app.globalData.userId,
      card_id:this.data.bankId,
      price: this.data.inp,
      type:this.data.id
    }).then(res=>{
      console.log(res)
      wx.showToast({
        title: res.info,
        icon:'none'
      })
    })
   }
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
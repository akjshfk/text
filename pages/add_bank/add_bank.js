// pages/add_bank/add_bank.js
const app = getApp();
import { add_MyBank, before_add_bank } from '../../config/https.js';
const tool = require('../../config/tool.js');
import Toast from '../../miniprogram_npm/_vant-weapp@0.5.7@vant-weapp/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
   name:'',
   code:'',
   isWindow:false,
   list:"",//银行名称数据
   bank_name: "",//银行名称
   bank_branch_address:"",//开户支行
  },

  banking(){
    this.setData({ isWindow:true})
  },

  onConfirm(event) {  //确定
    console.log(event)
    this.setData({
      isWindow: false,
      bank_name: event.detail.value,
      index: event.detail.index
    })
  },

  onCancel() {  //取消
    this.setData({
      isWindow: false
    })
  },

  bank(e){
    this.setData({
      bank_branch_address: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    before_add_bank({
    }).then(res=>{
      var list=[]
      res.list.forEach(item=>{
        list.push(item.bank_name)
      })
     this.setData({list:list})
    })
  },
  name(e) { //持卡人
   console.log(e)
   this.setData({
     name: e.detail.value
   })
  },
  code(e) { //卡号
    this.setData({
      code: e.detail.value
    })
  },

  mag(msg){
    wx.showToast({
      title: msg,
      icon:'none'
    })
  },


  butt(){ //绑定
   if(this.data.name==''){
     this.mag('请输入名字')
     return
   } else if (this.data.code == ''){
     this.mag('请输入银行卡号')
     return
   } else if (this.data.bank_name == ''){
      this.mag('请输入开户银行')
      return
   } else if (this.data.bank_branch_address == '') {
     this.mag('请输入开户行地址')
     return
   } else{
     add_MyBank({
       user_id: app.globalData.userId,
       card_owner: this.data.name,
       bank_number: this.data.code,
       bank_name: this.data.bank_name,
       bank_branch_address: this.data.bank_branch_address
     }).then(res=>{
       console.log(res)
       wx.navigateBack({})
     })
   }
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
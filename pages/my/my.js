// pages/my/my.js
const app = getApp();
import { user_index, Judgment_application, partner_index, update_user_info } from '../../config/https.js'
const tool = require('../../config/tool.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    backdrop:'https://zczj.0791jr.com/data/attachment/wode.png',
    res:{},
    member:{},
    windows:false,
    tel:null,
    status:null,
    men:{},
    dianji:null,
    ber:null,
    actImg:""
  },

  cooperative(){
   wx.navigateTo({
     url: '/pages/distributor/distributor',
   })
  },

  head_portrait(){//跳转到个人质料
    wx.navigateTo({
      url: '/pages/personal_information/personal_information',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  getUrseinfo(){
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
      var userInfo = wx.getStorageSync('userInfo')
      console.log(userInfo)
      // update_user_info({
      //   url: userInfo.avatarUrl,
      //   nickname: userInfo.nickName,
      //   user_id: app.globalData.userId
      // }).then(res => {
      //   console.log(res)
        
      // })
      Judgment_application({
        user_id: app.globalData.userId
      }).then(res => {
        console.log(res)
        this.setData({
          status: res.data.status,
          dianji: res.data.dianji
        })
      })
      this.getList()
    }
  },


  indent(e){
    console.log(e)
    var id = e.currentTarget.dataset.id
    var tel=this.data.tel
    wx.navigateTo({
      url: '/pages/my_order/my_order?id='+id+'&tel='+tel,
    })
  },

  discounts(){
    wx.navigateTo({
      url: '/pages/discount/discount',
    })
  },

  product() {
    wx.navigateTo({
      url: '/pages/my_product/my_product',
    })
  },

  partner(){
    if (this.data.status==null){
      wx.navigateTo({
        url: '/pages/cooperative/cooperative',
      })
    }else{
      wx.navigateTo({
        url: '/pages/audit/audit?status=' + this.data.status,
      })
    }
    
  },
  
  idea_feedback(){
    wx.navigateTo({
      url: '/pages/idea_feedback/idea_feedback',
    })
  },

  address(){
    wx.navigateTo({
      url: '/pages/address/address',
    })
  },
  we(){ //关于我们
    wx.navigateTo({
      url: '/pages/we/we',
    })
  },
  
  tel(){ //客服电话
    this.setData({ windows:true})
  },
  cancel() { //客服取消电话
    this.setData({ windows: false })
  },
  confirm() { //客服取消电话
    wx.makePhoneCall({
      phoneNumber: this.data.tel //仅为示例，并非真实的电话号码
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  getList(){
    partner_index({
      user_id: app.globalData.userId
    }).then(res=>{
      console.log(res)
      this.setData({men:res})
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getUrseinfo()
    if (app.globalData.userId){
      user_index({
        user_id: app.globalData.userId
      }).then(res => {
        console.log(res)
        this.setData({
          res: res,
          member:res.member,
          actImg: res.member.img,
          tel: res.tel
        })
      })
      // setTimeout(() => {
      //   if (this.data.member.is_distribute == 1 & this.data.dianji == 1) {
      //     this.setData({ ber: 1 })
      //   }
      // }, 300)
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
// pages/personal_information/personal_information.js
const app = getApp();
import { user_index, mobile, my_information, edit_information } from '../../config/https.js'
const tool = require('../../config/tool.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    member:{},
    birthday:'',
    phone:"",
    six:"",
    window:false,
    isIcon: false,
    icon: false
  },

  select() { //性别女点击事件
    this.setData({
      window: !this.data.window,
      icon: !this.data.icon,

    })
    if (this.data.icon == true) {
      this.setData({
        six: 0,
        isIcon: false
      })
    }
    console.log(this.data.sex)
  },
  selectList() { //性别男点击事件
    this.setData({
      window: !this.data.window,
      isIcon: !this.data.isIcon,
    })
    if (this.data.isIcon == true) {
      this.setData({
        six: 1,
        icon: false
      })
    }
    console.log(this.data.sex)
  },
  
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    user_index({
      user_id: app.globalData.userId
    }).then(res=>{
      console.log(res)
      this.setData({
        member: res.member
      })
    })
  },
  
  phone(e){
    console.log(e)
    this.setData({ phone: e.detail.value})
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  getPhoneNumber(e) {
    var that=this
    wx.login({
      success: function (res) {
        // console.log(res)
        mobile({
          code: res.code,
          encryptedData: e.detail.encryptedData,
          iv: e.detail.iv
        }).then(res => {
          console.log(res)
          that.setData({ phone: res.errCode.phoneNumber})
        })
      }
    })
    
  },
  
  bindDateChange(e){
   console.log(e)
    this.setData({ birthday: e.detail.value})
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    my_information({
      user_id: app.globalData.userId,
    }).then(res=>{
      console.log(res)
      this.setData({ phone: res.info.mobile, birthday: res.info.birthday, six: res.info.sex})
    })
  },

  six(e){
    console.log(e)
    this.setData({
      window: true
    })
  },

  butt(){
    if (!(/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/).test(this.data.phone)){
       wx.showToast({
         title: '请输入正确的手机号码',
         icon:'none'
       })
    }else{
      edit_information({
        user_id: app.globalData.userId,
        mobile: this.data.phone,
        // birthday: this.data.birthday,
        // sex:this.data.six
      }).then(res => {
        console.log(res)
        setTimeout(()=>{
          wx.navigateBack({})
        }, 500)
        wx.showToast({
          title: res.msg,
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
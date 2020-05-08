// pages/cooperative/cooperative.js
const app = getApp()
import { Application } from '../../config/https.js';
var WxParse = require('../../wxParse/wxParse.js');
const tool = require('../../config/tool.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },

  site() { //地址
    wx.chooseLocation({
      success: res => {
        console.log(res)
        this.setData({
          site: res.address,
          latitude: res.latitude,
          longitude: res.longitude,
        })
      },
      fail: res => {
        if (res.errMsg == "chooseLocation:fail auth deny") {
          Dialog.confirm({
            confirmButtonOpenType: "openSetting",
            message: '获取微信定位失败，请授权小程序获取位置信息'
          }).then(res => {
            // console.log(res)
          }).catch(err => {
            // console.log(err)
          });
        }
      }
    })
  },
  mag(msg){
   wx.showToast({
     title: msg,
     icon:'none'
   })
  },
   
  formSubmit(e){
    console.log(e)
    var op = e.detail.value
    if (op.shperson == '') {
      this.mag('姓名不能为空')
      return
    } else if (op.mobile == '') {
      this.mag('电话不能为空')
      return
    } else if (!tool.u_Reg(op.mobile, 'phone')) {
      this.mag('请输入正确的电话号码')
      return
    } else if (op.site == '') {
      this.mag('地址不能为空')
      return
    } else if (op.min_address == '') {
      this.mag('地址详情不能为空')
      return
    } else {
      Application({
        name: op.shperson,
        mobile: op.mobile,
        address: op.site,
        address_info: op.min_address,
        user_id: app.globalData.userId
      }).then(res=>{
        console.log(res)
        wx.navigateBack({
          
        })
        wx.showToast({
          title: res.data,
          icon:'none'
        })
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
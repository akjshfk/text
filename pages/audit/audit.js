// pages/audit/audit.js
const app = getApp();
import { dianji } from '../../config/https.js';
const tool = require('../../config/tool.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    backdrop:'https://zczj.0791jr.com/data/attachment/audit.png',
    status:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({ status: options.status})
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  anew(){
    wx.redirectTo({
      url: '/pages/cooperative/cooperative',
    })
  },

  ascertain(){ //审核成功
    dianji({
      dianji:1,
      user_id: app.globalData.userId,
    }).then(res=>{
      console.log(res)
    })
    wx.redirectTo({
      url: '/pages/distributor/distributor',
    })
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
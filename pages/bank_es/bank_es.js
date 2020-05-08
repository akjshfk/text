// pages/bank_es/bank_es.js
const app = getApp();
import { select_bank } from '../../config/https.js';
const tool = require('../../config/tool.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
   list:[],
   imtIndex:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    select_bank({
      user_id: app.globalData.userId,
    }).then(res=>{
      this.setData({list:res.list})
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  bank_tap(e){
   console.log(e)
    var index = e.currentTarget.dataset.index
    var id = e.currentTarget.dataset.id
    var name = e.currentTarget.dataset.name
    this.setData({ imtIndex:index})
    wx.redirectTo({
      url: '/pages/withdraw/withdraw?id='+id+'&name='+name,
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
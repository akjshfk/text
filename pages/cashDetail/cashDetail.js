// pages/cashDetail/cashDetail.js
const app = getApp();
import { commission_detail } from '../../config/https.js';
const tool = require('../../config/tool.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    commission_detail({
      user_id: app.globalData.userId,
      page:1,
      size:4
    }).then(res=>{
     console.log(res)
      var list= res.list
      list.forEach(item=>{
        item.time = tool.u_formatTimestamp(item.time * 1000, { type: 'ymdhm' });
      })
     this.setData({list:list})
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
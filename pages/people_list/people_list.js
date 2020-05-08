// pages/people_list/people_list.js
const app = getApp()
import { look_list } from '../../config/https.js';
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
    console.log(options)
    look_list({
      huodong_id: options.id
    }).then(res => {
      var list= res.list
      list.forEach(item=>{
        item.add_time = tool.u_formatTimestamp(item.add_time * 1000, { type: 'ymdhm' });
      })
      this.setData({
        list:list
      })
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
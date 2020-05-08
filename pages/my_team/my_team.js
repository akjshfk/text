// pages/my_team/my_team.js
const app = getApp();
import { my_partner } from '../../config/https.js'
const tool = require('../../config/tool.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    start_time:"",//开始时间
    end_time:"",//结束时间
    box:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    my_partner({
      user_id: app.globalData.userId,
      // start_time: start_time,
      // end_time: end_time
    }).then(res=>{
      console.log(res)
      var list = res.member
      var box = res
      list.forEach(item => {
        item.add_distribute = tool.u_formatTimestamp(item.add_distribute * 1000, { type: 'ymdhm' });
      })
      this.setData({ list: list, box})
    })
  },

  bindDateChange(e){
   console.log(e)
   this.setData({
     start_time: e.detail.value
   })
  },

  bindDate(e){
    console.log(e)
    var start = new Date(this.data.start_time.replace(/-/g, "/")).getTime()/1000
    var end = new Date(e.detail.value.replace(/-/g, "/")).getTime()/1000
    my_partner({
      user_id: app.globalData.userId,
      start_time: start,
      end_time: end
    }).then(res => {
      console.log(res)
      var list = res.member
      list.forEach(item => {
        item.add_distribute = tool.u_formatTimestamp(item.add_distribute * 1000, { type: 'ymdhm' });
      })
      this.setData({ list: list })
    })
    this.setData({end_time: e.detail.value})
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
    console.log(new Date('2018-09-03 15:46:13'.replace(/-/g, "/")).getTime())
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
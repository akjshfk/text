// pages/welfare/welfare.js
const app=getApp()
import { activities, new_activities_list} from '../../config/https.js'
const tool = require('../../config/tool.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[]
  },
   
  check(e){
    var id = e.currentTarget.dataset.id
    var is_huodong = e.currentTarget.dataset.is_huodong
    wx.navigateTo({
      url: '/pages/activity_details/activity_details?id=' + id + '&is_huodong=' + is_huodong
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // activities({
    // }).then(res=>{
    //   console.log(res)
    //   var list=res.list
    //   list.forEach(item=>{
    //     item.start_time = tool.u_formatTimestamp(item.start_time * 1000, { type: 'ymdhm' });
    //     item.add_time = tool.u_formatTimestamp(item.add_time * 1000, { type: 'ymdhm' });
    //   })
    //   this.setData({
    //     list:list
    //   })
    // })
    
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
    new_activities_list({
    }).then(res => {
      console.log(res)
      var list = res.$res
      list.forEach(item => {
        item.start_time = tool.u_formatTimestamp(item.start_time * 1000, { type: 'ymdhm' });
        item.add_time = tool.u_formatTimestamp(item.add_time * 1000, { type: 'ymdhm' });
      })
      this.setData({
        list: list
      })
    })
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
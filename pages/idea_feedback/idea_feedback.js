// pages/idea_feedback/idea_feedback.js
const app = getApp();
import { Feedback } from '../../config/https.js'
const tool = require('../../config/tool.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  oninput(e){
    console.log(e)
    this.setData({
      content: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  
  submitTap(){
    if (this.data.content == null || this.data.content == ''){
     wx.showToast({
       title: '请输入您的反馈意见',
       icon:'none'
     })
    }else{
      Feedback({
        user_id: app.globalData.userId,
        info: this.data.content
      }).then(res=>{
        console.log(res)
        setTimeout(() => {
          wx.navigateBack({})
        }, 500)
        wx.showToast({
          title: res.msg,
          icon:'none'
        })
      }).catch(res=>{
        wx.showToast({
          title: res.msg,
          icon: 'none'
        })
      })
    }
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
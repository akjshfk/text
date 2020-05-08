// pages/activity_list/activity_list.js
const app=getApp()
import { article_info, article_collect, cancel_collect} from '../../config/https.js';
var WxParse = require('../../wxParse/wxParse.js');
const tool = require('../../config/tool.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
   list:{},
   collect:"",
   options:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ options})
    
  },

  getList(){
    var that = this
    article_info({
      user_id: app.globalData.userId,
      id: this.data.options.id
    }).then(res => {
      console.log(res)
      var list = res.article
      list.add_time = tool.u_formatTimestamp(list.add_time * 1000, { type: 'ymdhm' });
      this.setData({ list: res.article, collect: res.collect })
      var article = res.article.info;
      WxParse.wxParse('article', 'html', article, that, 5)
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  
  dainzan(){ //点赞
    article_collect({
      user_id: app.globalData.userId,
      id: this.data.options.id
    }).then(res=>{
    console.log(res)
        this.getList()
        wx.showToast({
          title: res.mag,
        })
      }).catch(res => {
        wx.showToast({
          title: res.mag,
        })
      })
  },

  cancel(e) {//取消点赞
    console.log(e)
    var id = e.currentTarget.dataset.id
    cancel_collect({
      id: id,
      user_id: app.globalData.userId
    }).then(res => {
      console.log(res)
      this.getList()
      wx.showToast({
        title: res.mag,
      })
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getList()
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
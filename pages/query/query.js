// pages/query/query.js
const app=getApp();
import { article_list, article_list_article} from '../../config/https.js'
const tool = require('../../config/tool.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    idIndex:0,
    cate_id:null,
    article:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    article_list({
    }).then(res => {
      console.log(res)
      var list = res.list
      this.setData({ list: list, cate_id: list[0].id })
      article_list_article({
        cate_id: list[0].id
      }).then(res => {
        console.log(res)
        var article = res.article
        article.forEach(item => {
          item.add_time = tool.u_formatTimestamp(item.add_time * 1000, { type: 'ymdhm' });
        })
        this.setData({
          article: article
        })
      })
      
    })
  },

  details(e){ //点击去详情
   console.log(e)
   var id=e.currentTarget.dataset.id
   wx.navigateTo({
     url: '/pages/activity_list/activity_list?id='+id,
   })
  },

  getList(){ //获取数据
    article_list_article({
      cate_id: this.data.cate_id
    }).then(res=>{
      console.log(res)
      var article=res.article
      article.forEach(item=>{
        item.add_time = tool.u_formatTimestamp(item.add_time * 1000, { type: 'ymdhm' });
      })
      this.setData({
        article:article
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
  onclick(e){
    console.log(e)
    this.setData({
      idIndex: e.currentTarget.dataset.index,
      cate_id: e.currentTarget.dataset.id
    })
    this.getList()
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
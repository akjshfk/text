// pages/Orderdetail/Orderdetail.js
const app = getApp();
import { partner_list } from '../../config/https.js';
const tool = require('../../config/tool.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    start_time:"",//开始时间
    end_time:"",
    status:'',
    start:"",
    end:"",
    num:"",//单数
    rental:"",//总额
    list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getList()
  },

  getList(){
    partner_list({
      user_id: app.globalData.userId,
      start_time: this.data.start,
      end_time: this.data.end,
      status: this.data.status
    }).then(res => {
      console.log(res)
      var list = res.list, rental = 0, predict=0
      for(var i=0; i<list.length; i++){
        list[i].add_time = tool.u_formatTimestamp(list[i].add_time * 1000, { type: 'ymdhm' });
        if (list[i].status==1){
          predict += Number(list[i].commission)
        } else if (list[i].status == 8){
          rental += Number(list[i].commission)
        }
      }
      console.log(rental)
      this.setData({
        list: list, rental: rental.toFixed(2), predict: predict.toFixed(2),
        num:list.length
      })
    })
  },

  onClick(e){
   console.log(e)
   if (e.detail.index==0){
     this.setData({ status:''})
     this.getList()
   } else if (e.detail.index == 1){
     this.setData({ status:1 })
     this.getList()
   }else{
     this.setData({ status: 8 })
     this.getList()
   }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  bindDateChange(e) {
    console.log(e)
    this.setData({
      start_time: e.detail.value
    })
  },

  bindDate(e) {
    console.log(e)
    var start = new Date(this.data.start_time.replace(/-/g, "/")).getTime()
    var end = new Date(e.detail.value.replace(/-/g, "/")).getTime()
    partner_list({
      user_id: app.globalData.userId,
      start_time: start,
      end_time: end,
      status:this.data.status
    }).then(res => {
      console.log(res)
      var list = res.list
      list.forEach(item => {
        item.add_time = tool.u_formatTimestamp(item.add_time * 1000, { type: 'ymdhm' });
      })
      this.setData({ list: list })
    })
    this.setData({ end_time: e.detail.value, start: start, end:end })
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
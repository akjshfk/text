// pages/subscribe/subscribe.js
const app = getApp();
import { item_list, item_info} from '../../config/https.js'
var WxParse = require('../../wxParse/wxParse.js');
const tool = require('../../config/tool.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dat:{},
    datt:[],
    onIndex:0,
    printIndex:0,
    id:null,
    onId:null,
    price:""
  },

  print(e){
    console.log(e)
    var that=this
    var id = e.currentTarget.dataset.id
    this.setData({ printIndex: e.currentTarget.dataset.index, onIndex:0 })
    item_info({
      id:id
    }).then(res=>{
      console.log(res)
      var article = res.data.info;
      WxParse.wxParse('article', 'html', article, that, 5) 
      that.setData({ datt: res.data, id: id, price: res.data.guige[0].price})
    })
  },

  specification(e) {  //规格点击事件
  console.log(e)
    this.setData({ 
      onIndex: e.currentTarget.dataset.index,
      onId: e.currentTarget.dataset.onid,
      price: e.currentTarget.dataset.price,
    })
  },

  mag(msg){
  wx.showToast({
    title: msg,
    icon:'none'
  })
  },

  order(){
    if (this.data.printIndex==0){
      var id = this.data.dat[0].id
    }else{
      var id = this.data.id
    } 
    if (this.data.onIndex ==0){
      var onId = this.data.datt.guige[0].id
    }else{
      var onId = this.data.onId
    }
    wx.navigateTo({
      url: '/pages/subscribe_rinse/subscribe_rinse?id='+id + '&onId='+onId,
    }) 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    item_list({
    }).then(res=>{
      console.log(res)
      that.setData({ dat: res.data, id: res.data[0].id})
      item_info({
        id: res.data[0].id
      }).then(res => {
        console.log(res)
        var article = res.data.info;
        WxParse.wxParse('article', 'html', article, that, 5)
        that.setData({ datt: res.data, price: res.data.guige[0].price})
      })
      console.log(that.data.datt)
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
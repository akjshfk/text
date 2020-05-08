// pages/bank/bank.js
const app = getApp();
import { del_bank, my_bank} from '../../config/https.js';
const tool = require('../../config/tool.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    backdrop: 'https://zczj.0791jr.com/data/attachment/ban.png',
    windows:false,
    list:[],
    id:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
  },

  add_bank(){
   wx.navigateTo({
     url: '/pages/add_bank/add_bank',
   })
  },
  
  getList(){
    my_bank({
      user_id: app.globalData.userId,
    }).then(res => {
      console.log(res)
      this.setData({ list: res.list })
    }).catch(res=>{
      console.log(res)
      this.setData({ list: res.list })
    })
    
  },


  relieve(e) {//弹窗出现
  console.log(e)
    this.setData({ windows: true, id: e.currentTarget.dataset.id})
  },
  cancel(){//弹窗取消
    this.setData({ windows: false})
  },
  add(){
   wx.navigateTo({
     url: '/pages/add_bank/add_bank',
   })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  confirm(){ //解除绑定确定按钮
    del_bank({
      user_id: app.globalData.userId,
      card_id:this.data.id
    }).then(res=>{
      this.setData({ windows: false})
      this.getList()
    })
  },

  backtrack(){ //返回上一个页面
    wx.reLaunch({
      url:'/pages/withdraw/withdraw'
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
// pages/Preferential_center/Preferential_center.js
const app = getApp();
const tool = require('../../config/tool.js');
import { coupon_list} from '../../config/https.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
   dat:"",
    ldb_code: 'https://zczj.0791jr.com/data/attachment/used.png',
    code: "https://zczj.0791jr.com/data/attachment/unused.png",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  getList() {
    coupon_list({
      user_id: app.globalData.userId
    }).then(res => {
      console.log(res)
      var dat = res
      dat.yhq_info.forEach(item => {
        item.start_time = tool.u_formatTimestamp(item.start_time * 1000, { type: 'ymd' });
        item.end_time = tool.u_formatTimestamp(item.end_time * 1000, { type: 'ymd' });
      })
      this.setData({
        dat: res
      })
      console.log(this.data.dat.user_yhq)
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  discount(){
   wx.navigateTo({
     url: '/pages/discount/discount',
   })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getUrseinfo()
    if (app.globalData.userId){
      this.getList()
    }
    
  },

  getUrseinfo() {
    var key = wx.getStorageSync('key') //登录成功返回id
    if (!key) {
      wx.showModal({
        content: '你还没有授权登录，不能获取个人资料？',
        showCancel: true,//是否显示取消按钮
        cancelColor: 'skyblue',//取消文字的颜色
        confirmColor: 'skyblue',//确定文字的颜色
        success: function (res) {
          if (res.cancel) {
            //点击取消,默认隐藏弹框
          } else {
            //点击确定
            wx.navigateTo({
              url: '/pages/wx_login/wx_login',
            })
          }
        },
      })
    } else {
      app.globalData.userId = key //登录成功返回id赋值给全局 
    }
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
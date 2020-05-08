//index.js
//获取应用实例
const app = getApp()
import { index, wx_login} from '../../config/https.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img: [],
    height:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getList()
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

  getList() {
    index({
    }).then(res => {
      console.log(res)
      this.setData({
        img: res.ad
      })
    })
  },

  handle(e) {
    wx.navigateTo({
      url: '/pages/Preferential_center/Preferential_center',
    })
  },


  toList(e) { //门店列表
    wx.navigateTo({
      url: '/pages/shop_list/shop_list',
    })
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  rinse() { //预约服务
    wx.navigateTo({
      url: '/pages/subscribe/subscribe',
    })
  },

  query() { //自助查询
    wx.navigateTo({
      url: '/pages/query/query',
    })
  },
  //获取轮播高度
  imgHeight: function (e) {
    console.log(e)
    var winWid = wx.getSystemInfoSync().windowWidth; //获取当前屏幕的宽度
    var imgh = e.detail.height+'rpx'; //图片高度
    var imgw = e.detail.width; //图片宽度
    var swiperH = (winWid * imgh / imgw) -10 + "px"
    this.setData({
      height: swiperH//设置高度
    })
  },

  member() {
    wx.navigateTo({
      url: '/pages/member/member',
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
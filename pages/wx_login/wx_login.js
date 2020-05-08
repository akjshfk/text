// pages/wx_login/wx_login.js
const app=getApp()
import { wx_login} from '../../config/https.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    options:{},
  },

  getUserInfo(e) {
    console.log(e)
    var userInfo = e.detail.userInfo
    wx.setStorageSync('userInfo', userInfo)
    if (e.detail.userInfo != undefined) {
      var that = this
      wx.login({
        success: function (res) {
          console.log(res)
          var code=res.code
          wx.request({
            url: 'https://zczj.0791jr.com/app.php?m=App&c=Login&a=wx_login',
            // method:"POST",
            // header: {
            //   'content-type': 'application/x-www-form-urlencoded' // 默认值
            // },
            data: {
              code:code
            },
            success: function (res) {
              console.log(res)
              if (res.data.code == 204) {
                wx.redirectTo({
                  url: '/pages/wx_login/wx_login'
                })
              } else if (res.data.code == "200") {
                if (that.data.options.activity == 1 || that.data.options.activity=='1'){
                  var key = res.data.user_id
                  wx.setStorageSync('key', key)
                  wx.redirectTo({
                    url: '/pages/activity_details/activity_details?id=' + that.data.options.id + '&is_huodong=' + that.data.options.activity
                  })
                }else{
                  var key = res.data.user_id
                  wx.setStorageSync('key', key)
                  console.log(key)
                  wx.navigateBack({})
                }
                
              }
            }
          })
        }
      })
    }
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({options})
 
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
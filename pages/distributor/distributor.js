// pages/distributor/distributor.js
const app = getApp();
import { partner_info, get_qrcode } from '../../config/https.js'
const tool = require('../../config/tool.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    backdrop: 'https://zczj.0791jr.com/data/attachment/wode.png',
    dat:null,
    imgt: 'https://zczj.0791jr.com/data/attachment/code.png',
    arr:[]
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    partner_info({
      user_id: app.globalData.userId
    }).then(res=>{
      console.log(res)
      this.setData({
        dat: res
      })
    })
  },

  //这是一个封装好的方法  
  promisify: function (api) {
    return (options, ...params) => {
      return new Promise((resolve, reject) => {
        const extras = {
          success: resolve,
          fail: reject
        }
        api({ ...options, ...extras }, ...params)
      })
    }
  },

  bank(){ //跳转银行卡
   wx.navigateTo({
     url: '/pages/bank/bank',
   })
  },

  QR_code(){
    console.log(1)
   this.getImg()
  },

  getImg(){
    var that = this, arr = []
    wx.showLoading({
      title: '请稍后...',
    })
    get_qrcode({
      user_id: app.globalData.userId
    }).then(res => {
      wx.getImageInfo({  //转化成jpeg图片
        src: res.img,
        success(res) {
          console.log(res)
          var image_es = res.path
          const wxGetImageInfo = that.promisify(wx.getImageInfo)
          wxGetImageInfo({
            src: that.data.imgt
          }).then(res => {
            const ctx = wx.createCanvasContext('canv')
            ctx.drawImage(res.path, 0, 0, Math.floor(270), Math.floor(450))
            ctx.drawImage(image_es, Math.floor(12), Math.floor(386), 36, 36)
            ctx.setFillStyle('#333')//字体颜色
            ctx.setFontSize(10)//字体大小
            ctx.fillText("扫一扫，立即下单预约清洗", Math.floor(100), Math.floor(415))
            ctx.setFillStyle('#FFFFFF')//字体颜色
            ctx.fillText("众 / 超 / 之 / 家 / 家 / 电 / 清 / 洗", Math.floor(55), Math.floor(443))
            ctx.draw(false, () => {
              wx.canvasToTempFilePath({  //将画布转化成图片
                canvasId: "canv",
                fileType: 'jpg',
                success(res) {
                  wx.hideLoading()
                  arr.push(res.tempFilePath)
                  wx.previewImage({  //图片放大预览
                    current: arr[0],
                    urls:arr,
                  })
                }
              })
            })
          })
        }
      })
    })
  },

  preview() {
    let arr=[]
    arr.push(this.data.fxcode)
    wx.previewImage({
      urls: arr,
      current:this.data.fxcode
    })
  },
  Distribution_details() { //订单详情
    wx.navigateTo({
      url: '/pages/Orderdetail/Orderdetail',
    })
  },

  my_team() {//我的团队
    wx.navigateTo({
      url: '/pages/my_team/my_team',
    })
  },
  
  withdraw(){//申请明细
    wx.navigateTo({
      url: '/pages/withdraw/withdraw',
    })
  },
  withdraw_detail(){//提现明细
    wx.navigateTo({
      url: '/pages/cashDetail/cashDetail',
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
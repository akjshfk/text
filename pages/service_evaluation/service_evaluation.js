// pages/service_evaluation/service_evaluation.js
const app = getApp();
import { appraise_order, uoload_photo } from '../../config/https.js'
const tool = require('../../config/tool.js');
const apii = require('../../config/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // arr: [{ name: '服务很棒' }, { name: '服务很棒' }, { name: '服务很棒' }, { name: '服务很棒' }, { name: '服务很棒' }, { name: '服务很棒' },]
    num:'',
    opinion:"",
    options:"",
    upload:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({ options})
    
  },

  zengjia(){ //增加图片
    var that = this
    var upload = that.data.upload
    var aqq = that.data.aqq
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'],
      // sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        console.log(res)
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        console.log('本地图片的路径:', tempFilePaths)
        wx.uploadFile({
          url: apii.baseUrl + 'm=App&c=order&a=uoload_photo',
          filePath: tempFilePaths[0],
          file: 'file',
          name: 'file',
          order_id: that.data.options.id,
          formData: {
            //和服务器约定的token, 一般也可以放在header中 
            user: 'test',
          },
          success: function (res) {         //上传成功返回数据
            console.log('上传成功返回的数据', res)
            aqq.push(JSON.parse(res.data).data);
            console.log(aqq)
            that.setData({ aqq })
          },

        })
        upload.push(tempFilePaths[0])
        that.setData({
          upload
        })
        console.log(that.data.upload)
      }
    })
  },

  publish(){
    if (this.data.num==''){
     wx.showToast({
       title: '请点小星星',
       icon:"none"
     })
    } else if (this.data.opinion==""){
      wx.showToast({
        title: '亲！评价不能为空哦？',
        icon: "none"
      })
   }else{
      appraise_order({
        user_id: app.globalData.userId,
        xingxing: this.data.num,
        info: this.data.opinion,
        order_id: this.data.options.id
      }).then(res => {
        console.log(res)
        wx.showToast({
          title: res.msg,
          icon: "none"
        })
        setTimeout(()=>{
          wx.navigateBack({})
        }, 600)
      }).catch(err=>{
        wx.showToast({
          title: err.msg,
          icon: "none"
        })
      })
   }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  
  opinion(e){
   console.log(e)
    this.setData({ opinion: e.detail.value})
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  
  onChange(e){
   console.log(e)
    this.setData({ num: e.detail})
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
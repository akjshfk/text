// pages/address_es/address_es.js
const app = getApp();
import { add_address, address_edit, address_info } from '../../config/https.js';
const tool = require('../../config/tool.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    site:'',
    options:{},
    list:[],
    latitude:"",
    longitude:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({ options})
    address_info({
      id: options.id
    }).then(res=>{
      console.log(res)
      this.setData({
        list:res.list,
        site: res.list.address,
        latitude: res.list.latitude,
        longitude: res.list.longitude
      })
    })
  },

  site(){ //地址
    wx.chooseLocation({
      success: res => {
        console.log(res)
        this.setData({
          site: res.address,
          latitude: res.latitude,
          longitude: res.longitude,
        })
      },
      fail: res => {
       console.log(res)
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  mag(msg){
    wx.showToast({
      title: msg,
      icon:'none'
    })
  },

  formSubmit(e){
   console.log(e)
   var op = e.detail.value
    if (op.shperson==''){
      this.mag('姓名不能为空')
      return
    } else if (op.mobile==''){
      this.mag('电话不能为空')
      return
    } else if (!tool.u_Reg(op.mobile, 'phone')) {
      this.mag('请输入正确的电话号码')
      return
    } else if (op.site == '') {
      this.mag('地址不能为空')
      return
    } else if (op.min_address == '') {
      this.mag('地址详情不能为空')
      return
    }else{
      if(this.data.options.id==undefined){
        add_address({ //添加地址提交
          user_id: app.globalData.userId,
          person: op.shperson,
          mobile: op.mobile,
          address: op.site,
          min_address: op.min_address,
          latitude: this.data.latitude,
          longitude: this.data.longitude
        }).then(res => {
          console.log(res)
          wx.showToast({
            title: res.msg,
            icon: "none"
          })
          setTimeout(() => {
            wx.navigateBack({})
          }, 500)
        })
      }else{
        address_edit({  //编辑提交
          user_id: app.globalData.userId,
          person: op.shperson,
          mobile: op.mobile,
          address: op.site,
          min_address: op.min_address,
          id: this.data.options.id,
          default_a:1,
          latitude: this.data.latitude,
          longitude: this.data.longitude
        }).then(res=>{
          console.log(res)
          wx.showToast({
            title: res.msg,
            icon:"none"
          })
          setTimeout(()=>{
            wx.navigateBack({})
          }, 500)
         
        })
      }
     
    }
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
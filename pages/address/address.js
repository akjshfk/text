// pages/address/address.js
const app=getApp();
import { address_list, address_default, address_Delete} from '../../config/https.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],//数据
    options:{}
  },
  add(){
    wx.navigateTo({
      url: '../address_es/address_es',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({ options})
  },
  
  getList(){ //地址列表
    address_list({
      user_id: app.globalData.userId
    }).then(res => {
      console.log(res)
      this.setData({ list: res.list })
    }).catch(res => {
      wx.showToast({
        title: res.msg,
        icon: 'none'
      })
    })
  },

  addre(e){ //编辑 
  console.log(e)
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../address_es/address_es?id='+id,
    })
  },

  selectList(e){//默认地址
  var index=e.currentTarget.dataset.index, list=this.data.list
  if(this.data.options.qz==1){
    address_default({
      user_id: app.globalData.userId,
      id: e.currentTarget.dataset.id
    }).then(res => {
      console.log(res)
      var listBox=list[index]
      wx.setStorageSync('listBox', listBox)
      this.getList()
      setTimeout(()=>{
        wx.navigateBack({})
      }, 1000)
    })
  }else{
    address_default({
      user_id: app.globalData.userId,
      id: e.currentTarget.dataset.id
    }).then(res => {
      this.getList()
    })
  }
  
  },
  
  del(e){  //删除地址
   console.log(e)
   var id=e.currentTarget.dataset.id
   var index=e.currentTarget.dataset.index
   var list=this.data.list
    address_Delete({
      user_id: app.globalData.userId,
      id: e.currentTarget.dataset.id
    }).then(res=>{
      console.log(res)
      list.splice(index,1)
      this.setData({list})
      wx.showToast({
        title: res.msg,
        icon:"none"
      })
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  // site(e){
  // var index=e.currentTarget.dataset.index
  // var list=this.data.list
  // var sites=list[index]
  // console.log(sites)
  // wx.redirectTo({
  //   url: '/pages/subscribe_rinse/subscribe_rinse?sites=' + sites,
  // })
  // },

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
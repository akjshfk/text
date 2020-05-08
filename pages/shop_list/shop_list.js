// pages/shop_list/shop_list.js
const app = getApp()
import { shop_list, shop_grabble} from '../../config/https.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    distance:"",
    inputKey:"",
    lat:"",
    log:""
  },

  //实时监听输入框的值，并赋值给inputKey
  inputVal(e) {
    var inputKey = e.detail.value
    if (inputKey == '' || inputKey == null) {
      // this.setData({ list: [] })
    }
    this.setData({
      inputKey: inputKey,
    })
    console.log(this.data.inputKey)
  },

  //点击×清空input输入的值  
  resetInputKey() {
    this.setData({
      inputKey: '',
      history_empty: true,
    });
    this.getList()
    console.log(this.data.inputKey)
  },

  search(){
    shop_grabble({
      // longitude:this.data.log,
      // latitude:this.data.lat,
      name: this.data.inputKey
    }).then(res=>{
      console.log(res)
      var list=res.list
      list.forEach(item => {
        if (item.juli >= 1000) {
          item.juli = (item.juli / 1000).toFixed(2) + 'k'
        }
        this.setData({ list: list})
      })
      // this.setData({list:list})
    })
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getList()
    
  },

  getList(){
    var that = this
    shop_list({

    }).then(res => {
      console.log(res)
      var list = res.list
      list.forEach(item => {
        if (item.juli >= 1000) {
          item.juli = (item.juli / 1000).toFixed(2) + 'k'
        }
        that.setData({ list: list, res: res })
      })
    }) 
  },

  // distance: function (la1, lo1, la2, lo2) {
  //   var La1 = la1 * Math.PI / 180.0;
  //   var La2 = la2 * Math.PI / 180.0;
  //   var La3 = La1 - La2;
  //   var Lb3 = lo1 * Math.PI / 180.0 - lo2 * Math.PI / 180.0;
  //   var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(La3 / 2), 2) + Math.cos(La1) * Math.cos(La2) * Math.pow(Math.sin(Lb3 / 2), 2)));
  //   s = s * 6378.137;//地球半径
  //   s = Math.round(s * 10000) / 10000;
  //   return s
  //   console.log("计算结果",s)
  // },
  
  avigraph(e){
    if (app.globalData.userId){
      var that = this;
      wx.getLocation({
        type: 'gcj02', //返回可以用于wx.openLocation的经纬度
        success: function (res) {
          var latitude = e.currentTarget.dataset.lat
          var longitude = e.currentTarget.dataset.log;
          var name = e.currentTarget.dataset.name;
          wx.openLocation({
            latitude: Number(latitude),
            longitude: Number(longitude),
            name: name,
            scale: 10
          })
        },
        fail(res) {
          console.log(res)
        }
      })
    }else{
      this.getUrseinfo()
    }
  },

  getUrseinfo() {
    var key = wx.getStorageSync('key') //登录成功返回id
    if (!key) {
      wx.showModal({
        content: '你还没有授权登录，不能获取个人位置坐标？',
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
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that=this
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: function (res) {
        console.log(res)
        that.setData({
          lat: res.latitude,
          log: res.longitude
        })
      }
    })
  },
  
  dial(e){
    var mobile = e.currentTarget.dataset.mobile
    wx.showModal({
      content: '确定要拨打电话吗？',
      showCancel: true,//是否显示取消按钮
      cancelText: "取消",//默认是“取消”
      cancelColor: 'skyblue',//取消文字的颜色
      confirmText: "确定",//默认是“确定”
      confirmColor: 'skyblue',//确定文字的颜色
      success: function (res) {
        if (res.cancel) {
          //点击取消,默认隐藏弹框
        } else {
          //点击确定
          wx.makePhoneCall({
            phoneNumber: mobile //仅为示例，并非真实的电话号码
          })
        }
      },
    })
   
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
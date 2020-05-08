// pages/discount/discount.js
const app=getApp();
import { coupon_list, coupon_get} from '../../config/https.js'
const tool = require('../../config/tool.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ldb_code: 'https://zczj.0791jr.com/data/attachment/used.png',
    code: "https://zczj.0791jr.com/data/attachment/unused.png",
    listIndex:0,
    dat:{},
    list: [{ name: '未使用', id: '1' }, { name: '已使用', id: '2' }, { name: '已过期', id: '3' }]
  },  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getList()
  },


  onclick(e) {
    console.log(e)
    this.setData({
      listIndex: e.currentTarget.dataset.index,
    })
    this.getList()
  },
  
  get(){
    this.setData({ listIndex:1})
  },

  getList(){
    coupon_list({
      user_id: app.globalData.userId
    }).then(res => {
      console.log(res)
      var dat = res
      dat.user_yhq.one.forEach(item => {
        item.start_time = tool.u_formatTimestamp(item.start_time * 1000, { type: 'ymd' });
        item.end_time = tool.u_formatTimestamp(item.end_time * 1000, { type: 'ymd' });
      })
      dat.user_yhq.two.forEach(item => {
        item.start_time = tool.u_formatTimestamp(item.start_time * 1000, { type: 'ymd' });
        item.end_time = tool.u_formatTimestamp(item.end_time * 1000, { type: 'ymd' });
      })
      this.setData({
        dat: res
      })
      console.log(this.data.dat.user_yhq)
    })
  },
  

  employ() { //立即使用
   wx.redirectTo({
     url: '/pages/subscribe/subscribe',
   })
  },
  
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  
  draw(e){
    console.log(e)
    coupon_get({
      user_id: app.globalData.userId,
      yhq_id: e.currentTarget.dataset.id
    }).then(res=>{
      console.log(res)
      this.onLoad()
      wx.showToast({
        title: res.info,
        icon:'none'
      })
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
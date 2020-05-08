// pages/activity_details/activity_details.js
const app = getApp()
import { activities_info, activities_collect, cancel_activities_collect, new_activities_info, new_regiment, new_member, update_user_info } from '../../config/https.js';
var WxParse = require('../../wxParse/wxParse.js');
const tool = require('../../config/tool.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:{}, //数据
    res: {}, //数据
    collect:null,
    options:{},//上个页面传参对象
    show: false,//关注公众号弹窗
    invite:false,
    in_huodong:0,//判断有无开团
    lis:[],//参与用户数据
    tuan: [],//团数据
    member: "",
    tel: "",
    windows: false,//从海报进来的，加入团员提示
    formId: null,//入团要获取的formid
    burr:'https://zczj.0791jr.com/data/attachment/zhongjiang.png',
    arr:[],
  
  },
  
  submitInfo: function (e) {//获取formid
    console.log(e)
    this.setData({ formId: e.detail.formId})
  },

  minus_es() { //关闭中奖弹窗
    var res = this.data.res
    res.use=3
    this.setData({
      res
    })
  },

  home(){ //返回首页
    wx.switchTab({
      url: '/pages/index/index',
    })
  },

  // getImg(){
  //   var that=this
  //   var res = that.data.res, arr=[]
  //   console.log(res)
  //   var avatar_ome = that.data.res.zhongjiang['0'].avatar
  //   var nickname_one = that.data.res.zhongjiang[0].nickname
  //   var avatar_two = that.data.res.zhongjiang[1].avatar
  //   var nickname_two = that.data.res.zhongjiang[1].nickname
  //   var avatar_three = that.data.res.zhongjiang[2].avatar
  //   var nickname_three = that.data.res.zhongjiang[2].nickname
  //   const wxGetImageInfo = that.promisify(wx.getImageInfo)
  //   wxGetImageInfo({
  //     src: that.data.burr
  //   }).then(res => {
  //     console.log(2)
  //     const ctx = wx.createCanvasContext('canv')
  //     ctx.drawImage(res.path, 0, 0, Math.floor(320), Math.floor(504))
  //     ctx.drawImage(avatar_ome, Math.floor(68), Math.floor(170), 40, 40)
  //     ctx.setFillStyle('#333')//字体颜色
  //     ctx.setFontSize(10)//字体大小
  //     ctx.fillText(nickname_one, Math.floor(73), Math.floor(230))
  //     ctx.setFillStyle('#F9655D')//字体颜色
  //     ctx.setFontSize(8)//字体大小
  //     ctx.fillText('团长', Math.floor(73), Math.floor(245))
  //     ctx.drawImage(avatar_two, Math.floor(134), Math.floor(170), 40, 40)
  //     ctx.setFillStyle('#333')//字体颜色
  //     ctx.setFontSize(10)//字体大小
  //     ctx.fillText(nickname_two, Math.floor(139), Math.floor(230))
  //     ctx.drawImage(avatar_three, Math.floor(205), Math.floor(170), 40, 40)
  //     ctx.setFillStyle('#333')//字体颜色
  //     ctx.setFontSize(10)//字体大小
  //     ctx.fillText(nickname_three, Math.floor(205), Math.floor(230))

  //     ctx.setFillStyle('#F9655D')//字体颜色
  //     ctx.fillText('兑奖秘钥：', Math.floor(68), Math.floor(265))
  //     ctx.fillText(that.data.res.codes, Math.floor(115), Math.floor(265))
      
  //     ctx.draw(false, () => {
  //       wx.canvasToTempFilePath({  //将画布转化成图片
  //         canvasId: "canv",
  //         fileType: 'jpg',
  //         success(res) {
  //           wx.getImageInfo({
  //             src: res.tempFilePath,
  //             type:'jpeg',
  //             success(res) {
  //               console.log(res)
  //               arr.push(res.path)
  //               that.setData({ arr: arr })
                
  //             }
  //           })
            
  //         }
  //       })
  //     })
  //   })
  // },

  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    // var formId = wx.getStorageSync('formId')
    this.setData({ options}) 
  },

  // 这是一个封装好的方法  
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

  getList(){
    var that = this
    if (this.data.options.is_huodong==1){
      new_activities_info({  //活动抽奖
        is_huodong: this.data.options.is_huodong,
        user_id: app.globalData.userId,
        id:this.data.options.id
      }).then(res=>{
        console.log(res)
        var info = res.info
        info.end_time = tool.u_formatTimestamp(info.end_time * 1000, { type: 'ymdhm' });
        info.start_time = tool.u_formatTimestamp(info.start_time * 1000, { type: 'ymdhm' });
        that.setData({
          list: info,
          lis: res.list,
          tuan: res.tuan,
          res:res,
          in_huodong: res.in_huodong
        })
        if (this.data.options.pid && this.data.options.id && this.data.in_huodong == 0) {
          this.setData({ windows: true })
        } else if (this.data.options.pid && this.data.options.id) {
          wx.showToast({
            title: '你已经加入该活动',
            icon: 'none',
          })
        } 
      })
    }else{
      activities_info({  //活动文章
        user_id: app.globalData.userId,
        id: this.data.options.id
      }).then(res => {
        console.log(res)
        var article = res.article
        article.add_time = tool.u_formatTimestamp(article.add_time * 1000, { type: 'ymdhm' });
        WxParse.wxParse('article', 'html', article.info, that, 5)
        that.setData({
          list: article,
          collect: res.collect
        })
      })
    }
    
  },

  dainzan(e){ //点赞
  console.log(e)
  var id = e.currentTarget.dataset.id
    activities_collect({
    id:id,
    user_id:app.globalData.userId
  }).then(res=>{
    console.log(res)
    this.getList()
    wx.showToast({
      title: res.mag,
    })
  }).catch(res=>{
    wx.showToast({
      title: res.mag,
    })
  })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  cancel(e){//取消点赞
    console.log(e)
    var id = e.currentTarget.dataset.id
    cancel_activities_collect({
      id: id,
      user_id: app.globalData.userId
    }).then(res=>{
      console.log(res)
      this.getList()
      wx.showToast({
        title: res.mag,
      })
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getUrseinfo()
    if (app.globalData.userId) { //判断有没授权登录,再往下走
      this.getList()
    }
  },

  prize_winner(){
    this.setData({goood_luck:true})
  },

  confirm(){ //海报新增团员，判断是否入团
    this.getPid()
    this.getList()
    this.setData({ windows:false})
  },
  


  cancel() { //海报新增团员，判断是否入团
    this.setData({windows:false})
  },
  

  getPid(){ //新增团员
      new_member({
        user_id: app.globalData.userId,
        huodong_id: this.data.options.id,
        pid: this.data.options.pid,
        form_id: this.data.formId
      }).then(res => {
        console.log(res)
        wx.showToast({
          title: res.msg,
          none:'none'
        })
      })
  },
  
  
  getUrseinfo() {  //判断有没授权登录
    var key = wx.getStorageSync('key') //登录成功返回id
    console.log(key)
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
      var userInfo = wx.getStorageSync('userInfo')
      update_user_info({
        url: userInfo.avatarUrl,
        nickname: userInfo.nickName,
        user_id: app.globalData.userId
      }).then(res => {
        console.log(res)
      })
      
    }
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  participant() { //抽奖活动
    // this.setData({show: true})
    new_regiment({
      user_id: app.globalData.userId,
      huodong_id:this.data.list.id,
      form_id:this.data.formId,
    }).then(res=>{
      console.log(res)
      wx.showToast({
        title: res.msg,
        icon:'none'
      })
      this.getList()
    })
  },

  close() {
    this.setData({
      show: false
    })
  },

  invite(){ //邀请好友
    if (this.data.tuan.length<3){
      this.setData({
        invite: true
      })
    }else{
      wx.showToast({
        title: '你的参奖团队人数已满,请等待开奖',
        icon:"none"
      })
    }
    
  },

  cover() { //邀请好友
    this.setData({
      invite: false
    })
  },

  copy() {
    wx.setClipboardData({
      data: '众超之家',
      success(res) {
        wx.getClipboardData({
          success(res) {
            console.log(res.data) // data
          }
        })
      }
    })
  },

  more(e){ //更多
  var id=e.currentTarget.dataset.id
   wx.navigateTo({
     url: '/pages/people_list/people_list?id='+id,
   })
  },

  save() { //复制兑奖秘钥
   var opo=this.data.res
    wx.setClipboardData({
      data: opo.codes,
      success(res) {
        wx.getClipboardData({
          success(res) {
            console.log(res.data) // data
          }
        })
      }
    })
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
    console.log(this.data.options.id)
    console.log(this.data.tuan[0].pid)
    var pid = this.data.tuan[0].pid, id=this.data.options.id
    return {
      // title: this.data.item_info.title,
      path: '/pages/activity_details/activity_details?pid='+pid+'&id='+id +'&is_huodong=1',
      imageUrl: this.data.list.cover_img,
      success: function (res) {
        // 转发成功
        console.log("转发成功:" + JSON.stringify(res));
        var shareTickets = res.shareTickets;
      },
      fail: function (res) {
        // 转发失败
        console.log("转发失败:" + JSON.stringify(res));
      }
    }
  }
})
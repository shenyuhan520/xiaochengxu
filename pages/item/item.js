import douban from '../../utils/douban.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // title:'加载中',
    detail:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   douban({
     url: "/" + options.id,

   }).then(res=>{
     if(res.data.msg){
       console.log("detail ID有误");
    //  console.log(res.data)
       return;
     }
     console.log(res.data)
     this.setData({
       detail:res.data,
       
      //  title:res.data.title
     })
     wx.setNavigationBarTitle({ title: res.data.title + ' « 音乐 « 豆瓣' }); 
     //加载完了修改
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
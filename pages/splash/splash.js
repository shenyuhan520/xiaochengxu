import douban from '../../utils/douban.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movies:[

    ]
  },

  clickHandler() {
    wx.switchTab({
      url: '/pages/board/board',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let res = wx.getStorageSync('douban');
    if(res){
      wx.switchTab({
        url: '/pages/board/board',
      });
      return;
    }
    douban({
      url: '/in_theaters',
      data: { start: 8, count: 3 }
    }).then((res) => {
      if (!res.data.subjects) return;
      let result = [];
      res.data.subjects.map((item) => {
        result.push({
          image: item.images.large,
          id: item.id
        })

      });
      this.setData({ movies: result})

      //写入storage
      wx.setStorageSync('douban', true)
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
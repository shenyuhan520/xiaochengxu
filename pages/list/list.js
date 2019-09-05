import douban from '../../utils/douban.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    key: '',
    start:20,
    list: [
      // {id:'', image: '', title: '', average: 4.3, original_title: '', year: '', directors:''}
    ]
  },
  update(key) {
    douban({
      url: '/' + key,
      data: {
        count: 20,
        
        start: this.data.start--
      },
      // loadingTop: true
    }).then(
      res => {
        if (!res.data.subjects) return;
        let result = [];
        res.data.subjects.map((item) => {
          let directors = [];
          item.directors.map((item, index) => {
            directors.push(item.name)
          })
          result.push({
            image: item.images.small,
            id: item.id,
            title: item.title,
            average: item.rating.average,
            original_title: item.original_title,
            year: item.year,
            directors: directors
          })
        });
        this.setData({
          list: result
        });

        wx.stopPullDownRefresh();//结束下拉刷新

      }
    )
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ key: options.key });
    this.update(options.key)
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
    this.setData([])
    this.update(this.data.key)
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
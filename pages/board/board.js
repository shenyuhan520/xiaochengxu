import douban from "../../utils/douban.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    banner: {
      key: 'coming_soon',
      title: '正在热映',
      content: [
        // {image:'',id:xx}
      ]
    },
    list: [
      { key: 'coming_soon', title: '即将上映' },
      { key: 'top250', title: 'Top250' },
      { key: 'in_theaters', title: '正在热映' },
      // { key: 'us_box', title: '北美票房榜' }  数据格式有误
    ]
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    douban({
      url: '/' + this.data.banner.key,
      data: { start: 0, count: 4 }
    }).then(
      res => {
        if (!res.data.subjects) return;
        let result = [];
        res.data.subjects.map((item) => {
          result.push({
            image: item.images.large,
            id: item.id
          })
        });

        this.setData({
          banner:{
            content: result
          }
        })

        // this.setData({
        //   'banner.content': result
        // })

      }
    )
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
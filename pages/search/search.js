import douban from '../../utils/douban.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    size: 20,
    subtitle: '请在此输入搜索内容',
    list: [],
    search: '',
    loading: false,
    hasMore: false
  },
  loadList() {

    this.setData({ subtitle: '加载中...', hasMore: true, loading: true })
    let start = (this.data.page - 1) * this.data.size;//计算开始条数
    this.setData({
      page: this.data.page + 1
    });

    douban({
      url: '/music/search',
      data: {
        q: this.data.search,
        start: start,
        count: this.data.size
      }
    }).then(
      res => {
        console.log(res.data)
        this.setData({ loading: false, hasMore: false });
        if (res.data.musics.length <= 0) {
          return;
        }

        let result = [];

        res.data.musics.map((item) => {

          let authors = [];
          item.author && item.author.map((item, index) => {
            authors.push(item.name)
          });

          result.push({
            image: item.image,
            id: item.id,
            title: item.title,
            average: item.rating.average,
            original_title: item.alt_title,
            year: '2019-9-2',
            directors: authors
          })
        });
        this.setData({
          list: this.data.list.concat(result),
        });
        // console.log('请求成功', this.data.list)
        wx.stopPullDownRefresh(); //停止下拉刷新UI
      }
    )
  },

  handleSearch(e) {
    if (!e.detail.value) return
    this.setData({ list: [], page: 1 })//每次搜索前清空数据
    this.setData({ subtitle: '加载中...', hasMore: true, loading: true, search: e.detail.value });
    this.loadList()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    this.data.list = [];
    this.data.page = 1;
    this.loadList();
    console.log("下拉到底")
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.loadList(); 
    console.log("上拉到底")
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
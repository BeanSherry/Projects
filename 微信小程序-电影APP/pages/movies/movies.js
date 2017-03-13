Page({
  data: {
    imgUrls: [
      '../assets/img/img1.jpg',
      '../assets/img/img2.jpg',
      '../assets/img/img3.jpg',
      '../assets/img/img4.jpg',
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 2000,
    duration: 2000,
    movies: [],
     hiddenLoading:true
  }, changeIndicatorDots: function (e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay: function (e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange: function (e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange: function (e) {
    this.setData({
      duration: e.detail.value
    })
  },
  onLoad: function (options) {
    // 生命周期函数--监听页面加载
    this.getHotMovies();

  },
  onReady: function () {
    // 生命周期函数--监听页面初次渲染完成

  },
  onShow: function () {
    // 生命周期函数--监听页面显示

  },
  onHide: function () {
    // 生命周期函数--监听页面隐藏

  },
  onUnload: function () {
    // 生命周期函数--监听页面卸载

  },
  onPullDownRefresh: function () {
    // 页面相关事件处理函数--监听用户下拉动作

  },
  onReachBottom: function () {
    // 页面上拉触底事件的处理函数

  },
  onShareAppMessage: function () {
    // 用户点击右上角分享
    return {
      title: 'title', // 分享标题
      desc: 'desc', // 分享描述
      path: 'path' // 分享路径
    }
  },
  getHotMovies: function () {
    var page=this;
    page.setData({
          hiddenLoading: !page.data.hiddenLoading
        })
    //获取热映电影
    wx.request({
      url: 'http://api.douban.com/v2/movie/in_theaters',
      data: {
      },
      header: {
        "Content-Type": "json"
      },
      success: function (res) {
        console.log(res);
        page.setData({
          movies:res.data.subjects,
          hiddenLoading: !page.data.hiddenLoading
        })

      }
    })

  },
  getInfo:function(e){
    console.log(e.currentTarget.id);
    wx.setStorageSync('id', e.currentTarget.id);
    console.log(wx.getStorageSync('id'));
        wx.navigateTo({
      url: '../info/info',
      success: function(res){
        console.log("success")
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  }
})
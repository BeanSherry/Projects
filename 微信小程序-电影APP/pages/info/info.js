Page({
  data:{
    hiddenLoading:true,
    info:{},
    title:"",
    genres:"",
    year:"",
    countries:"",
    durations:"",
    summary:"",
  },
  onLoad:function(options){
    // 生命周期函数--监听页面加载
    this.getInfo();
  },
  onReady:function(){
    // 生命周期函数--监听页面初次渲染完成
    
  },
  onShow:function(){
    // 生命周期函数--监听页面显示
    
  },
  onHide:function(){
    // 生命周期函数--监听页面隐藏
  },
  onUnload:function(){
    // 生命周期函数--监听页面卸载
    
  },
  onPullDownRefresh: function() {
    // 页面相关事件处理函数--监听用户下拉动作
    
  },
  onReachBottom: function() {
    // 页面上拉触底事件的处理函数
    
  },
  onShareAppMessage: function() {
    // 用户点击右上角分享
    return {
      title: 'title', // 分享标题
      desc: 'desc', // 分享描述
      path: 'path' // 分享路径
    }
  },
  getInfo:function(){
      var page=this;
       page.setData({
          hiddenLoading: !page.data.hiddenLoading
        })
      console.log(wx.getStorageSync('id'))
          //获取电影详情
    wx.request({
      url: 'http://api.douban.com/v2/movie/subject/'+wx.getStorageSync('id')+'',
      data: {
      },
      header: {
        "Content-Type": "json"
      },
      success: function (res) {
        console.log(res);
        page.setData({
          info:res.data,
          title:res.data.title,
          genres:res.data.genres.toString(),
          year:res.data.year,
          countries:res.data.countries.toString(),
          durations:res.data.durations,
          summary:res.data.summary,
          hiddenLoading: !page.data.hiddenLoading,
        })
      }
    })
  }
})
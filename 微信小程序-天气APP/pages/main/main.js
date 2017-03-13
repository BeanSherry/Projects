Page({
  data:{
    city:"",
    ganmao:"",
    temp:"",
    weather:"",
    future:[]

  },
  onLoad:function(options){
    // 生命周期函数--监听页面加载
    this.getLocation();
    
    // console.log(city);
    // this.getCity(city);
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
    // return {
    //   title: 'title', // 分享标题
    //   desc: 'desc', // 分享描述
    //   path: 'path' // 分享路径
    // }
  },
  getLocation:function(){
    var page=this;
  wx.request({
  // url: 'http://pv.sohu.com/cityjson?ie=utf-8', 
  url:'http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=json',
  data: {
  },
  header: {
      'content-type': 'application/json'
  },
  success: function(res) {
    // page.setData({city:res.data.substr(res.data.indexOf("cname")+9).replace("}","").replace(";","").replace('"',"").replace('"',"")});
    page.setData({city:res.data.city})
    var city=page.data.city;
    // console.log(res.data.substr(res.data.indexOf("cname")+9).replace("}","").replace(";","").replace('"',"").replace('"',""))
  page.getCity(city);
  }
})
  },
  getCity:function(city){
    var page=this;
    console.log("城市："+city);
    var url='http://wthrcdn.etouch.cn/weather_mini?city='+city+'';
    console.log(url)
  wx.request({
  url: url, 
  data: {
  },
  header: {
      'content-type': 'application/json'
  },
  success: function(data) {
    console.log(data);
    var forecast=data.data.data.forecast
    for(var i=0;i<forecast.length;i++){
     forecast[i].high= forecast[i].high.replace("高温","").replace("低温","").replace(" ","");
     forecast[i].low= forecast[i].high.replace("高温","").replace("低温","").replace(" ","");
    }
    
    page.setData({
      ganmao:data.data.data.ganmao,
      temp:data.data.data.wendu,
      weather:data.data.data.forecast[0].type,
      future:forecast
    })

  }
})
  }
})
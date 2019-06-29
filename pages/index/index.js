// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    locationUrban:"北京",
    temperature:"24",
    conditions:"晴",
    wind:"东南风",
    num:0,
    content:"",
    todayWea:"晴",
    todayTem1:"12℃",
    todayTem2:"28℃",
    todayIcon:"qing",
    tomorrowWea:"晴",
    tomorrowTem1: "12℃",
    tomorrowTem2: "26℃",
    tomorrowIcon: "qing",
    updateTime:"11:30",
    air:"良",
    backImg:"qingimg"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let hour = new Date().getHours();
    let self = this;
    wx.request({
      url: 'https://www.tianqiapi.com/api/',
      success(res) {
        let weatherData = res.data;
        let today = weatherData.data[0];
        let tomorrow = weatherData.data[1];
        self.setData({
          locationUrban:weatherData.city,
          temperature:today.tem,
          conditions:today.wea,
          wind:today.win[0],
          num: today.win_speed,
          content: today.air_tips,
          updateTime: self.setTime(weatherData.update_time),
          todayTem1:today.tem1,
          todayTem2:today.tem2,
          todayWea:today.wea,
          tomorrowTem1:tomorrow.tem1,
          tomorrowTem2:tomorrow.tem2,
          tomorrowWea:tomorrow.wea,
          air: today.air_level,
          todayIcon: today.wea_img,
          tomorrowIcon: tomorrow.wea_img,
          backImg: hour>20||hour<6? "yeimg" : today.wea_img+"img",
        })
      }
    })
  },

  setTime:(time)=>{
      var reg = /\d\d:\d\d/;
      var updataTime = reg.exec(time);
      return updataTime[0]
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
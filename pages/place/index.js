// pages/place/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cityList: [],
    inPlace: "",
    place: "上海",
    hotPlace: [{
        "Name": "北京"
      },
      {
        "Name": "上海"
      },
      {
        "Name": "广州"
      },
      {
        "Name": "深圳"
      },
      {
        "Name": "郑州"
      },
      {
        "Name": "西安"
      },
      {
        "Name": "南京"
      },
      {
        "Name": "杭州"
      },
      {
        "Name": "武汉"
      },
      {
        "Name": "成都"
      },
      {
        "Name": "沈阳"
      },
      {
        "Name": "天津"
      }
    ],
    timer: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(option) {
    wx.setNavigationBarTitle({
      title: '城市搜索'
    })
    var self = this;
    self.setData({
      place: option.place
    });
  },

  toNewCity: function(e) {
    let nowPlace = e.currentTarget.dataset.text;
    wx.navigateTo({
      url: '../index/index?nowPlace=' + nowPlace,
    })
  },
  // 输入框输入事件
  exitPlace: function(e) {
    let inPlace = e.detail.value;
    this.setData({
      inPlace: inPlace,
    })
    this.search(e);
    if(!inPlace){
      this.setData({
        cityList: [{ 
          location: "请输入正确的城市名",
        }]
      })
    }
  },
  // 做一个节流
  debounceExit: function(e) {
    let data = this.data;
    let self = this;
    clearTimeout(data.timer);
    data.timer = null;
    data.timer = setTimeout(() => {
      self.exitPlace(e)
    }, 260)
  },

  // 请求数据  搜索事件
  search: function(e) {
    let self = this;
    wx.request({
      url: 'https://search.heweather.net/find?key=baf8052894ad4601ac4193d229773158&',
      data: {
        group: "cn",
        number: "5",
        location: e.detail.value
      },
      success: function(e) {
        let data = e.data.HeWeather6[0];
        self.setData({
          cityList: data.status != "unknown location" ? data.basic : [{
            location: "请输入正确的城市名"
          }],
        })
      },
      fail: (e) => {
        // console.log(e)
      }
    })
  },
  // 提交搜索地名
  submitCity: function(e) {
    let nowPlace = e.currentTarget.dataset.text;
    let nowLat = e.currentTarget.dataset.lat;
    let nowLon = e.currentTarget.dataset.lon;
    nowPlace = nowPlace.replace("市", "") || nowPlace.replace("区", "");
    
    wx.navigateTo({
      url: '../index/index?nowPlace=' + nowPlace+'&nowLat='+nowLat+'&nowLon='+ nowLon,
    })
    this.cancel()
  },
  // 取消事件
  cancel: function(e) {
    this.setData({
      inPlace: ""
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})
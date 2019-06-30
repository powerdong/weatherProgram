// pages/place/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cityList:"",
    inPlace:"",
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
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(option) {
    var self = this;
    self.setData({
      place: option.place
    });
  },

  toNewCity: function(e) {
    let nowPlace = e.currentTarget.dataset.text;
    wx.navigateTo({
      url: '../index/index?nowPlace='+ nowPlace,
    })
  },
  exitPlace:function(e){
    var self = this;
    let inPlace = e.detail.value;
    console.log(inPlace)
    self.setData({
      inPlace:inPlace,
    })
    wx.request({
      url: 'https://apis.map.qq.com/ws/place/v1/search?boundary=region(全国)&',
      data: {
        key:"LTBBZ-Q7JWF-WRJJE-JWXBR-W23TE-GWBQG",
        keyword: e.detail.value
      },
      success: function(e) {
        self.setData({
          cityList: e.data.data.length>0 ?  e.data.data[0].title : "请输入正确的城市名",
        })
      },
      fail: (e) => {
        console.log(e)
      }
    })

  },
  submitCity:function(e){
    let nowPlace = e.currentTarget.dataset.text;
    nowPlace = nowPlace.replace("市", "") || nowPlace.replace("区", "") ;
    console.log(nowPlace);
    wx.navigateTo({
      url: '../index/index?nowPlace=' + nowPlace,
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
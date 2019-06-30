// pages/index/index.js
// 引入SDK核心类
var QQMapWX = require('../../qqmap-wx-jssdk.js');

// 实例化API核心类
var qqmapsdk = new QQMapWX({
  key: 'LTBBZ-Q7JWF-WRJJE-JWXBR-W23TE-GWBQG' // 必填
}); 

var place;

Page({
  /**
   * 页面的初始数据
   */
  data: {
    hours: [{
      id: "hours8",
      hour: "08:00",
      hourT: "23℃",
      hoursIcon:"yun"
    }, {
      id: "hours11",
      hour: "11:00",
      hourT: "23℃",
      hoursIcon:"yun"

    }, {
      id: "hours14",
      hour: "14:00",
      hourT: "23℃",
      hoursIcon:"yun"
    }, {
      id: "hours17",
      hour: "17:00",
      hourT: "23℃",
      hoursIcon:"yun"
    }, {
      id: "hours20",
      hour: "20:00",
      hourT: "23℃",
      hoursIcon:"yun"
    }, {
      id: "hours23",
      hour: "23:00",
      hourT: "23℃",
      hoursIcon:"yu"

    }, {
      id: "hours2",
      hour: "02:00",
      hourT: "23℃",
      hoursIcon:"yun"

    }, {
      id: "hours5",
      hour: "05:00",
      hourT: "23℃",
      hoursIcon:"yun"

      }],
    weatherData: [{
      day: "明天",
      date: "06/27",
      wea: "小雨",
      wea_img: "lei",
      win: "微风",
      win_speed: "3级",
      tem1: "27℃",
      tem2: "21℃"
    }, {
      day: "后天",
      date: "06/27",
      wea: "小雨",
      wea_img: "wu",
      win: "微风",
      win_speed: "3级",
      tem1: "27℃",
      tem2: "21℃"
    }, {
      day: "明天",
      date: "06/27",
      wea: "小雨",
      wea_img: "shachen",
      win: "微风",
      win_speed: "3级",
      tem1: "27℃",
      tem2: "21℃"
    }, {
      day: "明天",
      date: "06/27",
      wea: "小雨",
      wea_img: "bingbao",
      win: "微风",
      win_speed: "3级",
      tem1: "27℃",
      tem2: "21℃"
    }, {
      day: "明天",
      date: "06/27",
      wea: "小雨",
      wea_img: "yin",
      win: "微风",
      win_speed: "3级",
      tem1: "27℃",
      tem2: "21℃"
    }, {
      day: "明天",
      date: "06/27",
      wea: "小雨",
      wea_img: "qing",
      win: "微风",
      win_speed: "3级",
      tem1: "27℃",
      tem2: "21℃"
     }],
    weatherLife: [{
        lifeIcon: "taiyang",
        lifeLevel: "中等",
        lifeTitle: "紫外线指数"
      },
      {
        lifeIcon: "jianshen",
        lifeLevel: "中等",
        lifeTitle: "紫外线指数"
      },
      {
        lifeIcon: "yao",
        lifeLevel: "中等",
        lifeTitle: "紫外线指数"
      }, {
        lifeIcon: "yifu",
        lifeLevel: "中等",
        lifeTitle: "紫外线指数"
      }, {
        lifeIcon: "xiche",
        lifeLevel: "中等",
        lifeTitle: "紫外线指数"
      }, {
        lifeIcon: "wuran",
        lifeLevel: "中等",
        lifeTitle: "紫外线指数"
      }
      ],
    locationUrban: "北京",
    locationArea: "昌平区",
    temperature: "24",
    conditions: "晴",
    wind: "东南风",
    num: 0,
    content: "",
    todayWea: "晴",
    todayTem1: "12℃",
    todayTem2: "28℃",
    todayIcon: "qing",
    tomorrowWea: "晴",
    tomorrowTem1: "12℃",
    tomorrowTem2: "26℃",
    tomorrowIcon: "qing",
    updateTime: "11:30",
    air: "良",
    backImg: "qingimg",
    hoursnum: "hours8"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let hour = new Date().getHours();
    let self = this;
    let latitude = null;
    let longitude = null;
    let timeReg = /\d\d:\d\d/;
    let dayReg = /\d{0,}/g;
    wx.request({
      url: 'https://www.tianqiapi.com/api/?version=v1&',
      data:{
        city: options.nowPlace ? ""+options.nowPlace:""
      },
      success(res) {
         place = res.data.city;
        let weatherData = res.data;
        let today = weatherData.data[0];
        let tomorrow = weatherData.data[1];
        let localWeather = self.data.weatherData;
        let serverWeatherData = weatherData.data.slice(1);
        let serverhourWeather = today.hours;
        let localhourWeather = self.data.hours;
        let locallifeWeather = self.data.weatherLife;
        let serverlifeWeather = today.index;
        let tem1Arr = localWeather.tem1;
        let tem2Arr = localWeather.tem2;
        self.hourWeather(localhourWeather,serverhourWeather);
        self.assignment(localWeather, serverWeatherData);
        self.lifeWeather(locallifeWeather,serverlifeWeather);
        self.setData({
          locationUrban: res.data.city,
          temperature: today.tem,
          conditions: today.wea,
          wind: today.win[0],
          num: today.win_speed,
          content: today.air_tips,
          updateTime: self.setRules(timeReg, weatherData.update_time)[0],
          todayTem1: today.tem1,
          todayTem2: today.tem2,
          todayWea: today.wea,
          tomorrowTem1: tomorrow.tem1,
          tomorrowTem2: tomorrow.tem2,
          tomorrowWea: tomorrow.wea,
          air: today.air_level,
          todayIcon: today.wea_img,
          tomorrowIcon: tomorrow.wea_img,
          backImg: hour >= 20 || hour <= 6 ? "yeimg" : today.wea_img + "img",
          weatherData: localWeather,
          hours:localhourWeather,
          weatherLife:locallifeWeather,
          hoursnum: "hours" +  (hour - (hour % 3 + 1))
        });
      },
      fail:(res)=>{
        console.log(res);
      }
    });
  },
  changePlace: function() {
    console.log(place)
    wx.navigateTo({
      url: '../place/index?place=' + place,
    })
  },
  hourWeather: function (localhourWeather, serverhourWeather){
      let j = localhourWeather.length-1;

    for(let i = serverhourWeather.length- 1;i>0;i--){
      localhourWeather[j].hoursIcon = serverhourWeather[i].wea;
      localhourWeather[j].hourT = serverhourWeather[i].tem;
      j--
    }

    for(let i = 0;i<localhourWeather.length;i++){
      let item = localhourWeather[i];
      if (item.hoursIcon.indexOf("雷") !== -1) {
        item.hoursIcon = "lei";
      }else if (item.hoursIcon.indexOf("云") !== -1){
        item.hoursIcon = "yun";
      } else if (item.hoursIcon.indexOf("雨") !== -1){
        item.hoursIcon = "yu";
      } else if (item.hoursIcon.indexOf("阴") !== -1) {
        item.hoursIcon = "yin";
      }else if (item.hoursIcon.indexOf("晴") !== -1) {
        item.hoursIcon = "qing";
      } else if (item.hoursIcon.indexOf("雪") !== -1) {
        item.hoursIcon = "xue";
      } else if (item.hoursIcon.indexOf("雾") !== -1) {
        item.hoursIcon = "wu";
      }
    }
  },
  assignment: function(localWeather, serverWeatherData) {
    for (let i = 2; i < localWeather.length; i++) {
      localWeather[i].day = "周" + serverWeatherData[i].week.slice(-1);
    };
    for(let i =0;i<localWeather.length;i++){
      localWeather[i].date = (serverWeatherData[i].date.split("-")[1]) + "/" + (serverWeatherData[i].date.split("-")[2]);
      localWeather[i].wea = serverWeatherData[i].wea;
      localWeather[i].wea_img = serverWeatherData[i].wea_img;
      localWeather[i].tem1 = serverWeatherData[i].tem1;
      localWeather[i].tem2 = serverWeatherData[i].tem2;
      localWeather[i].win = serverWeatherData[i].win[0] === "无持续风向" ? "微风" :serverWeatherData[i].win[0];  
      localWeather[i].win_speed = serverWeatherData[i].win_speed;
    }

  },
  lifeWeather: function (locallifeWeather, serverlifeWeather){
    for(let i = 0;i<locallifeWeather.length;i++){
      locallifeWeather[i].lifeLevel = serverlifeWeather[i].level;
      locallifeWeather[i].lifeTitle = serverlifeWeather[i].title.replace("指数","");
    }
    locallifeWeather[1].lifeLevel = "中等";
    locallifeWeather[1].lifeTitle = "减肥";

  },
  setRules: (reg, data) => {
    let newData = reg.exec(data);
    return newData;
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
  onShareAppMessage: function() {}
})
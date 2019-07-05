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
      pop: 55,
      hoursIcon: "yun"
    }, {
      id: "hours11",
      hour: "11:00",
      hourT: "23℃",
        pop: 55,
      hoursIcon: "yun"

    }, {
      id: "hours14",
      hour: "14:00",
      hourT: "23℃",
        pop: 55,
      hoursIcon: "yun"
    }, {
      id: "hours17",
      hour: "17:00",
      hourT: "23℃",
        pop: 55,
      hoursIcon: "yun"
    }, {
      id: "hours20",
      hour: "20:00",
      hourT: "23℃",
        pop: 55,
      hoursIcon: "yun"
    }, {
      id: "hours23",
      hour: "23:00",
      hourT: "23℃",
        pop: 55,
      hoursIcon: "yu"

    }, {
      id: "hours2",
      hour: "02:00",
      hourT: "23℃",
        pop: 55,
      hoursIcon: "yun"

    }, {
      id: "hours5",
      hour: "05:00",
      hourT: "23℃",
        pop: 55,
      hoursIcon: "yun"

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
    weatherLife: [
      {
        lifeIcon: "xiao",
        lifeLevel: "中等",
        lifeTitle: "紫外线指数"
      },
      {
        lifeIcon: "yifu",
        lifeLevel: "中等",
        lifeTitle: "紫外线指数"
      },
      {
        lifeIcon: "yao",
        lifeLevel: "中等",
        lifeTitle: "紫外线指数"
      }, {
        lifeIcon: "yundong",
        lifeLevel: "中等",
        lifeTitle: "紫外线指数"
      }, {
        lifeIcon: "xingli",
        lifeLevel: "中等",
        lifeTitle: "紫外线指数"
      }, {
        lifeIcon: "taiyang",
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
    humidity:"55"
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
    // 现在的空气指数
    wx.request({
      url: 'https://free-api.heweather.net/s6/air/now?key=baf8052894ad4601ac4193d229773158&',
      data: {
        location: options.nowPlace ? "" + options.nowPlace : "auto_ip"
      },
      success: function(res) {
        let weatherAir = res.data.HeWeather6[0].air_now_city;
        if(weatherAir){
          self.setData({
            air: weatherAir.qlty,
          })
        }
      }
    })
    // 现在的天气状况
    wx.request({
      url: 'https://free-api.heweather.net/s6/weather/now?key=baf8052894ad4601ac4193d229773158&',
      data: {
        location: options.nowPlace ? "" + options.nowPlace : "auto_ip"
      },
      success(res) {
        let weatherData = res.data.HeWeather6[0];
        place = weatherData.basic.location;
        let now = weatherData.now;
        let tips = ["别人给的是惊喜，自己拥有才是底气。",
          "做好自己才是最重要的，没有曲折的人生就会少看到许多沿途的风景！", 
                "愿你强大到无需有人疼有人爱，却依然幸运到有人懂有人宠。", 
                "感情需要有点寄托，生活需要有点追求，朋友需要有点问候。"]
        self.setData({
          locationUrban: res.data.HeWeather6[0].basic.location,
          updateTime: self.setRules(timeReg, weatherData.update.loc)[0],
          temperature: now.tmp,
          conditions: now.cond_txt,
          wind: now.wind_dir,
          num: now.wind_sc,
          humidity:now.hum,
          content: tips[Math.floor(Math.random() * tips.length)],
          backImg: hour >= 25 || hour <= 6 ? "yeimg" : self.setImg(now.cond_txt) + "img",
        });
      },
      fail: (res) => {
        console.log(res);
      }
    });
    // 未来的天气情况
    wx.request({
      url: 'https://free-api.heweather.net/s6/weather/forecast?key=baf8052894ad4601ac4193d229773158&',
      data: {
        location: options.nowPlace ? "" + options.nowPlace : "auto_ip"
      },
      success(res) {
        let weatherWeek = res.data.HeWeather6[0].daily_forecast;
        let itemWea = {};
        itemWea.today = weatherWeek[0];
        let today = weatherWeek[0];
        let tomorrow = weatherWeek[1];
        let serverWeatherData = weatherWeek.slice(1);
        let localWeather = self.data.weatherData;
        self.assignment(localWeather, serverWeatherData);
        console.log(today);
        self.setData({
          // 白天天气
          todayWea: today.cond_txt_n,
          todayTem1: today.tmp_min,
          todayTem2: today.tmp_max,
          tomorrowTem1: tomorrow.tmp_min,
          tomorrowTem2: tomorrow.tmp_max,
          tomorrowWea: tomorrow.cond_txt_n,
          weatherData: localWeather,
          todayIcon: self.setImg(today.cond_txt_n),
          tomorrowIcon: self.setImg(tomorrow.cond_txt_n),
        })
      }
    });
    // 逐小时天气情况
    wx.request({
      url: 'https://free-api.heweather.net/s6/weather/hourly?key=baf8052894ad4601ac4193d229773158&',
      data: {
        location: options.nowPlace ? "" + options.nowPlace : "auto_ip"
      },
      success(res) {
        let weatherHours = res.data.HeWeather6[0].hourly;
        let serverhourWeather = weatherHours;
        let localhourWeather = self.data.hours;
        self.hourWeather(localhourWeather, serverhourWeather);
        self.setData({
          hours:localhourWeather,
        })
      }
    });
    // 生活指数
    wx.request({
      url: 'https://free-api.heweather.net/s6/weather/lifestyle?key=baf8052894ad4601ac4193d229773158&',
      data: {
        location: options.nowPlace ? "" + options.nowPlace : "auto_ip"
      },
      success:function(res){
        let serverlifeWeather =  res.data.HeWeather6[0].lifestyle;
        let locallifeWeather = self.data.weatherLife;
        self.lifeWeather(locallifeWeather,serverlifeWeather);
        self.setData({
          weatherLife:locallifeWeather,
        })
      }
    })
  },
  
  changePlace: function() {
    console.log(place)
    wx.navigateTo({
      url: '../place/index?place=' + place,
    })
  },
  hourWeather: function(localhourWeather, serverhourWeather) {
    let hourId = /\d\d:/;
    let hours = /\d\d:\d\d/;
    for(let i = 0;i<serverhourWeather.length;i++){
      localhourWeather[i].id = "hour" +  this.setRules(hourId, serverhourWeather[i].time)[0].slice(0,2);
      localhourWeather[i].hour = this.setRules(hours, serverhourWeather[i].time)[0];
      localhourWeather[i].hourT = serverhourWeather[i].tmp;
      localhourWeather[i].hoursIcon = this.setImg(serverhourWeather[i].cond_txt);
      localhourWeather[i].pop = serverhourWeather[i].pop;
    }
  },
  setImg: function(nowWea) {
    let backImg;
    if (nowWea.indexOf("雷") !== -1) {
      backImg = "lei";
    } else if (nowWea.indexOf("云") !== -1) {
      backImg = "yun";
    } else if (nowWea.indexOf("雨") !== -1) {
      backImg = "yu";
    } else if (nowWea.indexOf("阴") !== -1) {
      backImg = "yin";
    } else if (nowWea.indexOf("晴") !== -1) {
      backImg = "qing";
    } else if (nowWea.indexOf("雪") !== -1) {
      backImg = "xue";
    } else if (nowWea.indexOf("雾") !== -1) {
      backImg = "wu";
    } else if (nowWea.indexOf("尘") !== -1 || nowWea.indexOf("沙") !== -1){
      backImg = "shachen";
    }
    return backImg;
  },
  assignment: function(localWeather, serverWeatherData) {
    for (let i = 0; i < serverWeatherData.length; i++) {
      if (i == 0) {
        serverWeatherData[i].day = "今天";
        continue;
      } else if (i == 1) {
        serverWeatherData[i].day = "明天";
        continue;
      }
      let data = new Date(this.week(serverWeatherData[i].date)).getDay();
      let weekday = new Array(7);
      weekday = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"]
      serverWeatherData[i].day = weekday[data];
    };
    for (let i = 0; i < serverWeatherData.length; i++) {
      localWeather[i].date = (serverWeatherData[i].date.split("-")[1]) + "/" + (serverWeatherData[i].date.split("-")[2]);
      localWeather[i].wea = serverWeatherData[i].cond_txt_d;
      localWeather[i].wea_img = this.setImg(serverWeatherData[i].cond_txt_d);
      localWeather[i].tem1 = serverWeatherData[i].tmp_max;
      localWeather[i].tem2 = serverWeatherData[i].tmp_min;
      localWeather[i].win = serverWeatherData[i].wind_dir === "无持续风向" ? "微风" : serverWeatherData[i].wind_dir;
      localWeather[i].win_speed = serverWeatherData[i].wind_sc;
    }

  },
  lifeWeather: function (locallifeWeather, serverlifeWeather) {
    let lifeStyle = ["舒适度", "穿衣", "感冒", "运动", "旅游", "紫外线", "洗车", "空气污染"];
    for (let i = 0; i < locallifeWeather.length; i++) {
      locallifeWeather[i].lifeLevel = serverlifeWeather[i].brf;
      locallifeWeather[i].lifeTitle = lifeStyle[i];
    }
  },
  setRules: (reg, data) => {
    let newData = reg.exec(data);
    return newData;
  },
  week: function(data) {
    var item = data.split("-").join("/");
    return item
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
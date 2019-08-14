// pages/index/index.js
// 引入SDK核心类
var QQMapWX = require('../../qqmap-wx-jssdk.min.js');

// 实例化API核心类
var qqmapsdk = new QQMapWX({
  key: 'LTBBZ-Q7JWF-WRJJE-JWXBR-W23TE-GWBQG' // 必填
}); 

var place;

const Http = "https://free-api.heweather.net/s6/"
const weatherKey = "key=baf8052894ad4601ac4193d229773158&"

Page({
  /**
   * 页面的初始数据
   */
  data: {
    visibility: 'hidden',
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
      tem1: "27",
      tem1P: "3",
      tem2: "21",
      tem2P: "2"
    }, {
      day: "后天",
      date: "06/27",
      wea: "小雨",
      wea_img: "wu",
      win: "微风",
      win_speed: "3级",
      tem1: "27",
      tem2: "21"
    }, {
      day: "明天",
      date: "06/27",
      wea: "小雨",
      wea_img: "shachen",
      win: "微风",
      win_speed: "3级",
      tem1: "27",
      tem2: "21"
    }, {
      day: "明天",
      date: "06/27",
      wea: "小雨",
      wea_img: "bingbao",
      win: "微风",
      win_speed: "3级",
      tem1: "27",
      tem2: "21"
    }, {
      day: "明天",
      date: "06/27",
      wea: "小雨",
      wea_img: "yin",
      win: "微风",
      win_speed: "3级",
      tem1: "27",
      tem2: "21"
    }, {
      day: "明天",
      date: "06/27",
      wea: "小雨",
      wea_img: "qing",
      win: "微风",
      win_speed: "3级",
      tem1: "27",
      tem2: "21"
    }],
    weatherLife: [{
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
    locationUrban: "定位中",
    locationArea: "",
    temperature: "__",
    conditions: "",
    wind: "",
    num: Number,
    content: "",
    todayWea: "",
    todayTem1: "",
    todayTem2: "",
    todayIcon: "",
    tomorrowWea: "",
    tomorrowTem1: "",
    tomorrowTem2: "",
    tomorrowIcon: "",
    updateTime: "",
    air: "",
    backImg: "qingimg",
    humidity: "",
    getlocation: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let self = this;
    let latitude = null;
    let longitude = null;
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userLocation']) {
          // 同意请求地理位置
          self.setData({
            visibility: "hidden",
            getlocation: true
          })
          if (!options.nowPlace) {
            // 页面地理位置信息展示
            self.changeLoaction();
          } else {
            self.setData({
              locationUrban: options.nowPlace
            })
            // 初始化页面
            self.pageInfo(options)
          }
        } else {
          wx.getLocation({
            success: function(res) {
              self.setData({
                visibility: "hidden",
                getlocation: true
              })
              if (!options.nowPlace) {
                // 页面地理位置信息展示
                self.changeLoaction(res.latitude, res.longitude);
              } else {
                self.setData({
                  locationUrban: options.nowPlace
                })
                self.pageInfo(options)
              }
              // 初始化页面
            },
            fail: function(res) {
              // 需要有一个弹层 让用户跳转到设置页面设置开启位置服务
              self.setData({
                visibility: "visible"
              })
            }
          })
        }
      }
    })

  },
  pageInfo: function(options = {}, latitude, longitude) {
    const location = options.nowPlace ? options.nowPlace : latitude + "," + longitude;
    // 现在的空气指数
    this.nowWeatherAir(location);
    // 现在的天气状况
    this.nowWeatherconditions(location);
    // 未来的天气情况
    this.futureWeather(location);
    // 逐小时天气情况
    this.hoursWeather(location);
    // 生活指数
    this.livingIndex(location);
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},
  // 前往设置页面打开位置服务的点击事件
  openSet: function() {
    let self = this;
    let options = {
      nowPlace: ""
    };
    wx.openSetting({
      success(res) {
        self.onLoad(options);
      }
    })
  },

  myCatchTouch: function() {
    return false;
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},


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
    // 标题栏显示刷新图标，转圈圈
    wx.showNavigationBarLoading()
    this.changeLoaction();
    // 初始化页面

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {},

  /**
   * 腾讯地图调用
   * 修改地理位置信息
   */
  changeLoaction(latitude, longitude) {
    var self = this;
    qqmapsdk.reverseGeocoder({      
      //位置坐标，默认获取当前位置
      //Object格式 
      location: latitude && longitude ? latitude + ',' + longitude : "",
      success: function(res) {
        let loc = res.result.ad_info.location;
        let options = {};
        self.pageInfo(options, loc.lat, loc.lng)
        let location = res.result.address_component;
        let obj = {};
        self.setData({
          locationUrban: location.district,
          locationArea: location.street
        })
        wx.hideNavigationBarLoading()
        wx.stopPullDownRefresh();
      }
    });
  },

  /**
   * 方法函数区
   */
  // 现在的空气指数（良  优）
  nowWeatherAir: function(location) {
    let self = this;
    wx.request({
      url: Http + 'air/now?' + weatherKey,
      data: {
        location,
      },
      success: function(res) {
        let weatherAir = res.data.HeWeather6[0].air_now_city;
        self.setData({
          air: weatherAir ? weatherAir.qlty : "良",
        })

      }
    })
  },
  // 现在的天气情况  首屏信息
  nowWeatherconditions: function(location) {
    let self = this;
    let hour = new Date().getHours();
    let timeReg = /\d\d:\d\d/;
    wx.request({
      url: Http + 'weather/now?' + weatherKey,
      data: {
        location
      },
      success(res) {
        let weatherData = res.data.HeWeather6[0];
        place = weatherData.basic.location;
        let now = weatherData.now;
        let tips = ["别人给的是惊喜，自己拥有才是底气。",
          "做好自己才是最重要的，没有曲折的人生就会少看到许多沿途的风景！",
          "愿你强大到无需有人疼有人爱，却依然幸运到有人懂有人宠。",
          "感情需要有点寄托，生活需要有点追求，朋友需要有点问候。"
        ]
        self.setData({
          updateTime: self.setRules(timeReg, weatherData.update.loc)[0],
          temperature: now.tmp,
          conditions: now.cond_txt,
          wind: now.wind_dir,
          num: now.wind_sc,
          // 空气湿度
          humidity: now.hum,
          content: tips[Math.floor(Math.random() * tips.length)],
          backImg: hour >= 25 || hour <= 6 ? "yeimg" : self.setImg(now.cond_txt) + "img",
        });
      },
      fail: (res) => {
        console.log(res);
      }
    });
  },
  // 一周的天气情况  包括今天 明天信息展示 和未来天气展示
  futureWeather: function(location) {
    let self = this;
    wx.request({
      url: Http + 'weather/forecast?' + weatherKey,
      data: {
        location
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
  },
  // 逐小时天气情况展示
  hoursWeather: function(location) {
    let self = this;
    wx.request({
      url: Http + 'weather/hourly?' + weatherKey,
      data: {
        location
      },
      success(res) {
        let weatherHours = res.data.HeWeather6[0].hourly;
        let serverhourWeather = weatherHours;
        let localhourWeather = self.data.hours;
        self.hourWeather(localhourWeather, serverhourWeather);
        self.setData({
          hours: localhourWeather,
        })
      }
    });
  },
  livingIndex: function(location) {
    let self = this;
    wx.request({
      url: Http + 'weather/lifestyle?' + weatherKey,
      data: {
        location
      },
      success: function(res) {
        let serverlifeWeather = res.data.HeWeather6[0].lifestyle;
        let locallifeWeather = self.data.weatherLife;
        self.lifeWeather(locallifeWeather, serverlifeWeather);
        self.setData({
          weatherLife: locallifeWeather,
        })
      }
    })
  },
  changePlace: function() {
    wx.navigateTo({
      url: '../place/index?place=' + place,
    })
  },
  hourWeather: function(localhourWeather, serverhourWeather) {
    let hourId = /\d\d:/;
    let hours = /\d\d:\d\d/;
    for (let i = 0; i < serverhourWeather.length; i++) {
      localhourWeather[i].id = "hour" + this.setRules(hourId, serverhourWeather[i].time)[0].slice(0, 2);
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
    } else if (nowWea.indexOf("尘") !== -1 || nowWea.indexOf("沙") !== -1) {
      backImg = "shachen";
    }
    return backImg;
  },
  // 温度排序
  sortTem: function(toSort) {
    let resArray = toSort.slice(0);
    for (var i = 0; i < resArray.length; i++) {
      resArray[i] = [resArray[i], i];
    }
    resArray.sort(function(left, right) {
      return left[0] < right[0] ? -1 : 1;
    });
    resArray.sortIndices = [];
    for (var j = 0; j < resArray.length; j++) {
      resArray.sortIndices.push(resArray[j][1]);
      resArray[j] = resArray[j][0];
    }
    return resArray;
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
      console.log(serverWeatherData[2].day)
    const temMax = [],
      temMin = [];
    for (let i = 0; i < serverWeatherData.length; i++) {
      localWeather[i].date = (serverWeatherData[i].date.split("-")[1]) + "/" + (serverWeatherData[i].date.split("-")[2]);
      localWeather[i].wea = serverWeatherData[i].cond_txt_d;
      localWeather[i].wea_img = this.setImg(serverWeatherData[i].cond_txt_d);
      localWeather[i].win = serverWeatherData[i].wind_dir === "无持续风向" ? "微风" : serverWeatherData[i].wind_dir;
      localWeather[i].win_speed = serverWeatherData[i].wind_sc;
      localWeather[i].day = serverWeatherData[i].day;
      temMax.push(serverWeatherData[i].tmp_max);
      temMin.push(serverWeatherData[i].tmp_min);
    }
    var Maxtem =  this.setTemPostion(temMax)
    var Mintem =  this.setTemPostion(temMin)
    for (let i = 0; i < serverWeatherData.length; i++) {
      localWeather[i].tem1 = Maxtem[i][0];
      localWeather[i].tem1P = Maxtem[i][1];
      localWeather[i].tem2 = Mintem[i][0];
      localWeather[i].tem2P = Mintem[i][1];
    }
  },
  setTemPostion: function(tem) {
    // 根据温度排序设置温度的位置
    // 排序的下标
    // 函数返回一个二维数组
    // 第一位存放温度  第二位存放排序信息
    var index = this.sortTem(tem).sortIndices;
    for (let i = 0; i < tem.length; i++) {
      let j = index[i];
      tem[j] = [tem[j], i];
    }
    return tem;
  },
  lifeWeather: function(locallifeWeather, serverlifeWeather) {
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
})
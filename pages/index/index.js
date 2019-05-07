//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    open: false,
    items: [
      { name: 'USA', value: '美国' },
      { name: 'CHN', value: '中国', checked: 'true' },
      { name: 'BRA', value: '巴西' },
      { name: 'JPN', value: '日本' },
      { name: 'ENG', value: '英国' },
      { name: 'TUR', value: '法国' },
    ]
  },

  radioChange(e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
  },

  // 点击左上角小图标事件
  tap_ch: function (e) {
    if (this.data.open) {
      this.setData({
        open: false
      });
    } else {
      this.setData({
        open: true
      });
    }
  },

  error(e) {
    console.log(e.detail)
  },
  toLog: function() {
    wx.navigateTo({
      url: '/pages/logs/logs',
    })
  },
  toResults: function(){
    wx.navigateTo({
      url: '/pages/results/results',
    })
  },
  // 拍照功能
  getLocalImage: function () {
    var that = this;
    console.log('你选锤子呢');
    // var tempFilePaths;
    wx.chooseImage({
      count: 1,
      success: function (res) {
        // 这里无论用户是从相册选择还是直接用相机拍摄，拍摄完成后的图片临时路径都会传递进来
        app.globalData.imgPath = res.tempFilePaths[0];
        console.log(app.globalData.imgPath);
        wx.showLoading({
          title: '识别中',
        })
        wx.uploadFile({
          url: 'https://fruits.beonel.club:9999',
          filePath: app.globalData.imgPath,
          name: 'image',
          success(res) {
            const data = res.data;
            console.log(data);
            app.globalData.result = data;
            wx.hideLoading();
            wx.navigateTo({
              url: '/pages/results/results',
            });
            console.log(app.globalData.result)
          }
        });
      },
      fail: function (error) {
        console.error("调用本地相册文件时出错")
        console.warn(error)
      },
      complete: function () {
        
      }
      
    })
  },
})
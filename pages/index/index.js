//index.js
//获取应用实例
const app = getApp()

Page({
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
    console.log('选锤子呢');
    var tempFilePaths;
    wx.chooseImage({
      count: 1,
      success: function (res) {
        // 这里无论用户是从相册选择还是直接用相机拍摄，拍摄完成后的图片临时路径都会传递进来
        tempFilePaths = res.tempFilePaths;
        console.log(tempFilePaths);
        wx.uploadFile({
          url: 'http://192.168.0.242:5001', // 仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'image',
          success(res) {
            const data = res.data;
            console.log(data);
            app.globalData.result = data;
            wx.navigateTo({
              url: '/pages/results/results',
            });
            console.log(app.globalData.result)
          }
        })
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
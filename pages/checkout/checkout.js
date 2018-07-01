// pages/checkout/checkout.js

const apiClient = require('../../utils/apiClient.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: null,
    defaultSubscription: 1,
    subscriptionOptions: [
      {
        months: 3,
        total: 199
      },
      {
        months: 6,
        total: 379
      },
      {
        months: 12,
        total: 599
      },
    ]
  },

  changeDuration(e) {
    // console.log(e)
    this.setData({
      defaultSubscription: parseInt(e.detail.value)
    });

    this.updateSelection();
  },

  updateSelection() {
    this.setData({
      months: this.data.subscriptionOptions[this.data.defaultSubscription].months,
      total: this.data.subscriptionOptions[this.data.defaultSubscription].total,
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      box: options.box,
      subscriptionDescriptions: this.data.subscriptionOptions.map(o => `${o.months} months, ￥${o.total}`)
    });

    this.updateSelection();

    apiClient.get({
      path: '/addresses',

      success: (res) => {
        // console.log(res);

        if (res.data.data.length > 0) {
          this.setData({
            address: res.data.data[0]
          });
        }
      }
    });
  },

  addNewAddress() {
    wx.navigateTo({
      url: '../new_address/new_address',
    });
  },

  listAddresses() {
    wx.navigateTo({
      url: '../list_addresses/list_addresses',
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },

  pay() {
    wx.navigateTo({
      url: `../checkout_success/checkout_success?months=${this.data.months}&total=${this.data.total}`,
    });
  }
});

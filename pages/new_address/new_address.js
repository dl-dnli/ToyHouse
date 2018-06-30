// pages/new_address/new_address.js

const apiClient = require('../../utils/apiClient.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInput: {},
    errors: {}
  },

  updateInput(key, value) {
    this.data.userInput[key] = value;
    delete this.data.errors[key];
    this.setData({
      userInput: this.data.userInput,
      errors: this.data.errors
    });
  },

  nameChanged(event) {
    this.updateInput('name', event.detail.value);
  },

  mobileChanged(event) {
    this.updateInput('mobile', event.detail.value);
  },

  regionChanged(event) {
    this.updateInput('region', event.detail.value);
  },

  detailChanged(event) {
    this.updateInput('detail', event.detail.value);
  },

  validatePresence(key) {
    if (!this.data.userInput[key] || this.data.userInput[key].length === 0) {
      this.data.errors[key] = 'cannot be empty';
      this.setData({
        errors: this.data.errors
      });
    }
  },

  validateLength(key, min, max) {
    if (!this.data.userInput[key] ||
      this.data.userInput[key].length < min ||
      this.data.userInput[key].length > max) {
      this.data.errors[key] = 'invalid length';
      this.setData({
        errors: this.data.errors
      });
    }
  },

  validatePick(key) {
    if (!this.data.userInput[key] || this.data.userInput[key] === 'Please Choose') {
      this.data.errors[key] = 'required';
      this.setData({
        errors: this.data.errors
      });
    }
  },

  submit() {
    this.validatePresence('name');
    this.validateLength('name', 2, 20);
    this.validatePresence('mobile');
    this.validateLength('mobile', 11, 11);
    this.validatePick('region');
    this.validatePresence('detail');

    if (Object.keys(this.data.errors).length === 0) {
      console.log(this.data.userInput);

      const data = this.data.userInput;
      data.region = data.region.join();
      data.recipient = data.name;
      delete data.name;

      apiClient.post({
        path: '/addresses',
        data,
        success: (res) => {
          console.log(res);
          wx.navigateBack({
          });
        }
      });
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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

  }
});

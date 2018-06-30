const app = getApp();
const config = require('./config.js');

const request = (method, options) => {
  let authToken = wx.getStorageSync('authToken');

  let { url } = options;

  if (options.path) {
    url = config.baseUrl + options.path;

    if (options.cache) {
      const key = options.cacheKey || options.path;

      const cachedData = wx.getStorageSync(key);

      if (cachedData) {
        options.success({
          data: cachedData
        });
      }
    }
  }

  wx.request({
    url,
    data: options.data,
    method,
    header: {
      'X-Toyhouse-Token': authToken
    },
    success(res) {
      if (res.statusCode === 401) {
        if (app) {
          app.resetAuthenticationInfo();
          app.login(() => {
            // retry
            console.log('retrying...');
            authToken = wx.getStorageSync('authToken');
            request(options);
          });
        }
      } else if (res.statusCode === 429) {
        wx.showToast({
          title: '你的操作太快了，休息，休息一会',
          icon: 'none'
        });
      } else if (res.statusCode === 404 || res.statusCode === 403) {
        options.fail(res);
      } else {
        if (options.cache) {
          const key = options.cacheKey || options.path;

          wx.setStorage({
            key,
            data: res.data
          });
        }

        options.success(res);
      }
    }
  });
};

const get = (options) => {
  request('get', options);
};

const post = (options) => {
  request('post', options);
};

const DELETE = (options) => {
  request('delete', options);
};

const put = (options) => {
  request('put', options);
};

module.exports = {
  get,
  post,
  put,
  delete: DELETE
};

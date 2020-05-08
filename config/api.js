// 统一的请求接口
const baseUrl = 'https://zczj.0791jr.com/app.php?';
const http = ({
  url = '',
  param = {},
  ...other
} = {}) => {
  // wx.showNavigationBarLoading();
  return new Promise((resolve, reject) => {
    wx.request({
      url: getUrl(url),
      data: param,
      header: {
        // "content-type": "application/json; charset=utf-8"
        "content-type": "application/x-www-form-urlencoded;charset=UTF-8"
      },
      ...other,
      complete: (res) => {
        if (res.statusCode >= 200 && res.statusCode < 300) { //请求成功
          if (res.data.code == 200) { //请求效验成功
            resolve(res.data)
          } else if (res.data.code == 204){
            reject(res.data)
            // wx.showToast({
            //   title: res.data.msg,
            //   icon: 'none'
            // })
            // wx.showToast({
            //   title: '登录失效，请重新登录',
            //   icon: 'none'
            // })
            // setTimeout(function(){
            //   wx.reLaunch({url: '/pages/logon/logon'})
            // },1000)
          } else { //请求效验失败
            wx.showToast({
              title: res.data.msg,
              icon: 'none'
            })
            reject(res.data)
          }
        } else { //请求失败
          reject(res.data)
        }
      }
    })
  })
}
const https = ({
  url = '',
  param = {},
  ...other
} = {}) => {
  // wx.showNavigationBarLoading();
  return new Promise((resolve, reject) => {
    wx.request({
      url: getUrl(url),
      data: param,
      header: {
        "content-type": "application/json; charset=utf-8"
        // "content-type": "application/x-www-form-urlencoded;charset=UTF-8"
      },
      ...other,
      complete: (res) => {
        if (res.statusCode >= 200 && res.statusCode < 300) { //请求成功
          if (res.data.code == 200) { //请求效验成功
            resolve(res.data)
          } else if (res.data.code == 204) {
            reject(res.data)
            // wx.showToast({
            //   title: res.data.msg,
            //   icon: 'none'
            // })
            // wx.showToast({
            //   title: '登录失效，请重新登录',
            //   icon: 'none'
            // })
            // setTimeout(function(){
            //   wx.reLaunch({url: '/pages/logon/logon'})
            // },1000)
          } else { //请求效验失败
            wx.showToast({
              title: res.data.msg,
              icon: 'none'
            })
            reject(res.data)
          }
        } else { //请求失败
          reject(res.data)
        }
      }
    })
  })
}

const getUrl = (url) => {
  if (url.indexOf('://') == -1) {
    url = baseUrl + url;
  }
  return url
}

// get方法
const _get = (url, param = {}) => {
  return http({
    url,
    param
  })
}

const _post = (url, param = {}) => {
  return http({
    url,
    param,
    method: 'post'
  })
}

const _posts = (url, param = {}) => {
  return https({
    url,
    param,
    method: 'post'
  })
}

const _put = (url, param = {}) => {
  return http({
    url,
    param,
    method: 'put'
  })
}

const _delete = (url, param = {}) => {
  return http({
    url,
    param,
    method: 'put'
  })
}
module.exports = {
  baseUrl,
  get: _get,
  post: _post,
  posts: _posts,
  put: _put,
  delete: _delete
}
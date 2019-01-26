import axios from 'axios'
import store from '@/store'
import {
  Message,
  Loading
} from 'element-ui'
import router from '@/router'

axios.defaults.timeout = 5000
axios.defaults.baseURL = 'api/'


//请求拦截
axios.interceptors.request.use(
  config => {
    Loading.service({
      text: 'Loading'
    })
    if (store.state.token) { // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers['X-Token'] = store.state.token
    }
    return config;
  },
  err => {
    Message.error({
      message: '请求超时'
    })
    return Promise.reject(err)
  });

//响应拦截
axios.interceptors.response.use(res => {
  Loading.service().close()
  if ('status' in res.data && res.data.status === 401) {
    Message.error({
      message: res.data.msg
    })
    router.replace('/login')
    // return res.data
  } else {
    return res.data
  }
  return Promise.reject(res)
}, err => {
  Loading.service().close()
  if (err.response.status == 504 || err.response.status == 404) {
    Message.error({
      message: '服务器被吃了⊙﹏⊙∥'
    });
  } else if (err.response.status == 403) {
    Message.error({
      message: '权限不足,请联系管理员!'
    });
  } else {
    Message.error({
      message: '未知错误',
    });
  }
  return Promise.reject(err);
})

//封装get方法
export const fetch = (url, parmes = {}) => {
  return axios.get(url, {
    parmes
  })
}

//封装post方法
export const post = (url, data = {}) => {
  return axios.post(url, data)
}
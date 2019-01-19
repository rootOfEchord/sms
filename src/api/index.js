import axios from 'axios'
import store from '@/store'

axios.defaults.timeout = 5000
axios.defaults.baseURL = 'api/'


//请求拦截
axios.interceptors.request.use(
  config => {
    console.log(store.state.token);
    if (store.state.token) { // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers['X-Token'] = '222222'
    }
    return config;
  },
  err => {
    return Promise.reject(err)
  });

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
import {
  fetch,
  post
} from './index.js'

/**
 * 测试
 */
export const test = data => fetch('/users', data)

/**
 * 登陆
 */
export const login = data => post('/users/login', data)
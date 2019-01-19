import {
  fetch,
  post
} from './index.js'

/**
 * 登陆
 */
export const test = data => fetch('/users', data)
export const login = data => post('/users/login', data)
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

/**
 * 添加用户
 */
export const addUserAccount = data => post('/users/addUserAccount', data)

/**
 * 获取用户列表
 */
export const getUserList = data => fetch('/users/getUserList', data)

/**
 * 修改用户信息
 */
export const editUserAccount = data => post('/users/editUserAccount', data)

/**
 * 删除用户账号
 */
export const delUserAccount = data => post('/users/delUserAccount', data)

/**
 * 删除用户账号
 */
export const editUserPwd = data => post('/users/editUserPwd', data)
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

/**
 * 通过父类id 获取分类
 */
export const getSortByParentId = data => fetch('/goods/getSortByParentId', data)

/**
 * 增加分类
 */
export const addSort = data => fetch('/goods/addSort', data)

/**
 * 增加商品
 */
export const addGoods = data => post('/goods/addGoods', data)

/**
 * 获取商品列表数据
 */
export const getGoods = data => fetch('/goods/getGoods', data)

/**
 * 获取所有三级分类
 */
export const getAllMinSort = data => fetch('/goods/getAllMinSort', data)

/**
 * 获取商品库存信息
 */
export const getGoodsStore = data => fetch('/goods/getGoodsStore', data)

/**
 * 获取商品总条数
 */
export const getGoodsCount = data => fetch('/goods/getGoodsCount', data)

/**
 * 商品入库
 */
export const addGoodsStore = data => post('/goods/addGoodsStore', data)

/**
 * 通过条形码查询单个商品
 */
export const getOneGoods = data => post('/goods/getOneGoods', data)

/**
 * 新曾订单
 */
export const addOrder = data => post('/goods/addOrder', data)

/**
 * 获取商品销量数据
 */
export const getGoodsEchartData = data => fetch('/goods/getGoodsEchartData', data)

/**
 * 获取首页数据
 */
export const indexData = data => fetch('/goods/indexData', data)
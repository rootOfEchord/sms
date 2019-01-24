<!--
  头部组件
    @userImg: 用户头像src type: String
-->


<template lang="html">
  <div class="header-box">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item v-for="(item,index) in $route.meta" :key="index">{{item}}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-dropdown placement='start' trigger="click">
        <img :src="userImg" alt="" class="user-img">
      <el-dropdown-menu slot="dropdown" >
        <el-dropdown-item><router-link :to="{ path: '/home/user_center' }">个人中心</router-link></el-dropdown-item>
        <el-dropdown-item><router-link :to="{ path: '/home/change_pwd' }">修改密码</router-link></el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import defaultImg from '@/assets/img/user_img.jpg'
export default {
  props: {
    userImg: {
      type: String,
      default: defaultImg
    }
  }
}
</script>

<style lang="scss" scoped>
  .header-box{
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px;
    padding-left: 20px;
    background-color: #EFF2F7;
    .el-dropdown{
      font-size: 14px;
      width: 98px;
      text-align: center;
      margin-right: 10px;
      .user-img{
        width: 36px;
        height: 36px;
        border-radius: 50%;
        outline: none;
      }
      .el-dropdown-menu{
        top: 40px;
      }
    }
  }
</style>

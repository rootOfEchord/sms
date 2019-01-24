<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/login">login</router-link> |
      <router-link to="/home">home</router-link>
    </div> -->
    <router-view/>
  </div>
</template>

<style lang="scss">
  @import './assets/styles/common';
  #app{
    width: 100%;
    height: 100%;
  }
  //全局公共样式
  .el-card__header{
    background-color: #f2f2f2;
  }
</style>

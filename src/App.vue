<template>
  <div id="app">
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
  .el-message{
    min-width: 200px;
    text-align: center;
  }

</style>

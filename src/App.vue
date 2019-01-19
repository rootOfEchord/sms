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
</style>

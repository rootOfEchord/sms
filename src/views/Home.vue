<template lang="html">
  <div class="home">
    <el-container>
      <el-aside width="200px">Aside</el-aside>
      <el-container>
        <el-header>Header</el-header>
        <el-main>Main</el-main>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
</div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  monuted(){

  }
}
</script>

<style lang="scss" scoped>
  @import '../assets/styles/mixin';
  .home{
    @include ft(50px,50px);
  }
</style>

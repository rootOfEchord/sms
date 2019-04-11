<template lang="html">
  <div class="home">
    <el-container>
      <!-- 左边菜单 -->
      <el-aside width="230px">
        <div class="aside-title">
          <h2>惠利多超市管理</h2>
          <p>您好 {{$store.state.realName}}</p>
          <div class="aside-link">
            <span @click="closeAllMeun" >首页管理</span>
            <b>|</b>
            <span @click="signOut" >退出系统</span>
          </div>
        </div>
          <el-menu unique-opened router :default-active="$route.path" ref="menu">
             <el-submenu index="1">
               <template slot="title">
                 <i class="el-icon-goods"></i>
                 <span>商品管理</span>
               </template>
               <el-menu-item index="/home/listGoods">商品管理</el-menu-item>
               <el-menu-item index="/home/addGoods">添加商品</el-menu-item>
             </el-submenu>
             <el-submenu index="2">
               <template slot="title">
                 <i class="el-icon-tickets"></i>
                 <span>库存管理</span>
               </template>
               <el-menu-item index="/home/goodsStoreList">库存管理</el-menu-item>
               <el-menu-item index="/home/goodsSell">商品出库</el-menu-item>
             </el-submenu>
             <el-submenu index="3">
               <template slot="title">
                 <i class="el-icon-tickets"></i>
                 <span>商品统计图</span>
               </template>
               <el-menu-item index="/home/goodsSellEchart">销量统计</el-menu-item>
             </el-submenu>
             <el-submenu index="4">
               <template slot="title">
                 <i class="el-icon-tickets"></i>
                 <span>账号管理</span>
               </template>
               <el-menu-item index="/home/listAccount">管理账号</el-menu-item>
               <el-menu-item index="/home/addAccount">添加账号</el-menu-item>
               <el-menu-item index="/home/editAccount">修改密码</el-menu-item>
             </el-submenu>
           </el-menu>
      </el-aside>
      <!-- 右侧主体 -->

      <el-container>
        <el-header><MyHeader /></el-header>
        <el-main><router-view/></el-main>
        <el-footer height="50px">© Copyright 2018 华联超市管理系统</el-footer>
      </el-container>
    </el-container>
</div>
</template>

<script>
  import MyHeader from '@/components/Header'
  import {getStore} from '@/config/mUtils'
export default {
  data() {
    return {

    }
  },
  methods:{
    signOut(){
      //清除localstoreage里的所有用户信息并跳转到登录页面
      window.localStorage.clear()
      this.$router.replace('/login')
    },
    closeAllMeun(){
      this.$router.push('/home')
      this.$nextTick(()=>{
        this.$refs.menu.openedMenus=[]
      })
    }
  },
  mounted(){
    //获取用户信息存入store
    let token = getStore('token')
    let realName = getStore('realName')
    if(token && realName){
      this.$store.commit('setToken',token)
      this.$store.commit('setRealName',realName)
    }else{
      this.$myMessage({isOk:false,msg:'登录后可访问该页面'});
      this.$router.push('/login')
    }
  },
  components: {
    MyHeader
  }
}
</script>

<style lang="scss" scoped>
  @import '../assets/styles/mixin';
  .home{
    height: 100%;
    .el-container{
      height: 100%;
    }
    .el-aside{
      background-image: url('../assets/img/left_bg.png');
      .aside-title{
        padding: 20px 8px;
        text-align: right;
        color: #d1d0cf;
        .aside-link{
          padding-top: 20px;
          font-size: 14px;
          b{
            font-weight: normal;
            margin: 0 10px;
          }
          span{
            cursor: pointer;
            color: #d1d0cf;
            &:hover{
              color: #fff;
            }
          }
        }
      }

    }
    .el-menu{
      padding-left: 16px;
      background-color: transparent;
      border: none;
      /deep/ .el-submenu__title{
        background-color: green;
        color: #fff;
        border-radius: 8px 0 0 8px;
        margin: 10px 0;
        // background-image: url('../assets/img/menu_bg.png');
      }
      /deep/ .el-menu--inline{
        background-color: transparent;
      }
      /deep/ .el-menu-item{
        color: #d1d0cf;
        text-align: right;
        &:hover,&.is-active,&:focus{
            background-color: transparent;
            color: $blue;
            &::after{
              content: '';
              display: block;
              width: 0;
              height: 0;
              border: 8px solid transparent;
              border-right-color: $blue;
              position: absolute;
              top: 50%;
              transform: translatey(-50%);
              right: 0;
            }
        }
      }
    }
    .el-header{
      padding: 0;
    }
    .el-main{
      display: flex;
      &>div{
        flex: 1;
      }
    }
    .el-footer {
      height: 50px;
      line-height: 50px;
      font-size: 12px;
      background-color: #f2f2f2;
      color: #333;
    }
  }

</style>

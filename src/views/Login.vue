<template lang="html">
  <div class="login">
    <div class="login-box ctt">
      <!-- logo -->
      <div class="logo">
        <img src="../assets/img/logo.png" alt="logo">
        <h2>惠利多超市</h2>
      </div>
      <p>请使用您的账号密码登录系统</p>
      <!-- 登录表单 -->
      <div class="form-box">
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" >
          <el-form-item prop="username">
            <el-input type="text" v-model="ruleForm.username"  placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item prop="pwd">
            <el-input type="password" v-model="ruleForm.pwd" autocomplete="off" placeholder="请输入密码"></el-input>
          </el-form-item>
          <div class="rember-pwd">
            <el-checkbox v-model="rember">记住密码</el-checkbox>
            <a href="#">忘记密码?</a>
          </div>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!-- footer -->
      <div class="reg">
        <p>您还未注册？请 <a href="#">注册</a></p>
      </div>
    </div>
  </div>
</template>

<script>
  import {test} from '@/api/api'
export default {

  data(){
    return {
      rember: false,
      ruleForm: {
         username: '',
         pwd: ''
       },
       //表单验证规则
       rules: {
         username: [
           { required: true, message: '请输入用户名', trigger: 'blur' }
         ],
         pwd: [
           { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
         ]
       }
    }
  },
  methods: {
    submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              alert('submit!');
              test().then((res)=>{console.log(res);})
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        }
      }

}
</script>

<style lang="scss" scoped>
  @import '../assets/styles/mixin';
  .login{
    @include wh(100%,100%);
    text-align: center;
    background-color: rgba(0,0,0,0.6);
    color: #fff;
    &::after{
      position: fixed;
      top: 0;
      left: 0;
      @include wh(100%,100%);
      @include bis('../assets/img/login.jpg');
      content: "";
      z-index: -1;
    }
  }
  .login-box{
    @include wh(400px,auto);
    box-sizing: border-box;
    padding:20px;
  }
  .logo{
    p{
      @include ft(20px,150%);
      margin: 20px 0;
    }
  }
  .form-box{
    margin: 20px 0;
    /deep/ .el-button{
      width: 100%;
    }
    .rember-pwd{
      @include fj;
      align-items: center;
      margin-bottom: 22px;
      font-size: 14px;
    }
  }
</style>

<template>
  <div class="add-account">
    <el-card class="box-card">
      <div slot="header">
        <span>修改密码</span>
      </div>
      <div >
        <el-form :model="ruleForm" label-position="top" label-width="80px" status-icon :rules="rules" ref="ruleForm" >
          <el-form-item prop="oldPwd" label="原密码">
            <el-input type="password" v-model="ruleForm.oldPwd" autocomplete="off" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item prop="newPwd" label="新密码">
            <el-input type="password" v-model="ruleForm.newPwd" autocomplete="off" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item prop="checkPwd" label="确认新密码">
            <el-input type="password" v-model="ruleForm.checkPwd" autocomplete="off" placeholder="请再次输入密码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">修改</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
import {editUserPwd} from '@/api/api'
export default {
  data(){
    var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入新密码'));
        } else if (value !== this.ruleForm.newPwd) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
    return{
      ruleForm: {
         oldPwd: '',
         newPwd: '',
         checkPwd: ''
       },
       //表单验证规则
       rules: {
         oldPwd: [
           { required: true, message: '请输入旧密码', trigger: 'blur' }
         ],
         newPwd: [
           { required: true, message: '请输入新密码', trigger: 'blur' },
            { min: 6, max: 32, message: '长度在 6 到 32 个字符', trigger: 'blur' }
         ],
         checkPwd: [
           { validator: validatePass, trigger: 'blur' }
         ]
       }
    }
  },
  methods: {
    submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              editUserPwd(this.ruleForm).then((res)=>{
                this.$myMessage(res)
                if(res.isOk){
                  //密码修改成功清除用户信息并跳转到登录页面
                  window.localStorage.clear()
                  this.$router.replace('/login')
                }
              }).catch((err)=>{
                console.log(err);
              })
            } else {
              return false;

            }
          });
        }
  }
}
</script>

<style lang="scss" scoped>
  .add-account{
      .el-form{
        width: 600px;
        margin: 0 auto;
      }
      .el-card{
        min-height: 100%;
      }
  }
</style>

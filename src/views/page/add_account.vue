<template>
  <div class="add-account">
    <el-card class="box-card">
      <div slot="header">
        <span>添加账号</span>
      </div>
      <div >
        <el-form :model="ruleForm" label-position="top" label-width="80px" status-icon :rules="rules" ref="ruleForm" >
          <el-form-item prop="userName" label="用户名">
            <el-input type="text" v-model="ruleForm.userName"  placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item prop="userPwd" label="密码">
            <el-input type="password" v-model="ruleForm.userPwd" autocomplete="off" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item prop="checkPwd" label="确认密码">
            <el-input type="password" v-model="ruleForm.checkPwd" autocomplete="off" placeholder="请再次输入密码"></el-input>
          </el-form-item>
          <el-form-item prop="realName" label="管理员姓名">
            <el-input type="text" v-model="ruleForm.realName"  placeholder="请输入管理员姓名"></el-input>
          </el-form-item>
          <el-form-item label="选择用户组">
              <el-select v-model="ruleForm.userGroup">
                  <el-option label="管理员" value="管理员"></el-option>
                  <el-option label="超级管理员" value="超级管理员"></el-option>
              </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">添加</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data(){
    var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.userPwd) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
    return{
      ruleForm: {
         userName: '',
         userPwd: '',
         userGroup: '管理员',
         checkPwd: '',
         realName: ''
       },
       //表单验证规则
       rules: {
         userName: [
           { required: true, message: '请输入用户名', trigger: 'blur' }
         ],
         userPwd: [
           { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
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
              this.$message({
                message: '恭喜你，这是一条成功消息',
                type: 'success',
                center: true
              });
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

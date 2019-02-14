<template>
  <div class="list-account-box">
  <el-table  :data="tableData"  style="width: 100%" stripe border>
    <el-table-column  label="添加日期"  width="200">
      <template slot-scope="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ scope.row.addTime|getDate }}</span>
      </template>
    </el-table-column>
    <el-table-column  label="用户名"  >
      <template slot-scope="scope">
        <span>{{scope.row.userName}}</span>
      </template>
    </el-table-column>
    <el-table-column  label="用户组"  >
      <template slot-scope="scope">
        <span>{{scope.row.userGroup}}</span>
      </template>
    </el-table-column>
    <el-table-column  label="管理员姓名">
      <template slot-scope="scope">
        <span>{{scope.row.realName || '暂无'}}</span>
      </template>
    </el-table-column>
    <el-table-column label="操作" width="180">
      <template slot-scope="scope">
        <el-button  size="mini"  @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button  size="mini"  type="danger"  @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <!-- 内容编辑弹出层 -->
  <el-dialog title="修改管理员账号" :visible.sync="editBoxIsShow">
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
        <el-button type="primary" @click="submitForm('ruleForm')">修改</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</div>
</template>

<script>
import {getUserList,editUserAccount,delUserAccount} from '@/api/api'
import {dateFtt} from '@/config/mUtils'
  export default {
    data() {
      var validatePass = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请再次输入密码'));
          } else if (value !== this.ruleForm.userPwd) {
            callback(new Error('两次输入密码不一致!'));
          } else {
            callback();
          }
        };
      return {
        editBoxIsShow: false,
        tableData: [],
        ruleForm: {
           userName: '',
           userPwd: '',
           userGroup: '',
           checkPwd: '',
           realName: '',
           u_id: 0,
           oldPwd: ''
         },
         //表单验证规则
         rules: {
           userName: [
             { required: true, message: '请输入用户名', trigger: 'blur' }
           ],
           userPwd: [
             { required: true, message: '请输入密码', trigger: 'blur' },
              { min: 6, max: 32, message: '长度在 6 到 32 个字符', trigger: 'blur' }
           ],
           checkPwd: [
             { validator: validatePass, trigger: 'blur' }
           ]
         }
      }
    },
    methods: {
      getTableData(){
        getUserList().then((res)=>{
          this.tableData = res
        })
      },
      handleEdit(index, row) {
        this.editBoxIsShow = true
        let {userName,userPwd,userGroup,realName,u_id} = row
        this.ruleForm = {
          userName,userPwd,userGroup,checkPwd:userPwd,realName,u_id,oldPwd:userPwd
        }
      },
      handleDelete(index, row) {
        this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

          delUserAccount({u_id:row.u_id}).then((res)=>{
            this.$myMessage(res)
            if(res.isOk){
              //删除成功更新表格数据
              this.getTableData()
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            editUserAccount(this.ruleForm).then((res)=>{
              this.$myMessage(res)
              if(res.isOk){
                this.editBoxIsShow = false
                this.getTableData()
              }
            })
          } else {
            return false;
          }
        });
      }
    },
    mounted(){
      this.getTableData()
    },
    filters: {
      getDate(times){
        return dateFtt('yyyy-MM-dd hh:mm:ss',times)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .el-form{
    width: 80%;
    margin: 0 auto;
  }
</style>

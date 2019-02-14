<template lang="html">
  <div class="">
    <el-card class="box-card">
      <!-- 主体表格头部 -->
      <div slot="header" class="clearfix card-head">
          <span>系统消息</span>
      </div>
      <!-- 主体表格内容 -->
      <div class="text item">
          <!-- 两条提示框 -->
          <el-alert :title="name" type="info" show-icon></el-alert>
          <el-alert :title="message.msg" :type="message.type" show-icon :closable="false"></el-alert>
          <el-row :gutter="40">
              <el-col :span="12">
                  <div class="grid-content bg-purple">

                      <!-- 左边子卡片 -->
                      <el-card class="box-card">
                          <!-- 头 -->
                          <div slot="header">
                              <span>销售排行</span>
                          </div>
                          <!-- 身 -->
                          <div class="text item">
                              <template>
                                  <el-table :data="tableData1" stripe style="width: 100%" v-loading="loading">
                                      <el-table-column prop="goodsName" label="商品名称">
                                      </el-table-column>
                                      <el-table-column prop="goodsSold" label="销量" width="116px">
                                      </el-table-column>
                                  </el-table>
                              </template>
                          </div>
                      </el-card>
                  </div>
              </el-col>
              <el-col :span="12">
                  <div class="grid-content bg-purple">
                      <!-- 右边子卡片 -->
                      <el-card class="box-card">
                          <!-- 头 -->
                          <div slot="header" class="fb">
                              <span >缺货的商品</span>
                              <router-link to="/home/goodsStoreList">添加库存</router-link>
                          </div>
                          <!-- 身 -->
                          <div class="text item">
                              <template>
                                  <el-table :data="tableData2" stripe style="width: 100%" v-loading="loading">
                                      <el-table-column prop="goodsName" label="商品名称">
                                      </el-table-column>
                                      <el-table-column label="库存" width="100px">
                                        <template slot-scope="scope" >
                                            <span :class="scope.row.goodsStore?'':'red'">{{scope.row.goodsStore}}</span>
                                        </template>
                                      </el-table-column>
                                  </el-table>
                              </template>
                          </div>
                      </el-card>
                  </div>
              </el-col>
          </el-row>
      </div>
  </el-card>
  </div>
</template>

<script>
import {indexData} from '@/api/api'
export default {
  data(){
    return {
      loading: true,
      name: '欢迎登陆惠利多超市管理系统, 祝你生活愉快',
      message: {
        msg: '欢迎',
        type: 'info'
      },
      tableData1: [],
      tableData2: []
    }
  },
  mounted(){
    indexData().then(data=>{
      this.tableData1 = data.goodsSoldData
      this.tableData2 = data.goodsStoreData
      this.message = data.message
      this.loading = false
    })
  }
}
</script>

<style lang="scss" scoped>
  .el-alert{
      background: #dbe3ff;
      margin: 10px 0;
  }
  .red{
    color: red;
  }
  .fb{
    display: flex;
    justify-content: space-between;
  }
</style>

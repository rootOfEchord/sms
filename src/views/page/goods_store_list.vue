<template>
  <div class="">

    <el-card>
      <div slot="header" class="card-header">
        <span class="title">库存管理</span>
        <div class="sort-type">
          <span>排序方式: </span>
          <el-select v-model="sortType" @change="getTableData" placeholder="请选择排序方式">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <template>
            <el-radio v-model="sortord" :label="0" @change="getTableData"><span class="el-icon-caret-bottom"></span></el-radio>
            <el-radio v-model="sortord" :label="1" @change="getTableData"><span class="el-icon-caret-top"></span></el-radio>
          </template>
        </div>
      </div>
      <!-- 卡片内容 -->
      <div>
        <el-table v-loading="loading" :data="tableData"  style="width: 100%" stripe border>
          <el-table-column  label="商品名称"  width="200">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.goodsName }}</span>
            </template>
          </el-table-column>
          <el-table-column  label="商品条形码"  >
            <template slot-scope="scope">
              <span>{{scope.row.goodsCode}}</span>
            </template>
          </el-table-column>
          <el-table-column  label="商品库存"  >
            <template slot-scope="scope">
              <span :class="scope.row.goodsStore<10? 'red':''">{{scope.row.goodsStore}}</span>
            </template>
          </el-table-column>
          <el-table-column  label="商品已售">
            <template slot-scope="scope">
              <span>{{scope.row.goodsSold}}</span>
            </template>
          </el-table-column>
          <el-table-column  label="商品计量单位">
            <template slot-scope="scope">
              <span>{{scope.row.goodsUnit}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="180">
            <template slot-scope="scope">
              <el-button  size="mini"  @click="handleEdit(scope.$index, scope.row)">添加库存</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination v-show="show" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[5,10,15]"
            :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total" background>
        </el-pagination>
      </div>
    </el-card>
    <!-- 内容编辑弹出层 -->
    <el-dialog title="商品入库" :visible.sync="editBoxIsShow">
      <div class="show-num">
        <span>当前商品: </span>
        <span >{{showNum.goodsName}}</span>
        <span>库存数量: </span>
        <span class="num">{{showNum.goodsStore}}</span>
      </div>
      <el-form :model="ruleForm" label-width="80px" status-icon :rules="{storeNum:[{ required: true, message: '请输入入库数量', trigger: 'blur' }]}" ref="ruleForm" >
        <el-form-item prop="storeNum" label="入库数量">
          <el-input type="text" v-model.number="ruleForm.storeNum"  placeholder="请输入入库数量"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {getGoodsStore,getGoodsCount,addGoodsStore} from '@/api/api'
export default {
  data(){
    return {
      editBoxIsShow: false,
      loading: true,
      currentPage: 1, //当前页数
      total: 0,   //总条目数
      pageSize: 10, //每页条数
      tableData: [],
      sortType: 0, //排序类型
      sortord: 1, //排序方式
      options: [
        {
          value: 0,
          label: '库存数量'
        },
        {
          value: 1,
          label: '销售数量'
        }
      ],
      ruleForm: {
        g_id: 0,
        storeNum: null
      },
      showNum: {
        goodsName: '',
        goodsStore: null
      }
    }
  },
  methods: {
    handleEdit(index,row){
      this.editBoxIsShow = true
      this.ruleForm.g_id = row.g_id
      this.showNum.goodsName = row.goodsName
      this.showNum.goodsStore = row.goodsStore
    },
    submitForm(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          addGoodsStore(this.ruleForm).then(data=>{
            this.$myMessage(data)
            if(data.isOk){
              this.editBoxIsShow = false
              this.getTableData()
            }
          })
        } else {
          return false;
        }
      });
    },
    //获取数据函数
    getTableData(){
      this.loading = true
      let params = {
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        sortType: this.sortType,
        sortord: this.sortord
      }
      getGoodsStore(params).then(data=>{
        this.tableData = data
        this.loading = false
      })
    },
    //切换没页条数
    handleSizeChange(val) {
      this.pageSize = val
      this.currentPage = 1
      this.getTableData()
    },
    //跳转到指定页
    handleCurrentChange(val) {
      this.currentPage = val
      this.getTableData()
    },
  },
  mounted(){
    this.getTableData()
    getGoodsCount().then(data=>{
      this.total = data[0]['count(*)']
    })
  },
  computed: {
    show(){
      return this.tableData.length != 0
    }
  }
}
</script>

<style lang="scss" scoped>
  .card-header{
    display: flex;
    justify-content: space-between;
  }
  .el-select{
    margin: 0 16px;
  }
  .title{
    font-size: 20px;
    line-height: 40px;
    font-weight: bold;
  }
  .el-pagination{
    margin-top: 10px;
  }
  .show-num{
    text-align: center;
    margin-bottom: 16px;
    font-size: 18px;
    span{
      margin: 0 10px;
    }
    .num{
      color: red;
      font-size: 20px;
    }
  }
  .red{
    color: red;
  }
</style>

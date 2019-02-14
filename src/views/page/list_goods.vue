<template>
  <div class="listGoods">
    <div class="">
      <el-form :inline="true" :model="search" class="demo-form-inline" size="mini">
          <el-form-item>
              <el-select v-model="search.sortId" filterable placeholder="---选择分类---">
                  <el-option label="所有分类" :value="0"></el-option>
                  <el-option v-for="item in sortOptions" :label="item.sortName" :value="item.s_id" :key="item.s_id"></el-option>
              </el-select>
          </el-form-item>
          <el-form-item label="关键字">
              <el-input v-model="search.keyWords" placeholder="商品名称,条形码"></el-input>
          </el-form-item>
          <el-form-item>
              <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
          <el-form-item>
              <el-button type="primary" @click="showAllGoods">查看所有商品</el-button>
          </el-form-item>
      </el-form>
    </div>
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
      <el-table-column  label="商品售价"  >
        <template slot-scope="scope">
          <span>{{scope.row.goodsPrice}}</span>
        </template>
      </el-table-column>
      <el-table-column  label="商品进价">
        <template slot-scope="scope">
          <span>{{scope.row.goodsCost}}</span>
        </template>
      </el-table-column>
      <el-table-column  label="商品计量单位">
        <template slot-scope="scope">
          <span>{{scope.row.goodsUnit}}</span>
        </template>
      </el-table-column>
      <el-table-column  label="所属分类">
        <template slot-scope="scope">
          <span>{{scope.row.sortName}}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button  size="mini"  @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button  size="mini"  type="danger"  @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column> -->
    </el-table>
    <!-- 分页 -->
    <el-pagination v-show="show" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[5,10,15]"
        :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total" background>
    </el-pagination>
  </div>
</template>

<script>
import {getGoods,getAllMinSort} from '@/api/api'
export default {
  data(){
    return {
      loading: true,
      currentPage: 1, //当前页数
      total: 0,   //总条目数
      pageSize: 10, //每页条数
      tableData: [],
      sortOptions: [],
      search: {
        sortId: 0,
        keyWords: ''
      }
    }
  },
  methods: {
    //查询
    onSubmit(){
      let search = this.search
      if(search.sortId === 0 && search.keyWords === ''){
        return false
      }else{
        this.getGoodsData()
      }
    },
    showAllGoods(){
      this.search = {
        sortId: 0,
        keyWords: ''
      }
      this.currentPage = 1
      this.getGoodsData()
    },
    //切换没页条数
    handleSizeChange(val) {
      this.pageSize = val
      this.currentPage = 1
      this.getGoodsData()
    },
    //跳转到指定页
    handleCurrentChange(val) {
      this.currentPage = val
      this.getGoodsData()
    },
    //通过页数 获取商品列表
    getGoodsData(){
      this.loading = true
      let params = {
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        ...this.search
      }
      getGoods(params).then(data=>{
        if(this.currentPage === 1){
          this.total = data.count[0]['count(*)']
          this.tableData = data.data
        }else{
          this.tableData = data
        }
        this.loading = false
      })
    }
  },
  mounted(){
    this.getGoodsData()
    //初始化分类下拉框数据
    getAllMinSort().then(data=>{
      this.sortOptions = data
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
  .el-pagination{
    margin-top: 10px;
  }
</style>

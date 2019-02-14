<template>
<div class="">
  <el-card class="box-card">
    <!-- 卡片头部 -->
    <div slot="header">
        <span>商品出库</span>
    </div>
    <!-- 卡片身体 -->
    <div class="text item">
        <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" >
            <el-form-item label="商品条形码" prop="goodsCode">
                <el-input v-model="ruleForm2.goodsCode"></el-input>
            </el-form-item>
            <el-form-item label="数量" prop="goodsNum">
                <el-input v-model.number="ruleForm2.goodsNum"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm2')" size="mini">加入订单</el-button>
                <el-button @click="resetForm('ruleForm2')" size="mini">重新出库</el-button>
            </el-form-item>
        </el-form>
        <!-- 表格 -->
        <el-table :data="tableData" style="width: 100%" stripe>
            <el-table-column prop="goodsname" label="商品名称">
              <template slot-scope="scope">
                      <span> {{ scope.row.goodsName}}</span>
                  </template>
            </el-table-column>
            <el-table-column prop="saelNum" label="数量" width="180">
              <template slot-scope="scope">
                      <span> {{ scope.row.goodsNum}}</span>
                  </template>
            </el-table-column>
            <el-table-column label="单价(元)"  width="180">
                    <template slot-scope="scope">
                            <span> {{ scope.row.goodsPrice | formatPrice}}</span>
                        </template>
            </el-table-column>
            <el-table-column  label="总价(元)"  width="180">
                    <template slot-scope="scope">
                            <span> {{ (scope.row.goodsNum * scope.row.goodsPrice) | formatPrice}}</span>
                        </template>
            </el-table-column>
        </el-table>
        <p class="text">总价: <span class="red">{{allPrice | formatPrice}}</span> 元</p>
        <el-button type="primary" @click="shopping" size="mini">确认提交</el-button>
    </div>
  </el-card>
</div>
</template>

<script>
import {getOneGoods,addOrder} from '@/api/api'
export default {
  data(){
    return {
      allPrice: 0,
      ruleForm2: {
          goodsCode: '',
          goodsNum: null
      },
      tableData: [],
      rules2: {
          goodsCode: [
              { required: true, message: '请输入条形码', trigger: 'blur' },
          ],
          goodsNum: [
              { required: true, message: '请输入数量', trigger: 'blur' },
          ],
      }
    }
  },
  methods: {
    //提交表单函数
    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
            if (valid) {
              let params = {
                goodsCode: this.ruleForm2.goodsCode
              }
              getOneGoods(params).then(data=>{
                this.$myMessage(data)
                if(data.isOk){
                  let subTable = {
                    goodsName: data.data[0].goodsName,
                    goodsNum: this.ruleForm2.goodsNum,
                    goodsPrice: data.data[0].goodsPrice,
                    goodsCode: this.ruleForm2.goodsCode
                  }
                  this.tableData.push(subTable)
                  this.getAllPrice()
                  this.$refs[formName].resetFields()
                }
              })
            } else {
                return false;
            }
        });
    },
    //提交订单
    shopping(){
      if(this.tableData.length === 0){
        this.$myMessage({isOk:false,msg:'你还没有商品'})
      }else{
        let params = {
          orderData: this.tableData,
          allPrice: this.allPrice
        }
        addOrder(params).then(data=>{
          this.$myMessage(data)
          if(data.isOk){
            this.tableData = []
            this.getAllPrice()
          }
        })
      }
    },
    //重置表单
    resetForm(formName) {
        this.$refs[formName].resetFields();
    },
    // 计算总价
    getAllPrice(){
      let allPrice = 0
      this.tableData.forEach(v=>{
        allPrice += v.goodsNum*v.goodsPrice
      })
      this.allPrice = allPrice
    }
  },
  filters: {
      //过滤器做一个管道格式化价格
      formatPrice(price) {
          return price.toFixed(2);
      }
  }

}
</script>

<style lang="scss" scoped>
.el-input {
      width: 300px;
  }

  .el-form-item__label {
      line-height: 100%;
  }
  .text{
    margin: 10px 0;
  }
  .red{
    color: red;
  }
</style>

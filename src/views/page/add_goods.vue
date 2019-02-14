<template>
  <div class="">
    <div class="title">添加商品</div>
    <el-form :model="goodsForm" class="goods-form"  label-width="110px" status-icon :rules="rules" ref="goodsForm" >
      <el-form-item prop="goodsSort" label="选择分类">
        <el-cascader
          :options="sortOptions"
          @active-item-change="handleItemChange"
          :props="props"
          v-model="goodsForm.goodsSort"
        ></el-cascader>
        <el-button type="primary" plain class="myBtn" @click="addBoxIsShow = true">添加分类</el-button>
      </el-form-item>
      <el-form-item prop="goodsCode" label="商品条形码">
        <el-input type="text" v-model="goodsForm.goodsCode" class="code-input" placeholder="请输入商品名称"></el-input>
        <el-button type="primary" plain class="myBtn" @click="getCode">生成条形码</el-button>
      </el-form-item>
      <el-form-item prop="goodsName" label="商品名称">
        <el-input type="text" v-model="goodsForm.goodsName"  placeholder="请输入商品名称"></el-input>
      </el-form-item>
      <el-form-item prop="goodsUnit" label="商品计量单位">
        <el-input type="text" v-model="goodsForm.goodsUnit"  placeholder="请输入商品计量单位"></el-input>
      </el-form-item>
      <el-form-item prop="goodsPrice" label="商品售价">
        <el-input type="text" v-model.number="goodsForm.goodsPrice" placeholder="请输入商品售价"></el-input>
        <span class="" v-show="goodsForm.goodsUnit"> 元/ {{goodsForm.goodsUnit}}</span>
      </el-form-item>
      <el-form-item prop="goodsCost" label="商品进价">
        <el-input type="text" v-model.number="goodsForm.goodsCost"  placeholder="请输入商品进价"></el-input>
        <span class="" v-show="goodsForm.goodsUnit"> 元/ {{goodsForm.goodsUnit}}</span>
      </el-form-item>
      <el-form-item prop="goodsStore" label="商品库存">
        <el-input type="text" v-model.number="goodsForm.goodsStore"  ></el-input>
        <span class="" v-show="goodsForm.goodsUnit"> {{goodsForm.goodsUnit}}</span>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addGoods('goodsForm')">添加</el-button>
      </el-form-item>
    </el-form>
    <!-- 添加分类弹出层 -->
    <el-dialog title="添加分类" :visible.sync="addBoxIsShow">
      <el-form :model="sortForm" label-width="80px" :rules="sortRules" ref="sortForm" >
        <el-form-item prop="sortName" label="分类名">
          <el-input type="text" v-model="sortForm.sortName"  placeholder="请输入分类名"></el-input>
        </el-form-item>
        <el-form-item label="分类等级">
          <el-radio-group v-model="sortGrade">
            <el-radio :label="0">顶级分类</el-radio>
            <el-radio :label="1">二级分类</el-radio>
            <el-radio :label="2">三级分类</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="parentId" label="所属分类" v-show="sortGrade">
          <el-cascader
            :options="parentSortOptions"
            @active-item-change="handleItemChange2"
            :props="props"
            v-model="sortForm.parentId"
          ></el-cascader>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addSort('sortForm')">添加</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {getSortByParentId,addSort,addGoods} from '@/api/api'
export default {
  data() {
    var validatePass = (rule, value, callback) => {
        if (value.length === 0 && this.sortGrade !=0) {
          callback(new Error('请选择所属分类'));
        }else {
          callback();
        }
      };
     return {
       addBoxIsShow: false,
       sortGrade: 0,
       sortOptions: [],
       topSorts: [],
       parentSortOptions: [],
       props: {
         value: 'index',
         label: 'sortName',
         children: 'subSort'
       },
       sortForm:{
         sortName: '',
         parentId: []
       },
       sortRules: {
         sortName: [
           { required: true, message: '请输入分类名', trigger: 'blur' }
         ],
         parentId: [
            { validator: validatePass, trigger: 'blur' }
         ]
       },
       goodsForm: {
         goodsSort: [],
         goodsCode: '',
         goodsName: '',
         goodsUnit: '',
         goodsPrice: null,
         goodsCost: null,
         goodsStore: 0
       },
       rules: {
         goodsSort: [
           { required: true, message: '请选择分类', trigger: 'blur' }
         ],
         goodsCode: [
           { required: true, message: '请输入商品条形码', trigger: 'change' }
         ],
         goodsName: [
           { required: true, message: '请输入商品名称', trigger: 'blur' }
         ],
         goodsPrice: [
           { required: true, message: '请输入商品价格', trigger: 'blur' },
           { type: 'number', message: '必须为数字值'}
         ],
         goodsUnit: [
           { required: true, message: '请输入商品单位', trigger: 'blur' },
         ],
         goodsCost: [
           { required: true, message: '请输入商品进价', trigger: 'blur' },
           { type: 'number', message: '必须为数字值'}
         ],
         goodsStore: [
           { required: true, message: '请输入商品库存', trigger: 'blur' },
           { type: 'number', message: '必须为数字值'}
         ]
       }
     }
   },

   methods: {
     //商品添加分类三级联动
     handleItemChange(val) {
       let item = val.length === 1? this.sortOptions[val[0]]: this.sortOptions[val[0]].subSort[val[1]]
       getSortByParentId({parentId: item.s_id}).then(res=>{
         if(val.length === 1){
           item.subSort = res.map((item,i)=>({...item,subSort: [],index: i}))
         }else{
           item.subSort = res.map((item,i)=>({...item,index: i}))
         }

       })
     },
     //添加分类 父级分类三级联动
     handleItemChange2(val){
       let item = this.parentSortOptions[val[0]]
       getSortByParentId({parentId: item.s_id}).then(res=>{
         item.subSort = res.map((item,i)=>({...item,index: i}))
       })
     },
     //增加商品
     addGoods(formName) {
       this.$refs[formName].validate((valid) => {
         if (valid) {
           let sortArr = this.goodsForm.goodsSort
           let goodsSort = this.sortOptions[sortArr[0]].subSort[sortArr[1]].subSort[sortArr[2]].s_id
           let params = {
             ...this.goodsForm,
             goodsSort
           }
           addGoods(params).then(data=>{
             this.$myMessage(data)
             if(data.isOk){
               //重置表单
               this.$refs[formName].resetFields()
             }
           })
         } else {
           this.$myMessage({isOk: false,msg: '请检查输入是否正确'})
           return false;
         }
       });
     },
     //增加分类
     addSort(formName) {
       this.$refs[formName].validate((valid) => {
         if (valid) {
           let parentArr = this.sortForm.parentId
           let parentId = 0
           if(this.sortGrade !== 0){
             parentId = parentArr.length ===1? this.parentSortOptions[parentArr[0]].s_id: this.parentSortOptions[parentArr[0]].subSort[parentArr[1]].s_id
           }
           let params = {
             sortName: this.sortForm.sortName,
             parentId
           }
           addSort(params).then(data=>{
             this.$myMessage(data)
             if(data.isOk){
               this.getTopSort()
               //重置表单
               this.$refs[formName].resetFields()
             }
           })
         } else {
           this.$myMessage({isOk: false,msg: '请检查输入是否正确'})
           return false
         }
       });
     },
     //初始化顶级分类
     getTopSort(){
       let params = {parentId: 0}
       getSortByParentId(params).then((res)=>{
         this.sortOptions = res.map((item,i)=>({...item,subSort: [],index: i}))
         this.topSorts = res
       })
     },
     //生成条形码
     getCode(){
       this.goodsForm.goodsCode = Date.now()
     },
     addmygoods(){
       function getRound(min,max){
         return Math.round(Math.random()*(max-min)+min)
       }
       let sortArr = ['厨房用品','餐具','电吹风','电风扇','花生油','酱油','辣条','双语类','中国名著','男装西服','裙子','瓶装啤酒','烤烟型']
       let sortIdArr = [12,13,15,16,20,21,28,22,23,24,25,26,27]
       for (var i = 0; i < 30; i++) {
         let index = getRound(0,sortArr.length-1)
         let params = {
            goodsCode: 1549611029111+i,
            goodsCost: getRound(10,60),
            goodsName: sortArr[index]+i,
            goodsPrice: getRound(60,120),
            goodsSort: sortIdArr[index],
            goodsStore: getRound(10,60),
            goodsUnit: "件",
         }
         addGoods(params).then(data=>[
           this.$myMessage(data)
         ])
       }
     }
   },
   mounted(){
     this.getTopSort()
   },
   watch: {
     sortGrade: function(newSortGrade){
       if(newSortGrade === 2){
         this.parentSortOptions = this.topSorts.map((item,i)=>({...item,subSort: [],index: i}))
       }else{
         this.parentSortOptions = this.topSorts.map((item,i)=>({...item,index: i}))
       }
     }
   }
}
</script>

<style lang="scss" scoped>
  .title{
    font-size: 20px;
    text-align: center;
    margin: 10px 0;
  }
  .goods-form{
    width: 50%;
    margin: 0 auto;
    padding: 20px 30px;
    border: solid 1px #ebebeb;
    .myBtn{
      margin-left: 10px;
    }
    .el-form-item__content{
      &>.el-input{
        width: 80%;
      }
      .el-cascader{
        width: 40%;
      }
      .code-input{
        width: 40%;
      }
    }
  }
  .goods-form:hover{
    box-shadow: 0 0 8px 0 rgba(232, 237, 250, 0.6), 0 2px 4px 0 rgba(232, 237, 250, 0.5);
    border-radius: 6px;
    transition: all 400ms;
  }

</style>

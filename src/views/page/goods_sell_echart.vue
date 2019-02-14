<template>
  <div class="">
    <div id="sellEchart">

    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
import {getGoodsEchartData} from '@/api/api'
export default {
  data(){
    return {

    }
  },
  mounted(){
    var myChart = echarts.init(document.getElementById('sellEchart'))
    var option = {
        title : {
            text: '总销量统计',
            subtext: '销量前二十名',
            x:'center'
        },
        color: ['#3398DB'],
        tooltip : {
            trigger: 'axis',
            axisPointer: {
              type: 'none'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis : {
                type : 'category',
                data : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                axisTick: {
                  alignWithLabel: true,
                },
                axisLabel:{
                  interval:0 ,
                  formatter:function(val){
                    return val.split("").join("\n");
                  }
               }
            },
        yAxis : {
                type : 'value'
            },
        series : {
                name:'销量',
                type:'bar',
                barWidth: '60%',
                data:[10, 52, 200, 334, 390, 330, 220]
            }
    };
    myChart.setOption(option)
    myChart.showLoading()
    getGoodsEchartData().then(data=>{
      myChart.setOption({
        xAxis: {
            data: data.nameData
          },
          series: {
            data: data.valueData
          }
      })
      myChart.hideLoading()
    })
  }
}
</script>

<style lang="scss" scoped>
  #sellEchart{
    width: 80%;
    height: 100%;
    margin: 0 auto;
  }
</style>

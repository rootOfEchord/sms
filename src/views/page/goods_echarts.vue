<template lang="html">
  <div>
    <div id="mychart" class="box">

    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  mounted(){
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('mychart'));
    // 绘制图表
    myChart.setOption({
        xAxis: {
            type: 'category',
            data: ['1', '5', '9', '13', '17', '21'],
            splitLine: {show: false}
        },
        yAxis: {
            type: 'value',
            // show : false,
            // min: 'dataMin',
            scale:true,
            splitLine: {show: false}
        },
        series: [{
            data: [20, 32, 10, 34, 12, 30,20],
            type: 'line',
            smooth: true
        }]
    });
  }
}
</script>

<style lang="scss" scoped>
  .box{
    width: 300px !important;
    height: 300px;
    position: relative;
  }
</style>

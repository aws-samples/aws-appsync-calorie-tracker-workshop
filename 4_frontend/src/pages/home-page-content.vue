<template>
  <div id="home">
    <f7-block>
        <center><img src="static/cutlery-logo.svg" width=30% height=30%></center>
    </f7-block>

    <f7-block-header strong>Week's Summary</f7-block-header>
    <f7-block strong>
         <doughnut-chart :width="300" :height="300"></doughnut-chart>
         <home-chart :width="300" :height="200"></home-chart>
    </f7-block>
  </div>
</template>

<script>

import DoughnutChart from './doughnut-chart'
import HomeChart from './home-chart'

export default {
  components: {
    DoughnutChart,
    HomeChart
    
  }
}
</script>
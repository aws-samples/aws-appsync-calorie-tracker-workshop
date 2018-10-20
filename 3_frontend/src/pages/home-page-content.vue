<template>
  <div id="home">
    <f7-block>
        <center><img src="static/cutlery-logo.svg" width=50% height=50%></center>
    </f7-block>

    <f7-block-header strong>Recent Activity Summary</f7-block-header>
    <f7-block strong>
        <home-chart></home-chart>
    </f7-block>
  </div>
</template>

<script>
import HomeChart from './home-chart'

export default {
  components: {
    HomeChart
  }
}
</script>
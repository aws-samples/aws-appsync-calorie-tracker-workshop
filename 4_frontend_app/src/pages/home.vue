<template>
  <f7-page>
    <f7-navbar>
      <f7-nav-left>
        <f7-link icon-if-ios="f7:menu" icon-if-md="material:menu" panel-open="left"></f7-link>
      </f7-nav-left>
      <f7-nav-title>AWS Calorie Tracker</f7-nav-title>
    </f7-navbar>

    <f7-toolbar tabbar labels :bottom-md="isBottom">
      <f7-link tab-link route-tab-id="home" href="./" text="Home" icon-ios="f7:home_fill" icon-md="material:home"></f7-link>
      <f7-link tab-link route-tab-id="addActivity" href="./add_activity/" text="Add Activity" icon-ios="f7:add_fill" icon-md="material:add"></f7-link>
      <f7-link tab-link route-tab-id="viewActivity" href="./view_activity/" text="View Activity" icon-ios="f7:graph_round_fill" icon-md="material:graph_round"></f7-link>
      <f7-link tab-link route-tab-id="viewRecommendations" href="./view_recommendations/" text="Recommendations" icon-ios="f7:favorites" icon-md="material:favorites_round"></f7-link>
    </f7-toolbar>

    <f7-tabs routable>
      <f7-tab id="home"></f7-tab>
      <f7-tab id="addActivity"></f7-tab>
      <f7-tab id="viewActivity"></f7-tab>
      <f7-tab id="viewRecommendations"></f7-tab>
    </f7-tabs>

  </f7-page>
</template>
<script>
import HomeChart from './home-chart'

export default {
  data () {
    return {
      isBottom: false
    }
  },
  components: {
    HomeChart
  }
}
</script>

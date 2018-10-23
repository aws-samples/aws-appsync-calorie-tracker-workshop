<template>
  <div id="viewRecommendations">
    <f7-block>
        <center><img src="static/neptune-logo.svg" width=33% height=33%></center>
    </f7-block>

    <div id="suggestions" v-for="suggestion in suggestions">
      <f7-block-title>{{suggestion.category}}</f7-block-title>
      <f7-card
      outline
      v-bind:content="suggestion.type"
      ></f7-card>
    </div>

    <f7-block>
        <center>Powered by <f7-link href="https://aws.amazon.com/neptune/" external>AWS Neptune</f7-link></center>
    </f7-block>
  </div>
</template>

<script>
import { API, graphqlOperation } from 'aws-amplify'
import { getUser, getUserBmi, suggestedFood } from '../graphql/queries'

export default {
  data () {
    return {
      loading: true,
      suggestions: [],
      userid: null,
      bmi: null
    }
  },
  async mounted() {
    this.loading = true

    try {
      // Fetch user BMI
      const userid = localStorage['aws-calorie-tracker-userid']
      
      const { data: { getUser: { bmi }} } = await API.graphql(graphqlOperation(getUserBmi, {
        id: localStorage['aws-calorie-tracker-userid']
      }))

      this.bmi = bmi

      // Fetch suggestions from Neptune via AppSync
      const suggestions = await API.graphql(graphqlOperation(suggestedFood, {
        userid: localStorage['aws-calorie-tracker-userid'],
        bmi: this.bmi
      }))

      this.suggestions = suggestions.data.suggestedFood

      console.log(this.suggestions)
    } catch (err) {
      console.log(err)
    }
  }
}
</script>
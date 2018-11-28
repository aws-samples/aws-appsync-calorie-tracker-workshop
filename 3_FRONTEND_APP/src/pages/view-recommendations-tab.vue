<template>
  <div id="viewRecommendations">
    <f7-block>
        <center><img src="static/neptune-logo.svg" width=33% height=33%></center>
    </f7-block>

    <f7-block v-if="loading">
      <center>
        <f7-block-title>Fetching Suggestions...</f7-block-title>
        <f7-preloader :size="28"></f7-preloader>
      </center>
    </f7-block>

    <div id="suggestions" v-else>
      <f7-block>
        <f7-row>
          <f7-col>
            <center>
              <p>Food suggestions are based on user activities and personal information such as BMI</p>
            </center>
          </f7-col>
        </f7-row>
        <f7-row>
          <f7-col>
            <center>
              <p>Your BMI is: {{bmi.toFixed(2)}}</p>
            </center>
          </f7-col>
        </f7-row>
      </f7-block>

      <f7-block>
        <f7-row>
          <f7-col>
            <center>
              <p>Last Updated: {{ lastUpdated }}</p>
            </center>
          </f7-col>
        </f7-row>
      </f7-block>

      <f7-block>
        <f7-row width="50%" style="align-items: center; justify-content: center;">
          <f7-col width="50%">
          <center>
              <f7-button @click="refresh()">Refresh</f7-button></center>
          </f7-col>
        </f7-row>
      </f7-block>

      <f7-block>
        <div id="suggestions content" v-for="suggestion in suggestions">
          <f7-row>
            <f7-col>
              <f7-block-title>{{suggestion.category}}</f7-block-title>
              <f7-card
              outline
              v-bind:content="suggestion.type"
              ></f7-card>
            </f7-col>
          </f7-row>
        </div>
      </f7-block>
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
      lastUpdated: null,
      userid: null,
      bmi: null
    }
  },
  mounted() {
    this.getSuggestions()
  },
  methods: {
    async getSuggestions() {
      this.loading = true

      try {
        const userid = localStorage['aws-calorie-tracker-userid']

        // Fetch user BMI
        this.appSyncLogger.info('Invoking the getUserBmi Query')

        const { data: { getUser: { bmi }} } = await API.graphql(graphqlOperation(getUserBmi, {
          id: localStorage['aws-calorie-tracker-userid']
        }))

        this.bmi = bmi

        this.appSyncLogger.info('getUserBmi returned: ' + this.bmi)

        // Fetch suggestions from Neptune via AppSync's suggestedFood Query
        this.appSyncLogger.info('Invoking the suggestedFood Query')

        const suggestions = await API.graphql(graphqlOperation(suggestedFood, {
          userid: localStorage['aws-calorie-tracker-userid'],
          bmi: this.bmi
        }))

        // Populate suggestion array with results
        this.suggestions = suggestions.data.suggestedFood

        this.appSyncLogger.info('suggetedFood returned: ' + JSON.stringify(this.suggestions))

        // Populate last updated string
        this.lastUpdated = new Date().toString()

        // Hide spinner and show suggestions
        this.loading = false

      } catch (err) {
        console.log(err)
      }
    },
    refresh() {
      this.suggestions = []
      this.getSuggestions()
    }
  }
}
</script>
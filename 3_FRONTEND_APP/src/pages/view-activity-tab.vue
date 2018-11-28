<template>
  <div id="viewActivity">
    <f7-block>
        <center><img src="static/appsync-logo.svg" width=33% height=33%></center>
    </f7-block>

    <f7-block v-if="loading">
      <center><f7-preloader :size="42"></f7-preloader></center>
    </f7-block>

    <f7-block v-else>
      <div v-for="sortedActivity in sortedActivities">
        <f7-block-title>{{sortedActivity.category}}</f7-block-title>
        <div class="data-table card">
          <table>
            <thead>
              <tr>
                <th class="label-cell">Timestamp</th>
                <th class="label-cell">Type</th>
                <th class="label-cell">Calories</th>
                <th class="label-cell">Action</th>
              </tr>
            </thead>
            <tr v-for="activity in sortedActivity.activities">
              <td class="label-cell">{{convertIsoDateToString(activity.creationDateTime)}}</td>
              <td class="label-cell">{{activity.type}}</td>
              <td class="label-cell">{{activity.caloriesConsumed}}</td>
              <td class="actions-cell">
                <a @click="deleteActivity(activity.id)" class="link icon-only">
                  <i class="icon f7-icons ios-only" style="text-align: center;">delete_round_fill</i>
                </a>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </f7-block>

    <f7-block>
        <center>Powered by <f7-link href="https://aws.amazon.com/appsync/" external>AWS AppSync</f7-link></center>
    </f7-block> 
  </div>
</template>

<script>
import moment from 'moment'
import { Auth, API, graphqlOperation } from 'aws-amplify'
import { listActivities, listActivityCategoriesOnly } from '../graphql/queries'
import { deleteActivity } from '../graphql/mutations'
import { onDeleteActivity, onDeleteActivities } from '../graphql/subscriptions'

export default {
  data () {
    return {
      activities: [],
      categories: [],
      sortedActivities: [],
      loading: true,
      subscription: null
    }
  },
  beforeDestroy() {
    // Unsubscribe from onDeleteActivities events
    this.subscription.unsubscribe()
  },
  mounted() {
    // Fetch User ID from local storage
    this.userid = localStorage['aws-calorie-tracker-userid']

    // Fetch all activites via AppSync
    this.getActivities()

    // Subscrive to onDeleteActivities event
    this.subscribeToDeleteActivity()
  },
  methods: {
    searchActivityByCategory(category) {
      var returnObj = []

      // Find all activities associated with a specific category
      for (var activity of this.activities) {
        if (activity.category === category) {
          returnObj.push(activity)
        }
      }

      // Return results as an array of objects
      return returnObj
    },
    sortActivities() {
      // 
      for (var category of this.categories) {
        this.sortedActivities.push({
          "category": category.category,
          "activities": this.searchActivityByCategory(category.category)
        })
      }
      this.loading = false
    },
    // Subscribe to OnDeleteActivity, which should trigger each team an Activity record is deleted
    subscribeToDeleteActivity() {
      var self = this

      this.appSyncLogger.info('Subscribing to the onDelete subscription')

      // Subscripte to the onDeleteActivities subscription
      self.subscription = API.graphql(graphqlOperation(onDeleteActivity)
        ).subscribe({
          next: ({ value: { data }}) => {
            this.appSyncLogger.info('onDeleteActivity Subscription Invoked! Refreshing Activities.')

            // Zero all arrays so we don't get duplicates oncd we refresh activities
            self.sortedActivities = []
            self.activites = []
            self.categories = []

            // Refresh activities
            self.getActivities()
          }
        })

      this.appSyncLogger.info('Subscribed to onDelete subscription: ' + JSON.stringify(self.subscription))
    },
    async getActivities() {
      // Display spinner
      this.loading = true
      
      try {
        // Fetch all activities associated with the current UserID
        this.appSyncLogger.info('Invoking the listActivites Query')

        const activities = await API.graphql(graphqlOperation(listActivities, { userid: localStorage['aws-calorie-tracker-userid'] }))
        this.activities = activities.data.listActivities.items

        this.appSyncLogger.info('listActivities returned: ' + JSON.stringify(this.activities))
        
        // Fetch all possible categories
        this.appSyncLogger.info('Invoking the listActivityCategoriesOnly Query')

        const categories = await API.graphql(graphqlOperation(listActivityCategoriesOnly))
        this.categories = categories.data.listActivityCategories.items

        this.appSyncLogger.info('listActivityCategoriesOnly returned: ' + JSON.stringify(this.categories))
      } catch(err) {
        this.appSyncLogger.error('Error while invoking queries: ' + JSON.stringify(err))
      }

      // Done! Let's quickly sort each activity to match its respective category
      return this.sortActivities()
    },
    async deleteActivity(activityId) {
      try {
        this.appSyncLogger.info('Invoking the deleteActivity mutation')

        // Delete an activity via the deleteActivity Mutation
        const { data: { deleteActivity: { items }} } = await API.graphql(graphqlOperation(deleteActivity, {
          input: {
            id: activityId
          }
        }))
      } catch(err) {
        this.appSyncLogger.error('Error while invoking deleteActivity: ' + JSON.stringy(err))
      }
    },
    convertIsoDateToString(isoDate) {
      // Crude method to prettify a ISO datetime value
      var m = moment(isoDate)
      var date = m.utc().format('MM-DD')
      var time = m.utc().format('HH:mm')

      return date + " " + time
    }
  }
}
</script>
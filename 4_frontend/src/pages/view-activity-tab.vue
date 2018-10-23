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
import { onDeleteActivity } from '../graphql/subscriptions'

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
  mounted() {
    this.getActivities()

    try {
      const subscription = API.graphql(graphqlOperation(onDeleteActivity)
        ).subscribe({
          next: ({ value: { data }}) => {
            console.log(data)
          }
          // next: (eventData) => {
          //   console.log('fired!!')
          // }
          // error: (error) => console.log(error)
        })
        this.subscription = subscription
    } catch (err) {
      console.log(err)
    }

    console.log(this.subscription)
  },
  methods: {
    searchActivityByCategory(category) {
      var returnObj = []
      
      for (var activity of this.activities) {
        if (activity.category === category) {
          returnObj.push(activity)
        }
      }

      return returnObj
    },
    sortActivities() {
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
      // const subscription = API.graphql(graphqlOperation(OnDeleteActivity)
      //   ).subscribe({
      //     next: (eventData) => console.log(eventData)
      //   })

      // console.log(subscription)
    },
    async getActivities() {
      // Display spinner
      this.loading = true
      
      try {
        const activities = await API.graphql(graphqlOperation(listActivities, { userid: localStorage['aws-calorie-tracker-userid'] }))
        this.activities = activities.data.listActivities.items
        
        const categories = await API.graphql(graphqlOperation(listActivityCategoriesOnly))
        this.categories = categories.data.listActivityCategories.items

      } catch(err) {
        console.log(err)
      }

      return this.sortActivities()
    },
    async deleteActivity(activityId) { 
      try {
        const { data: { deleteActivity: { items }} } = await API.graphql(graphqlOperation(deleteActivity, {
          input: {
            id: activityId
          }
        }))
      } catch(err) {
        console.log(err)
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
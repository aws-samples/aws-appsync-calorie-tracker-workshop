<script>
import { Doughnut } from "vue-chartjs";
import moment from "moment";
import { API, graphqlOperation } from "aws-amplify";
import { groupBy, map, sumBy } from "lodash";
//import { listActivities, listActivityCategoriesOnly } from '../graphql/queries'

const listActivities = `query ListActivities(
  $filter: TableActivityFilterInput
  $limit: Int
  $nextToken: String
) {
  listActivities(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      caloriesConsumed
      type
    }
    nextToken
  }}`;

export default {
  data() {
    return {
      activities: [],
      loading: true,
      calories: [],
      labels: []
    };
  },
  methods: {

    async getActivities(userid) {
      // Display spinner
      this.loading = true;
      const today = moment().utc().format().toString();
      const day7Ago = moment().utc().subtract(7, "days").format().toString();

      // Fetch all activities and categories
      try {
        const activities = await API.graphql(graphqlOperation(listActivities, {userid: userid,creationDateTime: { between: [`"${day7Ago}", "${today}"`]}}));

        this.activities = activities.data.listActivities.items;
 
      } catch (err) {
        console.log(
          `Error Loading chart for Doughnut - ${JSON.stringify(err)}`
        );
      }

      return this.activities;
    }
  },
  name: "Doughnut-Chart",
  extends: Doughnut,
  async mounted() {

    const userid = localStorage['aws-calorie-tracker-userid']

    const getUserActivities = await this.getActivities(userid); 

    const groupedByCalorieType = _(getUserActivities)
          .groupBy("type")
          .map((o, k) => ({
            type: k,
            calories: _.sumBy(o, "caloriesConsumed")
          }))
          .value();

        this.labels = _(groupedByCalorieType)
          .map("type")
          .value();
          
        this.calories = _(groupedByCalorieType)
          .map("calories")
          .value();

    console.log(`${this.labels} - ${this.calories}`)

    this.renderChart({
      labels: this.labels ? this.labels: ["No Data"] ,
      datasets: [
        {
          backgroundColor: [
            '#41B883',
            '#E46651',
            '#b8aa40',
            '#00D8FF',
            '#b87040',
            '#b84094',
            '#DD1B16'
          ],
          data: this.calories ? this.calories: ["0"]
        }
      ]
    }, {responsive: true, maintainAspectRatio: false})
  }
};
</script>
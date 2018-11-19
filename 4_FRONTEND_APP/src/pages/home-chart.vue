<script>
import { Line } from 'vue-chartjs'
import moment from "moment";
import { API, graphqlOperation } from "aws-amplify";
import { listUserAggregates } from '../graphql/queries'
import { groupBy, map, sortBy } from "lodash";

export default {
  name: 'home-chart',
  extends: Line,
  data() {
    return {
      loading: true,
      userAggregate:null,
      date:[],
      caloriesBurned:[],
      caloriesConsumed:[]
    };
  },
  methods: {
    async getUserAggregate(userid) {
      this.loading = true;
      const today = moment().utc().format().toString();
      const day7Ago = moment().utc().subtract(7, "days").format().toString();


      try {
        let getUserAggregate = await API.graphql(graphqlOperation(listUserAggregates, {userid: userid, date:{ between: [`"${day7Ago}", "${today}"`]}}));

        this.userAggregate = getUserAggregate.data.listUserAggregates.items;
 
      } catch (err) {
        console.log(
          `Error Loading chart for Doughnut - ${JSON.stringify(err)}`
        );
      }

      return this.userAggregate 
    }
    

  },
  async mounted() {

    const userid = localStorage['aws-calorie-tracker-userid']

    const getUserAggregateDetails = await this.getUserAggregate(userid);  

    const groupByCalorieDate = _(getUserAggregateDetails)
          .sortBy("date")

    console.log("groupByCalorieDate", JSON.stringify(groupByCalorieDate));

        this.date = _(groupByCalorieDate)
          .map("date")
          .value();
        
        this.caloriesBurned = _(groupByCalorieDate)
          .map("caloriesBurned")
          .value();

          
        this.caloriesConsumed = _(groupByCalorieDate)
          .map("caloriesConsumed")
          .value();

    // Overwriting base render method with actual data.
    this.renderChart({
      labels: this.date,
      datasets: [
        {
          label: 'Calories Consumed',
          backgroundColor: '#f87979',
          borderColor: '#f87979',
          data: this.caloriesConsumed,
          fill: 'boundary'
        },
        {
          label: 'Calories Burned',
          backgroundColor: '#5de451',
          borderColor: '#5de451',
          data: this.caloriesBurned,
         // fill: 'boundary'
        }
      ],
      options: {
        maintainAspectRatio: false
      }
    })
  }
}
</script>
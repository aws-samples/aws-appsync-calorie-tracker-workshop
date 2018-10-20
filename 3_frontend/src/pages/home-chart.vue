<script>
import { Line } from 'vue-chartjs'

export default {
  name: 'home-chart',
  extends: Line,
  mounted () {
    // Overwriting base render method with actual data.
    this.renderChart({
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      datasets: [
        {
          label: 'Calories',
          backgroundColor: '#f87979',
          borderColor: '#f87979',
          data: [3500, 4003, 3400, 4200, 4500, 5500, 5000, 6000, 5800, 4500, 4800, 5200],
          fill: 'boundary'
        }
      ],
      options: {
        maintainAspectRatio: false
      }
    })
  }
}
</script>
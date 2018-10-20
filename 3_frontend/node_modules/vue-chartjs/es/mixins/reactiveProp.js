module.exports = {
  props: {
    chartData: {
      required: true
    }
  },
  watch: {
    'chartData': {
      handler: function handler(newData, oldData) {
        if (oldData) {
          var chart = this.$data._chart;
          var newDatasetLabels = newData.datasets.map(function (dataset) {
            return dataset.label;
          });
          var oldDatasetLabels = oldData.datasets.map(function (dataset) {
            return dataset.label;
          });
          var oldLabels = JSON.stringify(oldDatasetLabels);
          var newLabels = JSON.stringify(newDatasetLabels);

          if (newLabels === oldLabels && oldData.datasets.length === newData.datasets.length) {
            newData.datasets.forEach(function (dataset, i) {
              var oldDatasetKeys = Object.keys(oldData.datasets[i]);
              var newDatasetKeys = Object.keys(dataset);
              var deletionKeys = oldDatasetKeys.filter(function (key) {
                return key !== '_meta' && newDatasetKeys.indexOf(key) === -1;
              });
              deletionKeys.forEach(function (deletionKey) {
                delete chart.data.datasets[i][deletionKey];
              });

              for (var attribute in dataset) {
                if (dataset.hasOwnProperty(attribute)) {
                  chart.data.datasets[i][attribute] = dataset[attribute];
                }
              }
            });

            if (newData.hasOwnProperty('labels')) {
              chart.data.labels = newData.labels;
            }

            if (newData.hasOwnProperty('xLabels')) {
              chart.data.xLabels = newData.xLabels;
            }

            if (newData.hasOwnProperty('yLabels')) {
              chart.data.yLabels = newData.yLabels;
            }

            chart.update();
          } else {
            chart.destroy();
            this.renderChart(this.chartData, this.options);
          }
        } else {
          if (this.$data._chart) {
            this.$data._chart.destroy();
          }

          this.renderChart(this.chartData, this.options);
        }
      }
    }
  }
};
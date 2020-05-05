<template>
  <div>
    <div v-if="data">
      <pie-chart
        v-if="getFirstFiveCounts().length > 0"
        :chart-data="chartData"
        :options="chartOptions"
      ></pie-chart>
      <div id="myChartLegend"></div>
    </div>
  </div>
</template>
<script>
import { getStorageData, getRandomColors } from '../../utils';
import PieChart from './PieChart.js';

export default {
  name: 'ChartComponent',
  // props: {},
  data() {
    return {
      data: [],
      timesPostHasBeenUpdated: 0,
      chartOptions: {
        legend: {
          display: false,
        },
      },
      chartData: {},
    };
  },
  methods: {
    async refresh() {
      const result = await getStorageData('data');
      this.data = [];
      this.data.push(...result.data);
      console.log(this.data);
      this.chartData = {
        labels: this.getFirstFiveHostnames(),
        datasets: [
          {
            label: 'Data One',
            backgroundColor: getRandomColors(5),
            data: this.getFirstFiveCounts(),
            borderColor: 'white',
            hoverBorderColor: 'gray',
            hoverBorderWidth: 3,
          },
        ],
        legendLabels: {
          main: 'sites',
          counts: 'seconds',
        },
      };
    },
    getFirstFiveHostnames() {
      return this.data.slice(0, 5).map((el) => {
        return `${el.hostname}`;
      });
    },
    getFirstFiveCounts() {
      return this.data.slice(0, 5).map((el) => {
        return el.count;
      });
    },
  },
  beforeMount() {
    this.refresh();
  },
  mounted() {},
  watch: {},
  components: {
    pieChart: PieChart,
  },
};
</script>

<style>
[class='0-legend'] {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-content: center;
}
.legendText {
  display: flex;
  justify-content: space-between;
  margin: 5px;
}
.legendItem {
  cursor: pointer;
  list-style: none;
  padding-left: 0;
  display: flex;
  justify-content: space-between;
  margin: 5px;
}
.color-box {
  width: 30px;
  height: 30px;
}
.text {
  font-size: 14px;
  text-align: center;
}
.title-box {
  background: rgb(241, 4, 4);
  background: linear-gradient(
    90deg,
    rgba(241, 4, 4, 1) 0%,
    rgba(230, 239, 2, 1) 26%,
    rgba(13, 252, 0, 1) 51%,
    rgba(7, 27, 235, 1) 72%,
    rgba(255, 0, 108, 1) 100%
  );
}
.title-text {
  font-size: 16px;
  font-weight: bold;
}
</style>

<template>
  <div class="d-flex flex-row justify-content-center" v-if="data">
    <pie-chart v-if="chartData" :chart-data="chartData" :options="chartOptions"></pie-chart>
    <div id="myChartLegend" class="pl-2"></div>
  </div>
</template>

<script>
import { getRandomColors, getStorageData } from '../../utils';
import PieChart from '../../popup/components/PieChart.js';
export default {
  name: 'Statistic',
  components: {
    pieChart: PieChart,
  },
  data() {
    return {
      data: [],
      chartData: {
        legendLabels: {
          main: 'sites',
          counts: 'seconds',
        },
      },
      chartOptions: {
        legend: {
          display: false,
        },
      },
    };
  },
  methods: {
    async refresh() {
      const result = await getStorageData('data');
      this.data = [];
      this.data.push(...result['data']);
      console.log(this.data);
      this.chartData = {
        labels: this.getHostnames(),
        datasets: [
          {
            label: 'Data One',
            backgroundColor: getRandomColors(this.data.length),
            data: this.getCounts(),
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
    getHostnames() {
      return this.data.map((el) => {
        return `${el.hostname}`;
      });
    },
    getCounts() {
      return this.data.map((el) => {
        let result = el.nodes.reduce((summ, current) => {
          if (current.count) {
            return summ + current.count;
          } else return summ + 0;
        }, 0);
        // console.log(result / 1000);
        return Math.round(result / 1000);
      });
    },
  },
  created() {
    this.refresh();
  },
};
</script>

<style scoped></style>

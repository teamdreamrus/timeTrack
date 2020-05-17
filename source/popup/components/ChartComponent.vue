<template>
  <div v-if="local.your_activity">
    <div class="d-flex justify-content-center align-items-center mt-2">
      <div class="mr-2" style="font-size: 15pt;">{{ local.your_activity }}</div>
      <b-form-select
        style="width: auto;"
        v-model="selected"
        :options="options"
        @change="changeSelectedData"
      ></b-form-select>
    </div>
    <div v-if="data">
      <pie-chart
        v-if="getCounts().length > 0"
        :chart-data="chartData"
        :options="chartOptions"
      ></pie-chart>
      <div id="myChartLegend"></div>
    </div>
    <div v-if="!data" class="d-flex justify-content-center align-items-center flex-column">
      <b-alert class="mt-2" show variant="dark">{{ local.noData }}</b-alert>
      <div class="lds-dual-ring"></div>
    </div>
  </div>
</template>
<script>
import { getStorageData, getRandomColors } from '../../utils';
import PieChart from './PieChart.js';

export default {
  name: 'ChartComponent',
  props: ['local'],
  data() {
    return {
      fullData: [],
      data: [],
      timesPostHasBeenUpdated: 0,
      chartOptions: {
        legend: {
          display: false,
        },
      },
      chartData: {},
      selected: 'inLastHour',
      options: [
        { value: 'inLast24Hours', text: this.local.inLast24Hours || 'lox' },
        { value: 'inLast12Hours', text: this.local.inLastHour || 'lox' },
        { value: 'inLast8Hours', text: this.local['inLast24Hours'] || 'lox' },
        { value: 'inLast4Hours', text: this.local['inLast24Hours'] || 'lox' },
        { value: 'inLastHour', text: this.local['inLast24Hours'] || 'lox' },
      ],
      dataSelected: [],
    };
  },
  methods: {
    async refresh(place) {
      const result = await getStorageData([
        'inLastHour',
        'inLast4Hours',
        'inLast8Hours',
        'inLast12Hours',
        'inLast24Hours',
      ]);
      this.data = [];
      this.fullData = result;
      this.data.push(...result[place]);
      console.log(this.fullData);
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
    changeSelectedData() {
      // console.log(this.fullData);
      this.data = this.fullData[this.selected];
      console.log('local', this.local);
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
  watch: {
    data: function (newVal, oldVal) {
      console.log('watcher');
      // watch it
      // console.log('Prop changed: ', newVal, ' | was: ', oldVal);
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
          main: this.local.sites,
          counts: this.local.sec,
        },
      };
    },
    // local(n, o) {
    //   console.log(n, o); // n is the new value, o is the old value.
    // },
  },
  beforeMount() {
    this.refresh(this.selected);
  },
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
  padding-bottom: 2px;
  border-bottom: 2px solid black;
}
.legendItem {
  align-items: center;
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
#myChartLegend {
  height: auto;
  max-height: 240px;
  overflow: auto;
}
.lds-dual-ring {
  display: inline-block;
  width: 80px;
  height: 80px;
}
.lds-dual-ring:after {
  content: ' ';
  display: block;
  width: 64px;
  height: 64px;
  margin: 8px;
  border-radius: 50%;
  border: 6px solid #000000;
  border-color: #000000 transparent #000000 transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>

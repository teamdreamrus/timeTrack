<template>
  <div>
    <pie-chart v-if="chartData" :data="chartData" :options="chartOptions"></pie-chart>
    <div id="myChartLegend"></div>
  </div>
</template>

<script>
import PieChart from '../../popup/components/PieChart.js';
import { getRandomColors } from '../../utils';
export default {
  props: ['data'],
  name: 'Chart',
  data() {
    return {
      chartOptions: {
        legend: {
          display: false,
        },
      },
      chartData: {},
    };
  },
  components: {
    pieChart: PieChart,
  },
  methods: {},
  beforeMount() {
    console.log(this.data);
    // console.log('count:', this.data.length);
    // console.log(
    //   'names ',
    //   this.data.map((el) => el.hostname),
    // );
    // console.log(
    //   'counts:',
    //   this.data.map((el) => el.nodes.length),
    // );
    // console.log('colors:', getRandomColors(this.data.length));
    this.chartData = {
      labels: this.data.map((el) => el.hostname),
      datasets: [
        {
          label: 'Data One',
          backgroundColor: getRandomColors(this.data.length),
          data: this.data.map((el) => el.typedCount + el.visitCount),
          borderColor: 'white',
          hoverBorderColor: 'gray',
          hoverBorderWidth: 3,
        },
      ],
    };
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
</style>

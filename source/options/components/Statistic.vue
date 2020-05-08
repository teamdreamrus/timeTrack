<template>
  <div class="d-flex flex-column justify-content-center align-items-center">
    <h5>All-Time Statistics</h5>
    <div class="d-flex flex-row justify-content-center" v-if="data !== []">
      <chart-statistic v-if="data" :data="data"></chart-statistic>
      <div id="myChartLegend" class="pl-2"></div>
    </div>
  </div>
</template>

<script>
import { getStorageData } from '../../utils';
import ChartStatistic from './ChartStatistic.vue';
export default {
  name: 'Statistic',
  components: {
    ChartStatistic: ChartStatistic,
  },
  data() {
    return {
      data: [],
      chartData: {},
    };
  },
  methods: {
    async reloadData() {
      const result = await getStorageData('data');
      this.data = [];
      this.data.push(...result['data']);
      console.log(this.data);
    },
  },
  created() {
    this.reloadData();
  },
};
</script>

<style scoped></style>

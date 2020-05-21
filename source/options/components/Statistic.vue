<template>
  <div class="d-flex flex-column justify-content-center align-items-center">
    <h5>{{ content.all_statistic.all_time_statistics }}</h5>
    <div class="d-flex flex-row justify-content-center" v-if="data !== [] && coef && time_in">
      <chart-statistic
        v-if="data"
        :data="data"
        :legendLabels="{
          sites: content.all_statistic.sites,
          count: content.all_statistic[time_in],
        }"
        :coef="coef"
      ></chart-statistic>
      <div id="myChartLegend" class="pl-2"></div>
    </div>
    <button class="btn btn-outline-dark" @click="clearAll">
      {{ content.all_statistic.clear }}
    </button>
  </div>
</template>

<script>
import { getStorageData } from '../../utils';
import ChartStatistic from './ChartStatistic.vue';
export default {
  name: 'Statistic',
  props: ['content'],
  components: {
    ChartStatistic: ChartStatistic,
  },
  data() {
    return {
      data: [],
      chartData: {},
      coef: false,
      time_in: false,
    };
  },
  methods: {
    async reloadData() {
      const result = await getStorageData('data');
      this.data = [];
      this.data.push(...result['data']);
      console.log(this.data);
    },
    clearAll() {
      chrome.storage.local.set({ data: [] });
      this.reloadData();
    },
  },
  created() {
    this.reloadData();
    getStorageData('time_in')
      .then((res) => {
        if (res.time_in.name && res.time_in.coefficient) {
          this.time_in = res.time_in.name;
          this.coef = res.time_in.coefficient;
          console.log(this.time_in);
          console.log(this.coef);
        }
      })
      .catch((err) => console.error(err));
  },
};
</script>

<style scoped></style>

<template>
  <div>
    <div class="row flex justify-content-center">
      <div class="col-xs-9">
        <!--        <button class="btn btn-outline-dark">refresh</button>-->
        <b-form-select
          v-model="selected"
          :options="options"
          @change="changeSelectedData"
        ></b-form-select>
      </div>
    </div>
    <div class="row flex justify-content-center" v-if="dataSelected !== []">
      <chart v-if="dataSelected" :data="dataSelected"></chart>
    </div>
  </div>
</template>

<script>
import { getStorageData } from '../../utils.js';
import Chart from './Chart.vue';
export default {
  name: 'Clicks',

  data() {
    return {
      dataFull: {},
      selected: 'date7days',
      options: [
        // { value: null, text: 'Please select an option' },
        { value: 'date30days', text: 'in the last 30 days' },
        { value: 'date7days', text: 'in the last 7 days' },
        { value: 'date24hours', text: 'in the last 24 hours' },
        { value: 'date1hour', text: 'in the last hour' },
      ],
      dataSelected: [],
    };
  },
  components: {
    chart: Chart,
  },
  methods: {
    reloadData() {
      let keys = ['date30days', 'date7days', 'date24hours', 'date1hour'];
      getStorageData(keys)
        .then((res) => {
          console.log(res);
          this.dataFull = res;
          this.dataSelected = this.dataFull[this.selected];
        })
        .catch((err) => console.log(err));
    },
    changeSelectedData() {
      this.dataSelected = this.dataFull[this.selected];
      console.log(this.dataSelected);
    },
  },
  created() {
    this.reloadData();
  },
};
</script>

<style scoped></style>

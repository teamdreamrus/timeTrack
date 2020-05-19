<template>
  <div>
    <div class="row d-flex justify-content-center">
      <div class="d-flex align-items-center flex-row">
        <b-button @click="reloadForm" size="" variant="primary" class="mr-2">
          <b-icon icon="arrow-clockwise" aria-label="Help"></b-icon>
        </b-button>

        <b-form-select
          v-model="selected"
          :options="options"
          @change="changeSelectedData"
        ></b-form-select>
      </div>
    </div>

    <div class="row d-flex justify-content-center mt-2" v-if="dataSelected !== []">
      <chart-clicks
        v-if="dataSelected"
        :data="dataSelected"
        :legendLabels="content.visits.legend"
      ></chart-clicks>
    </div>
  </div>
</template>

<script>
import { getStorageData } from '../../utils.js';
import ChartClicks from './ChartClicks.vue';

export default {
  name: 'Clicks',
  props: ['content'],
  data() {
    return {
      dataFull: {},
      selected: 'date7days',
      options: [
        // { value: null, text: 'Please select an option' },
        { value: 'date30days', text: this.content.visits.date30days || ' ' },
        { value: 'date7days', text: this.content.visits.date7days || ' ' },
        { value: 'date24hours', text: this.content.visits.date24hours || ' ' },
        { value: 'date1hour', text: this.content.visits.date1hour || ' ' },
      ],
      dataSelected: [],
    };
  },
  components: {
    ChartClicks: ChartClicks,
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
    reloadForm() {
      this.reloadData();
      setTimeout(this.changeSelectedData, 1000);
    },
  },
  created() {
    this.reloadData();
    console.log(this.content);
  },
};
</script>

<style scoped></style>

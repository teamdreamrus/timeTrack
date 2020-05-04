<template>
  <div>
    <div class="row flex justify-content-center">
      <div class="col-xs-9">
        <!--        <button class="btn btn-outline-dark">refresh</button>-->
      </div>
    </div>
    <div class="row flex justify-content-center" v-if="dataFull['date1hour']">
      <chart v-if="dataFull['date1hour']" :data="dataFull['date1hour']"></chart>
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
          // console.log(res);
          // for(let data in res){
          //   data.
          // }
          console.log(res);
          this.dataFull = res;

          //need sort every dataset by nodes.length
        })
        .catch((err) => console.log(err));
    },
  },
  beforeMount() {
    this.reloadData();
  },
};
</script>

<style scoped></style>

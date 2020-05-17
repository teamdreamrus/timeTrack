<template>
  <div class="mr-1 ml-1 mt-1 mb-1" v-if="localHeader && localChart">
    <header-component :local="localHeader"></header-component>
    <chart-component :local="localChart"></chart-component>
  </div>
</template>
<script>
import ChartComponent from './ChartComponent.vue';
import HeaderComponent from './HeaderComponent.vue';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import * as Utils from '../../utils';

export default {
  data() {
    return {
      localHeader: {},
      localChart: {},
    };
  },
  components: {
    HeaderComponent: HeaderComponent,
    ChartComponent,
  },
  beforeCreate() {
    Utils.getLocales('popup').then((res) => {
      this.localChart = res.chart;
      this.localHeader = res.header;
      console.log(this.localChart, this.localHeader);
    });
  },
};
</script>
<style>
::-webkit-scrollbar {
  width: 7px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #dedce2;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #b097e2;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #8b62d2;
}
</style>

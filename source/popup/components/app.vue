<template>
  <div>
    <header-component></header-component>
    <chart-component></chart-component>
  </div>
</template>
<script>
import ChartComponent from './ChartComponent.vue';
import HeaderComponent from './HeaderComponent.vue';

// import 'bootstrap/dist/css/bootstrap.css';
// import 'bootstrap-vue/dist/bootstrap-vue.css';

export default {
  components: {
    HeaderComponent: HeaderComponent,
    ChartComponent,
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
* {
  font-family: 'Montserrat', serif;
}
</style>

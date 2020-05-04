<template>
  <div>
    <div class="container">
      <navigation-component></navigation-component>
    </div>
    <div class="container mt-3">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import NavigationComponent from './NavigationComponent.vue';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

export default {
  name: 'App',
  data() {
    return {
      text: '',
    };
  },
  components: {
    NavigationComponent,
  },
};
</script>

<style scoped></style>

<template>
  <div>
    <b-nav tabs class="justify-content-center" v-if="local">
      <div class="ml-3 mr-5">
        <h2>{{ local.dashboard }}</h2>
      </div>
      <b-nav-item to="/clicks" exact exact-active-class="active">Visits</b-nav-item>
      <b-nav-item to="/stats" exact exact-active-class="active">All statistic</b-nav-item>
      <b-nav-item to="/work" exact exact-active-class="active">Work mode</b-nav-item>
      <b-nav-item to="/settings" exact exact-active-class="active">Settings</b-nav-item>
    </b-nav>
  </div>
</template>

<script>
export default {
  name: 'NavigationComponent',
  props: ['navigateLocal'],
  data() {
    return {
      local: false,
    };
  },
  watch: {
    $props: {
      handler() {
        this.parseData();
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    parseData() {
      this.local = this.navigateLocal;
    },
  },
};
</script>

<style scoped></style>

<template>
  <div>
    <b-nav tabs class="justify-content-center">
      <div class="ml-3 mr-5">
        <h2>{{ navigateLocal.dashboard }}</h2>
      </div>
      <b-nav-item to="/clicks" exact exact-active-class="active">{{
        navigateLocal.visits
      }}</b-nav-item>
      <b-nav-item to="/stats" exact exact-active-class="active">{{
        navigateLocal.all_statistic
      }}</b-nav-item>
      <b-nav-item to="/work" exact exact-active-class="active">{{
        navigateLocal.work_mode
      }}</b-nav-item>
      <b-nav-item to="/settings" exact exact-active-class="active">{{
        navigateLocal.settings
      }}</b-nav-item>
    </b-nav>
  </div>
</template>

<script>
export default {
  name: 'NavigationComponent',
  props: ['navigateLocal'],
  data() {
    return {};
  },
};
</script>

<style scoped></style>

<template>
  <div>
    <b-nav tabs class="justify-content-center">
      <div class="ml-3 mr-5"><h2>Dashboard</h2></div>
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
};
</script>

<style scoped></style>

<template>
  <div>
    <b-nav tabs>
      <b-nav-item to="/clicks" exact exact-active-class="active">Сlickthroughs</b-nav-item>
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

<template>
  <div class="">
    <div class="d-flex justify-content-between" v-if="local.visits">
      <a class="btn btn-light d-flex align-items-center" @click="showVisits">{{ local.visits }}</a>
      <a class="btn btn-light d-flex align-items-center" @click="showAllStats">{{
        local.all_statistic
      }}</a>
      <a class="btn btn-light d-flex align-items-center" @click="showWork">{{ local.work_mode }}</a>
      <a class="btn btn-light d-flex align-items-center" @click="showOptions()">
        <b-icon icon="gear" aria-label="Help"></b-icon>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HeaderComponent',
  props: ['local'],
  methods: {
    showVisits() {
      window.open(chrome.runtime.getURL('options.html') + '#/clicks');
    },
    showAllStats() {
      window.open(chrome.runtime.getURL('options.html') + '#/stats');
    },
    showWork() {
      window.open(chrome.runtime.getURL('options.html') + '#/work');
    },
    showOptions() {
      window.open(chrome.runtime.getURL('options.html') + '#/settings');
    },
  },
};
</script>

<style scoped></style>

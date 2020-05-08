<template>
  <div class="">
    <!--    <div class="title"><h5>Your activity</h5></div>-->
    <div class="d-flex justify-content-between">
      <a class="btn btn-light" @click="showVisits">visits</a>
      <a class="btn btn-light" @click="showAllStats">all statistic</a>
      <a class="btn btn-light" @click="showWork">work mode</a>
      <a class="btn btn-light" @click="showOptions()">
        <b-icon icon="gear" aria-label="Help"></b-icon>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HeaderComponent',
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

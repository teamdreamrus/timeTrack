<template>
  <div class="main row">
    <div class="title"><h2>Top 5 your activity</h2></div>
    <div class="activity">
      <a class="btn btn-primary" @click="showOptions()">options</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HeaderComponent',
  methods: {
    showOptions() {
      if (chrome.runtime.openOptionsPage) {
        chrome.runtime.openOptionsPage();
      } else {
        window.open(chrome.runtime.getURL('options.html#/work'));
      }
      console.log('click');
    },
  },
};
</script>

<style scoped>
.main {
  display: flex;
  justify-content: space-between;
}
.activity {
  align-items: center;
  display: flex;
}
.btn-position {
}
.title {
}
a {
  padding: 0;
  border: none;
  font: inherit;
  color: inherit;
  background-color: transparent;
  cursor: pointer;
}

.btn {
  display: inline-block;
  text-align: center;
  text-decoration: none;
  margin: 2px 0;
  border: solid 1px transparent;
  border-radius: 4px;
  padding: 0.5em 1em;
  color: #1b1a1a;
  background-color: #dededefa;
}

.btn:active {
  transform: translateY(1px);
  filter: saturate(150%);
}

.btn:hover {
  color: #0e0e0e;
  border-color: currentColor;
  background-color: white;
}

.btn::-moz-focus-inner {
  border: none;
}

.btn:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(255, 105, 180, 0.5), 0 0 0 1.5px rgba(255, 105, 180, 0.5);
}

.js-focus-visible .btn:focus:not(.focus-visible) {
  box-shadow: none;
}
</style>

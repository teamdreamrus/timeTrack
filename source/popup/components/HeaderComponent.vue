<template>
  <div class="d-flex flex-column">
    <div class="d-flex justify-content-between" v-if="local.visits">
      <a class="btn btn-light d-flex align-items-center" @click="showVisits">{{ local.visits }}</a>
      <a class="btn btn-light d-flex align-items-center" @click="showAllStats">{{
        local.all_statistic
      }}</a>
      <div class="d-flex flex-column">
        <a class="btn btn-light d-flex align-items-center" @click="showWork">{{
          local.work_mode
        }}</a>
        <div class="d-flex justify-content-center flex-row">
          <div class="mr-2" :class="!status ? 'fontBold' : ''">{{ local.off }}</div>
          <b-form-checkbox
            size="lg"
            v-model="status"
            @change="statusChange"
            name="check-button"
            switch
          >
          </b-form-checkbox>
          <div :class="status ? 'fontBold' : ''">{{ local.on }}</div>
        </div>
      </div>
      <a class="btn btn-light d-flex align-items-center" @click="showOptions()">
        <b-icon icon="gear" aria-label="Help"></b-icon>
      </a>
    </div>
    <!--    <div>-->
    <!--      <div class="d-flex justify-content-between">-->
    <!--        <div></div>-->
    <!--        <div></div>-->
    <!--        <div></div>-->
    <!--        <div></div>-->
    <!--      -->
    <!--        <div></div>-->
    <!--      </div>-->
    <!--    </div>-->
  </div>
</template>

<script>
import * as Utils from '../../utils';

export default {
  name: 'HeaderComponent',
  props: ['local'],
  data() {
    return {
      status: false,
      banList: [],
    };
  },
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
    saveBanList() {
      //save new list
      console.log('save', { banList: { status: this.status, list: this.banList } });
      Utils.setStorageData({ banList: { status: this.status, list: this.banList } });
    },
    loadBanList() {
      Utils.getStorageData('banList')
        .then((result) => {
          if (result['banList']) {
            this.status = result['banList'].status;
            this.banList = result['banList'].list;
            // this.banList = result['banList'];
          }
        })
        .catch((err) => console.log(err));
    },
    statusChange() {
      this.status = !this.status;
      this.saveBanList();
    },
  },
  // watch: {
  //   status() {
  //     console.log(this.status);
  //   },
  // },
  beforeMount() {
    this.loadBanList();
  },
};
</script>

<style scoped>
.fontBold {
  font-weight: bold;
}
</style>

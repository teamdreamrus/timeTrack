<template>
  <div class="d-flex align-items-center flex-column">
    <div class="d-flex justify-content-center flex-row">
      <h5>{{ content.settings.language }}</h5>
      <div class="ml-2 d-flex justify-content-center flex-row">
        <div class="mr-2" :class="!status ? 'fontBold' : ''">{{ content.settings.en }}</div>
        <b-form-checkbox size="lg" @change="changeLang" v-model="status" name="check-button" switch>
        </b-form-checkbox>
        <div :class="status ? 'fontBold' : ''">{{ content.settings.ru }}</div>
      </div>
    </div>
    <div class="d-flex justify-content-center flex-row mt-2">
      <h5 style="white-space: pre;" class="mr-2">{{ content.settings.time_in }}</h5>
      <b-form-select
        v-model="selected"
        :options="options"
        @change="changeSelectedData"
      ></b-form-select>
    </div>
  </div>
</template>

<script>
import * as Utils from '../../utils.js';
export default {
  name: 'Settings',
  props: ['content'],
  data() {
    return {
      status: false,
      selected: 'sec',
      options: [
        // { value: null, text: 'Please select an option' },
        { value: 'sec', text: this.content.settings.sec },
        { value: 'min', text: this.content.settings.min },
      ],
    };
  },
  methods: {
    changeSelectedData() {
      console.log(this.selected);
      let coef = this.selected === 'sec' ? 1000 : 1000 * 60;
      Utils.setStorageData({ time_in: { name: this.selected, coefficient: coef } });
    },
    changeLang() {
      this.status = !this.status;
      console.log('status:', this.status);
      let lang = this.status ? 'ru' : 'en';
      Utils.setStorageData({ lang: { code: lang } });
      location.reload();
    },
  },
  created() {
    Utils.getStorageData('lang')
      .then((res) => {
        console.log(res);
        this.status = res.lang.code === 'ru';
      })
      .catch((err) => console.error(err));
    Utils.getStorageData('time_in')
      .then((res) => (this.selected = res.time_in.name))
      .catch((err) => console.error(err));
  },
};
</script>

<style scoped>
.fontBold {
  font-weight: bold;
}
</style>

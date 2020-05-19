<template>
  <div>
    <div class="d-flex justify-content-center flex-row">
      <h5>{{ content.settings.language }}</h5>
      <div class="ml-2 d-flex justify-content-center flex-row">
        <div class="mr-2" :class="!status ? 'fontBold' : ''">{{ content.settings.en }}</div>
        <b-form-checkbox size="lg" v-model="status" name="check-button" switch> </b-form-checkbox>
        <div :class="status ? 'fontBold' : ''">{{ content.settings.ru }}</div>
      </div>
    </div>
    <div class="d-flex justify-content-center flex-row">
      <h5>{{ content.settings.time_in }}</h5>
      <b-form-select
        v-model="selected"
        :options="options"
        @change="changeSelectedData"
      ></b-form-select>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Settings',
  props: ['content'],
  data() {
    return {
      status: false,
      selected: 'seconds',
      options: [
        // { value: null, text: 'Please select an option' },
        { value: 'seconds', text: this.content.settings.sec },
        { value: 'minutes', text: this.content.settings.min },
      ],
    };
  },
  methods: {
    changeSelectedData() {
      console.log(this.selected);
    },
  },
};
</script>

<style scoped>
.fontBold {
  font-weight: bold;
}
</style>

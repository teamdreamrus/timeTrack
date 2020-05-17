<template>
  <div>
    <div class="d-flex justify-content-center flex-row">
      <h5>language:</h5>
      <div class="ml-2 d-flex justify-content-center flex-row">
        <div class="mr-2" :class="!status ? 'fontBold' : ''">en</div>
        <b-form-checkbox size="lg" v-model="status" name="check-button" switch> </b-form-checkbox>
        <div :class="status ? 'fontBold' : ''">ru</div>
      </div>
    </div>
    <div class="d-flex justify-content-center flex-row">
      <h5>time in:</h5>
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
  data() {
    return {
      status: false,
      selected: 'seconds',
      options: [
        // { value: null, text: 'Please select an option' },
        { value: 'seconds', text: 'seconds' },
        { value: 'minutes', text: 'minutes' },
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

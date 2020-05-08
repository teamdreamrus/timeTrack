<template>
  <div class="d-flex justify-content-center align-items-center flex-column">
    <h5>Work-mode</h5>
    <div class="d-flex justify-content-center flex-row">
      <div class="mr-2" :class="!status ? 'fontBold' : ''">off</div>
      <b-form-checkbox size="lg" v-model="status" name="check-button" switch> </b-form-checkbox>
      <div :class="status ? 'fontBold' : ''">on</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Workmode',
  data() {
    return {
      status: false,
    };
  },
  methods: {
    //save toggle to storage
  },
  beforeMount() {},
};
</script>

<style scoped>
.fontBold {
  font-weight: bold;
}
</style>

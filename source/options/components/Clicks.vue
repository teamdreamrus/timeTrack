<template>
  <h1>Clicks</h1>
</template>

<script>
import { getStorageData } from '../../utils.js';
export default {
  name: 'Clicks',

  data() {
    return {
      data: {},
    };
  },
  beforeCreate() {
    let keys = ['date30days', 'date7days', 'date24hours', 'date1hour'];
    getStorageData(keys)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  },
};
</script>

<style scoped></style>

<template>
  <div class="d-flex justify-content-center align-items-center mt-5" v-if="local">
    <b-card no-body class="overflow-hidden" style="max-width: 540px;">
      <b-row no-gutters>
        <b-col md="6">
          <b-card-img
            src="../../../images/work-desk.jpg"
            alt="Image"
            class="rounded-0"
          ></b-card-img>
        </b-col>
        <b-col md="6">
          <b-card-body :title="local.title">
            <b-card-text>
              {{ local.text }}<a href="options.html#/work">{{ local.link }}</a>
            </b-card-text>
          </b-card-body>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>
<script>
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import * as Utils from '../../utils';

export default {
  data() {
    return {
      local: false,
    };
  },
  beforeCreate() {
    Utils.getLocales('banPage').then((res) => {
      this.local = res;
    });
  },
};
</script>
<style lang="scss"></style>

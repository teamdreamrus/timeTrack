<template>
  <div class="d-flex justify-content-center align-items-center flex-column">
    <h5>Work-mode</h5>
    <div class="d-flex justify-content-center flex-row">
      <div class="mr-2" :class="!status ? 'fontBold' : ''">off</div>
      <b-form-checkbox size="lg" v-model="status" name="check-button" switch> </b-form-checkbox>
      <div :class="status ? 'fontBold' : ''">on</div>
    </div>
    <div class="d-flex justify-content-center align-items-center flex-row mt-3">
      <div class="d-flex justify-content-center align-items-center flex-column mr-5">
        <b-card
          border-variant="danger"
          header="Your Ban List:"
          header-border-variant="danger"
          header-text-variant="dark"
          align="center"
        >
          <div style="height: 300px;">
            <b-input-group prepend="URL" class="mb-1">
              <b-form-input v-model="typedUrl"></b-form-input>
              <b-input-group-append>
                <b-button variant="outline-success" @click="addUrl"
                  ><b-icon icon="plus-circle"></b-icon
                ></b-button>
              </b-input-group-append>
            </b-input-group>
            <b-list-group>
              <b-list-group-item
                variant="danger"
                class="p-0 d-flex justify-content-between align-items-center"
                v-for="(hostname, index) in banList"
                :key="index"
                ><div class="ml-5">
                  {{ hostname }}
                </div>
                <button class="btn" @click="removeHostname(index)">
                  <b-icon icon="x"></b-icon></button
              ></b-list-group-item>
            </b-list-group>
          </div>
        </b-card>
      </div>
      <div class="d-flex justify-content-center align-items-center flex-column ml-5">
        <div>You often visit:</div>
        <div style="height: 300px;"></div>
      </div>
    </div>
  </div>
</template>

<script>
import * as Utils from '../../utils.js';
export default {
  name: 'Workmode',
  data() {
    return {
      status: false,
      typedUrl: '',
      banList: [],
    };
  },
  methods: {
    addUrl() {
      let hostname = '';
      if (this.typedUrl.includes('.')) {
        if (this.isValidUrl(this.typedUrl)) {
          hostname = new URL(this.typedUrl).hostname;
        } else {
          hostname = this.typedUrl;
        }
        if (hostname && this.banList.indexOf(hostname) === -1) {
          this.banList.push(hostname);
          this.saveBanList();
        }
      }
      // if (this.banList) {
      //   if (hostname && this.banList.indexOf(hostname) > -1) {
      //     console.log('asd');
      //     this.banList.push(hostname);
      //     this.saveBanList();
      //   }
      // } else {
      //   if (hostname) {
      //     console.log('asd111');
      //     this.banList.push(hostname);
      //     this.saveBanList();
      //   }
      // }
    },
    removeHostname(index) {
      this.banList = this.banList.filter((el, i) => i !== index);
    },
    isValidUrl(string) {
      try {
        new URL(string);
      } catch (_) {
        return false;
      }
      return true;
    },
    saveBanList() {
      //save new list
      Utils.setStorageData({ banList: this.banList });
    },
    downloadBanList() {
      Utils.getStorageData('banList')
        .then((result) => {
          if (result['banList']) {
            this.banList = result['banList'];
          }
        })
        .catch((err) => console.log(err));
    },

    //save toggle to storage
  },
  beforeMount() {
    this.downloadBanList();
  },
};
</script>

<style scoped>
.fontBold {
  font-weight: bold;
}
</style>

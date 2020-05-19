<template>
  <div class="d-flex justify-content-center align-items-center flex-column">
    <h5>{{ content.work_mode.work_mode }}</h5>
    <div class="d-flex justify-content-center flex-row">
      <div class="mr-2" :class="!status ? 'fontBold' : ''">{{ content.work_mode.off }}</div>
      <b-form-checkbox size="lg" v-model="status" name="check-button" switch> </b-form-checkbox>
      <div :class="status ? 'fontBold' : ''">{{ content.work_mode.on }}</div>
    </div>
    <div class="d-flex justify-content-center align-items-center flex-row mt-3">
      <div class="d-flex justify-content-center align-items-center flex-column mr-5">
        <b-card
          border-variant="danger"
          :header="content.work_mode.your_ban_list"
          header-border-variant="danger"
          header-text-variant="dark"
          align="center"
        >
          <div style="height: 300px;">
            <b-input-group prepend="URL" class="mb-1">
              <b-form-input v-model="typedUrl"></b-form-input>
              <b-input-group-append>
                <b-button variant="outline-success" @click="addUrl(typedUrl)"
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
        <b-card
          border-variant="success"
          :header="content.work_mode.you_often_visit"
          header-border-variant="success"
          header-text-variant="dark"
          align="center"
        >
          <div style="height: 300px; overflow: auto;">
            <b-list-group>
              <b-list-group-item
                variant="success"
                class="p-0 d-flex justify-content-between align-items-center"
                v-for="(site, index) in oftenVisitSites"
                :key="index"
              >
                <button class="btn" @click="addUrl(site.hostname)">
                  <b-icon icon="arrow-left"></b-icon>
                </button>
                <div class="mr-5">
                  {{ site.hostname }}
                </div>
                <div class="empty"></div>
              </b-list-group-item>
            </b-list-group>
          </div>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
import * as Utils from '../../utils.js';
export default {
  name: 'Workmode',
  props: ['content'],
  data() {
    return {
      status: false,
      typedUrl: '',
      banList: [],
      oftenVisitSites: [],
    };
  },
  methods: {
    addUrl(url) {
      let hostname = '';
      let path = '';
      if (url.includes('.')) {
        if (this.isValidUrl(url)) {
          let url = new URL(url);
          hostname = url.hostname + url.pathname;
        } else {
          hostname = url;
        }
        if (hostname && this.banList.indexOf(hostname) === -1) {
          console.log(url);
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
      this.saveBanList();
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
    loadOftenVisitSites() {
      Utils.getStorageData('date30days')
        .then((res) => {
          console.log(res);
          if (res) this.oftenVisitSites = res['date30days'];
          console.log(this.oftenVisitSites);
        })
        .catch((err) => console.log(err));
    },

    //save toggle to storage
  },
  watch: {
    status() {
      this.saveBanList();
    },
  },
  beforeMount() {
    this.loadBanList();
    this.loadOftenVisitSites();
  },
};
</script>

<style scoped>
.fontBold {
  font-weight: bold;
}
</style>

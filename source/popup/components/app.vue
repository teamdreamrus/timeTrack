<template>
    <div>
        <ul>
            <li v-for="item in data">
                {{ item.count }} - {{item.hostname}}
            </li>
        </ul>
        <button @click="timesPostHasBeenUpdated++">refresh</button>
    </div>

</template>
<script>
    import Vue from 'vue';
    import AsyncComputed from 'vue-async-computed'
    import {getStorageData} from '../../utils'

    Vue.use(AsyncComputed);
    // import {
    //   sample
    // } from 'lodash';
    // import { sendContentMessage, setStorageData, getStorageData } from '../../utils';
    export default {
        props: {},
        data() {
            return {
                data: [],
              timesPostHasBeenUpdated: 0
            };
        },
        methods: {
            refresh() {
                // Triggers an immediate update of blogPosts
                // Will work even if an update is in progress.
                // this.$asyncComputed.allData.update();
            }

        },
        watch: {},
        components: {},
        asyncComputed: {

            async run() {
                const result = await getStorageData('data');
                // this.data = JSON.parse(result);
                this.data.push(...result.data);
                console.log(this.data);
                // console.log(result);
            }
        }
    };
</script>
<style lang="less">
</style>

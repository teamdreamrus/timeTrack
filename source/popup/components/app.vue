<template>
    <div>
        <div v-if="data!==[]">
            <ul>
                <li v-for="item in data">
                    {{ item.count }} - {{item.hostname}}
                </li>
            </ul>
            <button @click="refresh">refresh</button>
        </div>
    </div>

</template>
<script>
    import Vue from 'vue';
    import AsyncComputed from 'vue-async-computed'
    import {getStorageData} from '../../utils'

    Vue.use(AsyncComputed);

    export default {
        props: {},
        data() {
            return {
                data: [],
              timesPostHasBeenUpdated: 0
            };
        },
        methods: {
            async refresh() {
                const result = await getStorageData('data');
                this.data = [];
                this.data.push(...result.data);
                console.log(this.data);
            },
            beforeMount(){
                this.refresh();
            },
        },
        watch: {},
        components: {},
        asyncComputed: {
            // getData: {
            //     get() {
            //         return await getStorageData('data').result;
            //     }
            // },
            // async run() {
            //     const result = await getStorageData('data') ;
            //     this.data.push(...result.data);
            //     console.log(this.data);
            // }
        }
    };
</script>
<style lang="less">
</style>

<template>
    <div>
        <div v-if="data">
            <button @click="refresh">refresh</button>

            <div v-for="(item, index) in data">
                <div class="" v-if="index < 5">
                    {{ item.count }} - {{item.hostname}}
                </div>
            </div>

            <pie-chart v-if="getFirstFiveCounts().length>0" :data="chartData" :options="chartOptions"></pie-chart>
        </div>
    </div>


</template>
<script>
    import Vue from 'vue';
    import AsyncComputed from 'vue-async-computed'
    import {getStorageData} from '../../utils'
    import PieChart from './PieChart.js'


    Vue.use(AsyncComputed);

    export default {
        props: {},
        data() {
            return {
                data: [],
                timesPostHasBeenUpdated: 0,
                chartOptions: {
                    hoverBorderWidth: 20
                },
                chartData: {
                }
            };
        },
        methods: {
            async refresh() {
                const result = await getStorageData('data');
                this.data = [];
                this.data.push(...result.data);
                this.chartData = {
                    hoverBackgroundColor: "red",
                    hoverBorderWidth: 10,
                    labels: this.getFirstFiveHostnames(),
                    datasets: [
                        {
                            label: "Data One",
                            backgroundColor: this.getRandomColors(),
                            data: this.getFirstFiveCounts()
                        }
                    ]
                };
                console.log(this.data);
            },
            getRandomColors() {
                let colors = [];
                for (let i = 0; i < 5; i++) {
                    colors.push("#"+((1<<24)*Math.random()|0).toString(16))
                }
                return colors;
            },
            getFirstFiveHostnames() {
                return this.data.slice(0, 5).map(el => {
                    return `${el.hostname}`;
                });
            },
            getFirstFiveCounts() {
                return this.data.slice(0, 5).map(el => {
                    return el.count;
                });
            }
            // fillData() {
            //     this.datacollection = {
            //         labels: [this.getRandomInt(), this.getRandomInt()],
            //         datasets: [
            //             {
            //             label: "Data One",
            //             backgroundColor: ["#41B883", "#E46651", "#00D8FF"],
            //             data: [1, 10, 5]
            //         }
            //         ]
            //     }
            // },
            // getRandomInt() {
            //     return Math.floor(Math.random() * (50 - 5 + 1)) + 5
            // }
        },
        beforeMount() {
            this.refresh();
        },
        mounted() {
            // this.fillData();
        },
        watch: {},
        components: {
            pieChart: PieChart
        },
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

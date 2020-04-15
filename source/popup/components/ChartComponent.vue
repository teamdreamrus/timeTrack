<template>
    <div>
        <div v-if="data">
            <button @click="refresh">refresh</button>
            <pie-chart v-if="getFirstFiveCounts().length>0" :data="chartData" :options="chartOptions"></pie-chart>
            <div id="myChartLegend"></div>
        </div>
    </div>
</template>
<script>

    import {getStorageData} from '../../utils'
    import PieChart from './PieChart.js'

    export default {
        name: 'ChartComponent',
        // props: {},
        data() {
            return {
                data: [],
                timesPostHasBeenUpdated: 0,
                chartOptions: {
                    legend: {
                        display: false
                    }
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


                    labels: this.getFirstFiveHostnames(),
                    datasets: [
                        {
                            label: "Data One",
                            backgroundColor: this.getRandomColors(5),
                            data: this.getFirstFiveCounts(),
                            // hoverBackgroundColor: "red",
                            // hoverBorderWidth: 0,
                            borderColor: 'white',
                            hoverBorderColor: 'gray',
                            hoverBorderWidth: 3

                        }
                    ]
                };
                console.log(this.data);
            },
            getRandomColors(num) {
                let colors = [];
                for (let i = 0; i < num; i++) {
                    colors.push('#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6))
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
        // asyncComputed: {
        //     getData: {
        //         get() {
        //             return await getStorageData('data').result;
        //         }
        //     },
        //     async run() {
        //         const result = await getStorageData('data') ;
        //         this.data.push(...result.data);
        //         console.log(this.data);
        //     }
        // }
    };
</script>

<style scoped>
    /*[class="0-legend"] {*/
    /*    cursor: pointer;*/
    /*    list-style: none;*/
    /*    padding-left: 0;*/
    /*}*/
    /*[class="0-legend"] div {*/
    /*    display: inline-block;*/
    /*    padding: 0 5px;*/
    /*}*/
    /*[class="0-legend"] div.hidden {*/
    /*    text-decoration: line-through;*/
    /*}*/
    /*[class="0-legend"] div div {*/
    /*    border-radius: 5px;*/
    /*    display: inline-block;*/
    /*    height: 10px;*/
    /*    margin-right: 10px;*/
    /*    width: 10px;*/
    /*}*/


    .legendItem {

    }
    .color-box {

    }
</style>

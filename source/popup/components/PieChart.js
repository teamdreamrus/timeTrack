import { Doughnut, mixins } from "vue-chartjs";
export default {
    extends: Doughnut,
    props: ["data"],
    mounted() {
        // this.chartData is created in the mixin.
        // If you want to pass options please create a local options object
        this.renderChart(this.data, {
            legend: {
                display: false,
                // position: 'bottom'
                // align: 'center'
                labels: {
                    fontColor: 'black'
                }
            },


        });
    }
};

import {Doughnut, mixins} from "vue-chartjs";

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
            legendCallback: function (chart) {
                let text = [];
                text.push('<div class="' + chart.id + '-legend" style=" display: flex;flex-direction: column; justify-content: space-around;align-content: center">');
                for (let i = 0; i < chart.data.datasets[0].data.length; i++) {
                    text.push(`<div class="legendItem" id="item-${i}" style="display: flex; justify-content: space-between; margin: 5px;"><div
                    style="
                     width: 30px;
                     height: 30px;
                
                    background-color: ${chart.data.datasets[0].backgroundColor[i]}; 
                    
                    ">`);
                    text.push('</div><div style="font-size: 14px; text-align: center">');
                    if (chart.data.labels[i]) {
                        text.push(chart.data.labels[i]);
                    }

                    text.push('</div>');
                    if (chart.data.datasets[0].data[i]) {
                        text.push(`<div style="font-size: 14px; text-align: center">${chart.data.datasets[0].data[i]}</div>`)
                    }


                    text.push('</div>');

                }
                text.push('</div>');
                return text.join("");
            }


        });
        const myLegendContainer = document.getElementById("myChartLegend");
        myLegendContainer.innerHTML = this.generateLegend();

        const legendItems = myLegendContainer.getElementsByClassName('legendItem');

        function legendClickCallback(event) {
            // event = event || window.event;
            //
            // let target = event.target || event.srcElement;
            // while (target.nodeName !== 'DIV') {
            //     target = target.parentElement;
            // }
            // let parent = target.parentElement;
            // let chart = Chart.instances[0];
            // let index = Array.prototype.slice.call(parent.children).indexOf(target);
            // index = 0 ;
            // let meta = chart.getDatasetMeta(index);
            // console.log( meta);
            // console.log(target);
            // if (meta.hidden === null) {
            //     meta.hidden = !chart.data.datasets[index].hidden;
            //     target.classList.add('hidden');
            // } else {
            //     target.classList.remove('hidden');
            //     meta.hidden = null;
            // }
            // chart.update();

        }

        for (let i = 0; i < legendItems.length; i += 1) {
            legendItems[i].addEventListener("click", legendClickCallback, false);
        }
    }

};

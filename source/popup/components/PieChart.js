import { Doughnut, mixins } from 'vue-chartjs';
const { reactiveProp } = mixins;

const rebuildLegend = (context) => {
  const myLegendContainer = document.getElementById('myChartLegend');
  myLegendContainer.innerHTML = context.generateLegend();
  const parentItem = document.getElementById('parentToItems');
  console.log('call');
  // console.log(parentItem.classList);
  const legendItems = myLegendContainer.getElementsByClassName('legendItem');
  // console.log(legendItems);
  function legendClickCallback(event) {
    event = event || window.event;
    console.log(event.target.className);
    let target = event.target || event.srcElement;
    while (target.className !== 'legendItem') {
      target = target.parentElement;
      if (target.className === 'legendItem') break;

      console.log(target.className);
    }
    // target = target.parentElement;
    let parent = target.parentElement;
    console.log(target.className);
    if (target.className === 'legendItem') {
      let index = Array.prototype.slice.call(parent.children).indexOf(target);

      console.log('index', index);
      let chartIndex = +parentItem.classList[0].split('-')[0];
      // console.log(chartIndex);
      let chart = Chart.instances[chartIndex];
      console.log(Chart.instances[chartIndex]);
      // console.log(Chart.instances[chartIndex].get());
      let meta = chart.data.datasets[0]._meta[chartIndex].data[index];

      if (meta.hidden === null) {
        meta.hidden = true;
        target.style.textDecoration = 'line-through';
        target.style.filter = 'grayscale(1)';
      } else {
        target.style.textDecoration = 'none';
        target.style.filter = '';
        meta.hidden = null;
      }
      chart.update();
    }
  }

  for (let i = 0; i < legendItems.length; i += 1) {
    legendItems[i].addEventListener('click', legendClickCallback, false);
  }
};
export default {
  extends: Doughnut,
  mixins: [reactiveProp],
  props: ['chartData'],
  watch: {
    chartData() {
      rebuildLegend(this);
    },
  },
  methods: {},
  mounted() {
    this.renderChart(this.chartData, {
      legend: {
        display: false,
        labels: {
          fontColor: 'black',
        },
      },
      legendCallback: function (chart) {
        console.log(this.chartData);
        let text = [];
        text.push(
          `<div class="legendText"><div class="color-box title-box"></div> <div class="text title-text">${chart.data.legendLabels.main}</div> <div class="text title-text">${chart.data.legendLabels.counts}</div></div>`,
        );
        text.push('<div id="parentToItems" class="' + chart.id + '-legend">');
        for (let i = 0; i < chart.data.datasets[0].data.length; i++) {
          text.push(`<div class="legendItem" id="item-${i}" ><div class="color-box"
                    style="            
                    background-color: ${chart.data.datasets[0].backgroundColor[i]}; 
                    ">`);
          text.push('</div><div class="text">');
          if (chart.data.labels[i]) {
            text.push(chart.data.labels[i]);
          }

          text.push('</div>');
          if (chart.data.datasets[0].data[i]) {
            text.push(`<div class="text">${chart.data.datasets[0].data[i]}</div>`);
          }
          text.push('</div>');
        }
        text.push('</div>');
        return text.join('');
      },
    });
    rebuildLegend(this);
  },
};

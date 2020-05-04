import { Doughnut, mixins } from 'vue-chartjs';

export default {
  extends: Doughnut,
  props: ['data'],
  mounted() {
    this.renderChart(this.data, {
      legend: {
        display: false,

        labels: {
          fontColor: 'black',
        },
      },
      legendCallback: function (chart) {
        let text = [];
        text.push(
          `<div class="legendText"><div class="color-box title-box"></div> <div class="text title-text">sites</div> <div class="text title-text">seconds</div></div>`,
        );
        text.push('<div class="' + chart.id + '-legend">');
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
    const myLegendContainer = document.getElementById('myChartLegend');
    myLegendContainer.innerHTML = this.generateLegend();

    const legendItems = myLegendContainer.getElementsByClassName('legendItem');

    function legendClickCallback(event) {
      event = event || window.event;

      let target = event.target || event.srcElement;
      while (target.nodeName !== 'DIV') {
        target = target.parentElement;
      }
      target = target.parentElement;
      let parent = target.parentElement;

      let index = Array.prototype.slice.call(parent.children).indexOf(target);

      console.log('index', index);

      let chart = Chart.instances[0];
      console.log(chart.data.datasets[0]);
      let meta = chart.data.datasets[0]._meta[0].data[index];

      console.log(meta);
      if (meta.hidden === null) {
        meta.hidden = true;
        target.style.textDecoration = 'line-through';
      } else {
        target.style.textDecoration = 'none';
        meta.hidden = null;
      }
      chart.update();
    }

    for (let i = 0; i < legendItems.length; i += 1) {
      legendItems[i].addEventListener('click', legendClickCallback, false);
    }
  },
};

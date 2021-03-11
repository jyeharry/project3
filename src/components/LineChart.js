import React from 'react';
import {Line} from 'react-chartjs-2';

export default class LineChart extends React.Component {
  constructor() {
    super()
    this._chartRef = React.createRef();
  }

  render() {
    const {symbol, label, chartData: {quantity, data: {dates, prices}}} = this.props;

    // remove data from the arrays until we are left with 'quantity' most recent dates and prices
    dates.splice(0, dates.length - quantity);
    prices.splice(0, prices.length - quantity);

    const borderColor = prices[0] < prices[prices.length - 1] ? 'rgba(97, 177, 90, 1)' : 'rgba(255, 99, 132, 1)';
    const backgroundColor = prices[0] < prices[prices.length - 1] ? 'rgba(97, 177, 90, 0.2)' : 'rgba(255, 99, 132, 0.2)';

    const chartData = {
      labels: [...dates],
      datasets: [
        {
          label: label,
          lineTension: 0.5,
          backgroundColor: backgroundColor,
          borderColor: borderColor,
          borderWidth: 2,
          data: [...prices]
        }
      ]
    }
    return (
      <div>
        <Line
          data={chartData}
          options={{
            tooltips: {
              enabled: true,
              mode: "x",
              intersect: false,
              callbacks: {
                label: (tooltipItem, data) => {
                  return '$' + parseFloat(tooltipItem.value).toLocaleString(undefined, { maximumFractionDigits: 2 });
                }
              },
            },
            title:{
              display: true,
              text: symbol,
              fontSize: 20
            },
            legend:{
              display: true,
              position: 'right'
            },
            scales: {
              xAxes: [{
                gridLines: {
                    display: false,
                    drawBorder: true
                }
              }],
              yAxes: [{
                gridLines: {
                    display: true,
                    drawBorder: true
                },
                ticks: {
                  callback: function(value, index, values) {
                    const suffixes = ["", " k", " M", " G", " T", " P", " E", " Z", " Y", " * 10^27", " * 10^30", " * 10^33"]; // should be enough. Number.MAX_VALUE is about 10^308
                    let suffixIndex = 0;
                    while ((value /= 1000) >= 1) {suffixIndex++};
                    return '$' + (value * 1000).toFixed(2) + suffixes[suffixIndex];
                    // return '$' + value.toLocaleString(undefined, { maximumFractionDigits: 2 });
                  }
                }
              }]
            }
          }}
        />
      </div>
    );
  }
}

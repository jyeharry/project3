import React, {Component} from 'react'
import Chart from "chart.js";

import Stocks from '../stocks.js';
import classes from "../css/LineGraph.module.css";

let lineChart;

class LineGraph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      symbol: '',
      dates: [],
      prices: [],
    }
    this.updateGraph = this.updateGraph.bind(this);
  }

  chartRef = React.createRef();

  updateGraph() {
    const myChartRef = this.chartRef.current.getContext("2d");
    const {quantity, data: {dates, prices}} = this.props.data;
    dates.splice(0, dates.length - quantity);
    prices.splice(0, prices.length - quantity);
    const borderColor = prices[0] < prices[prices.length - 1] ? 'rgba(97, 177, 90, 1)' : 'rgba(255, 99, 132, 1)';
    const backgroundColor = prices[0] < prices[prices.length - 1] ? 'rgba(97, 177, 90, 0.2)' : 'rgba(255, 99, 132, 0.2)';

    if (typeof lineChart !== "undefined") lineChart.destroy();

    lineChart = new Chart(myChartRef, {
      type: "line",
      data: {
        labels: dates,
        datasets: [
          {
            label: "Share Price $USD",
            data: prices,
            backgroundColor: [
                backgroundColor,
            ],
            borderColor: [
                borderColor,
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        layout: {
          padding: {
            left: 0,
            right: 0,
            top: 0,
            bottom: 40
          }
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
                return '$' + value;
              }
            }
          }]
        }
      }
    });
  }

  componentDidMount() {
    console.log('component did mount in LineGraph.js');
    this.updateGraph();
  }

  componentDidUpdate(prevProps) {
    console.log('');
    console.log('component did update in LineGraph.js');
    if (prevProps.symbol !== this.props.symbol || prevProps.data.timePeriod !== this.props.data.timePeriod) {
      this.updateGraph();
      console.log('linegraph did update');
    }
  }

  render() {
    return (
      <div className={classes.graphContainer}>
        <canvas id="myChart" ref={this.chartRef}/>
      </div>
    );
  }
}

export default LineGraph;

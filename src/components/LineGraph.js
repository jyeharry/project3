import React, {Component} from 'react'
import Chart from "chart.js";

import Stocks from '../stocks.js';
import classes from "../css/LineGraph.module.css";

let lineChart;

class LineGraph extends Component {
  constructor(props) {
    super(props);
    this.updateGraph = this.updateGraph.bind(this);
    this.chartRef = React.createRef();
  }

  updateGraph() {
    const myChartRef = this.chartRef.current.getContext("2d");
    const {quantity, data: {dates, prices}} = this.props.chartData;

    // remove data from the arrays until we are left with 'quantity' most recent dates and prices
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
    this.updateGraph();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.symbol !== this.props.symbol || prevProps.chartData.timePeriod !== this.props.chartData.timePeriod) {
      this.updateGraph();
    }
  }

  render() {
    return (
      <div className={classes.graphContainer}>
        <canvas id={this.props.graphId} ref={this.chartRef}/>
      </div>
    );
  }
}

export default LineGraph;

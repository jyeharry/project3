import React, {Component} from 'react'
import Chart from "chart.js";

import Stocks from '../stocks.js';
import classes from "../css/LineGraph.module.css";

class LineGraph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      symbol: props.symbol,
      dates: props.dates,
      prices: props.prices,
    }
    this.updateGraph = this.updateGraph.bind(this);
  }

  chartRef = React.createRef();

  updateGraph() {
    const myChartRef = this.chartRef.current.getContext("2d");
    const {prices} = this.state;
    const borderColor = prices[0] < prices[prices.length - 1] ? 'rgba(97, 177, 90, 1)' : 'rgba(255, 99, 132, 1)' ;
    const backgroundColor = prices[0] < prices[prices.length - 1] ? 'rgba(97, 177, 90, 0.2)' : 'rgba(255, 99, 132, 0.2)' ;

    new Chart(myChartRef, {
      type: "line",
      data: {
        //Bring in data
        labels: [
          ...this.state.dates,
        ],
        datasets: [
          {
            label: "Price $USD",
            data: this.state.prices,
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
    console.log('LineGraph.js');
    this.setState({symbol: this.props.symbol, dates: this.props.dates, prices: this.props.prices});
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('');
    console.log('updated LineGraph.js');
    console.log('prevProps.symbol:', prevProps.symbol);
    console.log('prevState.symbol:', prevState.symbol);
    console.log('this.state.symbol:', this.state.symbol);
    console.log('this.props.symbol:', this.props.symbol);
    console.log('this.props.prices:', this.props.prices);
    console.log('this.state.prices:', this.state.prices);
    console.log('this.props:', this.props);
    let pricesMatch = true;
    for (let i = 0; i < this.state.prices.length; i++) {
      if (this.state.prices[i] !== this.props.prices[i]) {
        pricesMatch = false;
        break;
      }
    }
    console.log(pricesMatch);
    if (this.state.symbol !== this.props.symbol && !pricesMatch) {
      console.log('did set state');
      this.setState({symbol: this.props.symbol, dates: this.props.dates, prices: this.props.prices});
    } else {
      console.log('updated graph');
      this.updateGraph();
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

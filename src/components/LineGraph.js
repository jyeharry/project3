import React, {Component} from 'react'
import Chart from "chart.js";

import Stocks from '../stocks.js';
import classes from "../css/LineGraph.module.css";

class LineGraph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      symbol: '',
      intraday: {},
      days: {},
      weeks: {},
      months: {},
    }
  }
  chartRef = React.createRef();

  componentDidMount() {
    const {symbol} =  this.props.match.params;
    this.setState({symbol: symbol});
    Stocks.getIntraday(symbol).then((data) => {
      this.setState({intraday: data});
    });

    const myChartRef = this.chartRef.current.getContext("2d");

    new Chart(myChartRef, {
      type: "line",
      data: {
        //Bring in data
        labels: [
          "Jan", "Feb", "March"
        ],
        datasets: [
          {
            label: "Price $USD",
            data: [86, 67, 91]
          }
        ]
      },
      options: {
        //Customize chart options
      }
    });
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

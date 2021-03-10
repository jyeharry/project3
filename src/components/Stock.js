import React, {Component} from 'react';
import {Button} from 'semantic-ui-react';

import Navbar from './Navbar';
import LineGraph from './LineGraph';
import InvestmentCalculator from './InvestmentCalculator';

import Stocks from '../stocks.js';
import classes from "../css/LineGraph.module.css";

class Stock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      symbol: '',
      stockData: {
        intraday: {
          dates: [],
          prices: []
        },
        day: {
          dates: [],
          prices: []
        },
        week: {
          dates: [],
          prices: []
        },
        month: {
          dates: [],
          prices: []
        },
      },
      toggledChart: {
        timePeriod: '',
        quantity: 0,
        data: {
          dates: [],
          prices: []
        }
      }
    };
    this.requestData = this.requestData.bind(this);
  }

  componentDidMount() {
    console.log('Stock.js did mount/////////////////////');
    this.requestData();
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('start of componentDidUpdate method in Stock.js');
    if (prevProps.match.params.symbol === this.props.match.params.symbol) return;
    console.log('-----------------------------------------------------stock.js did update');
    this.requestData();
  }

  requestData() {
    const {symbol} = this.props.match.params;
    Promise.all([Stocks.getIntraday(symbol), Stocks.getDays(symbol), Stocks.getWeeks(symbol), Stocks.getMonths(symbol)]).then((values) => {
      console.log(values[0].dates);
      this.setState({
        symbol: symbol,
        stockData: {
          intraday: values[0],
          day: values[1],
          week: values[2],
          month: values[3]
        },
        toggledChart: {
          timePeriod: '1 day',
          quantity: 100,
          data: {
            dates: values[0].dates,
            prices: values[0].prices
          }
        }
      });
    });
  }

  _handleClick = (e) => {
    console.log(JSON.parse(e.target.value));
    this.setState({toggledChart: JSON.parse(e.target.value)});
  }

  Graph = () => {
    const {symbol, stockData: {intraday, day, week, month}, toggledChart} = this.state;
    // makes sure there is actually data to display, otherwise display loading...
    if (toggledChart.data.prices.length > 0) {
      return (
        <div className="interactiveChart">
          <div className={classes.buttonContainer}>
            <Button value={ JSON.stringify({timePeriod: '1 day', quantity: 100, data: intraday}) } onClick={this._handleClick}>
              1 day
            </Button>
            <Button value={ JSON.stringify({timePeriod: '1 month', quantity: 20, data: day}) } onClick={this._handleClick}>
              1 month
            </Button>
            <Button value={ JSON.stringify({timePeriod: '6 months', quantity: 120, data: day}) } onClick={this._handleClick}>
              6 months
            </Button>
            <Button value={ JSON.stringify({timePeriod: '1 year', quantity: 240, data: day}) } onClick={this._handleClick}>
              1 year
            </Button>
            <Button value={ JSON.stringify({timePeriod: '5 years', quantity: 260, data: week}) } onClick={this._handleClick}>
              5 years
            </Button>
            <Button value={ JSON.stringify({timePeriod: '10 years', quantity: 120, data: month}) } onClick={this._handleClick}>
              10 years
            </Button>
            <Button value={ JSON.stringify({timePeriod: 'max', quantity: month.prices.length, data: month}) } onClick={this._handleClick}>
              max
            </Button>
          </div>
          <LineGraph symbol={symbol} chartData={toggledChart}/>
        </div>
      );
    } else {
      return (
        <h3>Loading...</h3>
      );
    }
  }

  render() {
    return (
      <>
        <Navbar/>
        <div className={classes.container}>
          <h1>Stock coming soon</h1>
          {this.Graph()}
          {this.state.toggledChart.data.prices.length > 0 && false && <InvestmentCalculator symbol={this.state.symbol} chartData={this.state.stockData.month}/>}
        </div>
      </>
    );
  }
}

export default Stock;
